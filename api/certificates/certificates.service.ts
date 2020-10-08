import * as Jimp from "jimp";
import * as QRCode from "qrcode";
import dataURIToBuffer from "data-uri-to-buffer";

import { DatabaseService } from "../services/database.service";
import { errors } from "../error/error.constant";
import { registrationSchema, certificateRequest } from "./certificates.schema";
import { EventSchema, certSchema } from "../events/events.schema";
import { StorageService } from "../services/storage.service";

/**
 * Checks if the person has attended the event or not.
 * @param {certificateRequest} userInfo The user registration request.
 * @returns {Promise<registrationSchema>} The registration details of the user.
 */
export const hasAttended = async (
  userInfo: certificateRequest
): Promise<registrationSchema> => {
  const db = await DatabaseService.getInstance().getDb(
    process.env.MONGO_DBNAME!,
    "registrations"
  );
  const regInfo = (await db.findOne({
    email: userInfo.email,
    slug: userInfo.slug,
  })) as registrationSchema;
  if (!regInfo || !regInfo.attended) {
    throw errors.CERTIFICATE_NOT_FOUND;
  }
  return regInfo;
};

/**
 * Generates the certificate.
 * @param {registrationSchema} userReg The registration information of the user.
 * @returns {Promise<Buffer>} The image buffer of the generated certificate.
 */
export const generateCertificate = async (
  userReg: registrationSchema
): Promise<Buffer> => {
  const db = await DatabaseService.getInstance().getDb(
    process.env.MONGO_DBNAME!,
    "events"
  );
  const certList = (await db.findOne({ slug: userReg.slug })) as EventSchema;
  if (!certList) {
    throw errors.CERTIFICATE_NOT_FOUND;
  }
  const certParams: Array<certSchema> = certList.certificates.filter(
    (e: certSchema) => e.category === userReg.certificate.category
  );
  if (certParams.length === 0) {
    throw errors.CERTIFICATE_NOT_FOUND;
  }

  const certImage: Buffer = await getCertImage(certParams[0]);
  return genCert(certParams[0], certImage, userReg);
};

/**
 * Returns the appropriate certificate image buffer
 * @param {registrationSchema} userReg The registration of the user
 * @param {EventSchema} certParams The event details with the certificate parameters array
 * @returns {Promise<Buffer>} The image buffer of the required certificate
 */
const getCertImage = async (certParams: certSchema): Promise<Buffer> => {
  try {
    const fileName = certParams.fileName;
    const certImage = await StorageService.getInstance()
      .s3.getObject({
        Key: `${process.env.AWS_S3FOLDER}/${fileName}`,
        Bucket: process.env.AWS_S3BUCKET!,
      })
      .promise();
    return certImage.Body as Buffer;
  } catch (err) {
    if (!err.statusCode) {
      throw err;
    }
    throw errors.S3_FILE_NOT_FOUND;
  }
};
/**
 * Returns the Certificate with the User Details filled
 * @param {EventSchema} certParams Certificate object parameters
 * @param {Buffer} certImg Image Buffer fetched from S3
 * @param {registrationSchema} userReg User Registration Details
 * @returns {Promise<Buffer>} The filled-up certificate
 */
const genCert = async (
  certParams: certSchema,
  certImg: Buffer,
  userReg: registrationSchema
): Promise<Buffer> => {
  userReg.certificate.name = userReg.name;
  const userParams = Object.keys(userReg.certificate);
  let image = await Jimp.read(certImg);
  const promises = certParams.objects.map(async (field) => {
    if (!userParams.includes(field.type)) {
      return;
    }
    const font = await Jimp.loadFont(
      getFont(field.fontSize, certParams.fontColor)
    );
    const text = (type: string): string => {
      let result: string = "";
      for (let property in userReg.certificate) {
        if (property === type) {
          result = userReg.certificate[property];
          break;
        }
      }
      return result;
    };
    image = await image.print(
      font,
      field.x,
      field.y,
      {
        text: text(field.type),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      field.maxWidth,
      field.maxHeight
    );
  });
  await Promise.all(promises);
  if (certParams.qr && certParams.qr.enabled) {
    const qr = await Jimp.read(
      await getQR(
        userReg,
        certParams.qr.darkHex,
        certParams.qr.lightHex,
        certParams.qr.size
      )
    );
    await image.composite(qr, certParams.qr.x, certParams.qr.y);
  }
  return image.quality(100).getBufferAsync(Jimp.MIME_JPEG);
};

const getFont = (size: 8 | 16 | 32 | 64 | 128, color: "WHITE" | "BLACK") => {
  if (color === "WHITE") {
    switch (size) {
      case 8:
        return Jimp.FONT_SANS_8_WHITE;
      case 16:
        return Jimp.FONT_SANS_16_WHITE;
      case 32:
        return Jimp.FONT_SANS_32_WHITE;
      case 64:
        return Jimp.FONT_SANS_64_WHITE;
      case 128:
        return Jimp.FONT_SANS_128_WHITE;
      default:
        return Jimp.FONT_SANS_64_WHITE;
    }
  } else {
    switch (size) {
      case 8:
        return Jimp.FONT_SANS_8_BLACK;
      case 16:
        return Jimp.FONT_SANS_16_BLACK;
      case 32:
        return Jimp.FONT_SANS_32_BLACK;
      case 64:
        return Jimp.FONT_SANS_64_BLACK;
      case 128:
        return Jimp.FONT_SANS_128_BLACK;
      default:
        return Jimp.FONT_SANS_64_BLACK;
    }
  }
};

const getQR = async (
  userReg: registrationSchema,
  darkHex: string = "#000000FF",
  lightHex: string = "#FFFFFFFF",
  size: number = 200
): Promise<Buffer> => {
  const url = `${process.env.API_HOSTNAME}/api/v1/certificates/verify?registrantId=${userReg.registrantId}`;
  const dataURI = await QRCode.toDataURL(url, {
    width: size,
    margin: 1,
    color: {
      dark: darkHex,
      light: lightHex,
    },
  });
  return dataURIToBuffer(dataURI);
};

/**
 * The redirect url on the QR to check certificate validity.
 * @param {string} registrantId The registrant ID for any event.
 * @returns {registrationSchema} Returns the user registration details.
 */
export const verifyCertificate = async (
  registrantId: string
): Promise<registrationSchema> => {
  const db = await DatabaseService.getInstance().getDb(
    process.env.MONGO_DBNAME!,
    "registrations"
  );
  const result = await db.findOne<registrationSchema>(
    { registrantId: registrantId, attended: true },
    { projection: { _id: 0, slug: 0, attended: 0 } }
  );
  if (!result) {
    throw errors.CERTIFICATE_NOT_FOUND;
  }
  return result;
};
