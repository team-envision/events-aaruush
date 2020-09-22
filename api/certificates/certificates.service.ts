import * as Jimp from "jimp";
import * as QRCode from "qrcode";
import dataURIToBuffer from "data-uri-to-buffer";

import { DatabaseService } from "../services/database.service";
import { errors } from "../error/error.constant";
import { registrationSchema, certificateRequest } from "./certificates.schema";
import { EventSchema } from "../events/events.schema";
import { StorageService } from "../services/storage.service";
import { LoggerService } from "../services/logger.service";

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
  if (!regInfo || regInfo.attended === "no") {
    throw errors.CERTIFICATE_NOT_FOUND;
  }
  return regInfo;
};

export const generateCertificate = async (
  userReg: registrationSchema
): Promise<Buffer> => {
  const db = await DatabaseService.getInstance().getDb(
    process.env.MONGO_DBNAME!,
    "events"
  );
  const certParams = (await db.findOne({ slug: userReg.slug })) as EventSchema;
  if (!certParams) {
    throw errors.CERTIFICATE_NOT_FOUND;
  }
  const certImage: Buffer = await getCertImage(userReg, certParams);
  return genCert(certParams, certImage, userReg);
};

const getCertImage = async (
  userReg: registrationSchema,
  certParams: EventSchema
): Promise<Buffer> => {
  try {
    const fileName = !userReg.winner
      ? certParams.certificate.fileName
      : `${certParams.certificate.fileName}-winner`;
    const certImage = await StorageService.getInstance()
      .s3.getObject({
        Key: `aaruush20/${fileName}.${certParams.certificate.fileType}`,
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
  certParams: EventSchema,
  certImg: Buffer,
  userReg: registrationSchema
): Promise<Buffer> => {
  const userParams = Object.keys(userReg);
  console.log(userParams);
  let image = await Jimp.read(certImg);
  const promises = certParams.certificate.objects.map(async (field) => {
    if (!userParams.includes(field.type)) {
      return;
    }
    const font = await Jimp.loadFont(
      getFont(field.fontSize, certParams.certificate.fontColor)
    );
    const text = () => {
      switch (field.type) {
        case "name":
          return userReg.name;
          break;
        case "winner":
          return userReg.winner?.position;
          break;
        case "theme":
          return userReg.theme;
          break;
      }
    };
    image = await image.print(
      font,
      field.x,
      field.y,
      {
        text: text(),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      field.maxWidth,
      field.maxHeight
    );
  });
  await Promise.all(promises);
  if (certParams.certificate.qr && certParams.certificate.qr.enabled) {
    const qr = await Jimp.read(
      await getQR(
        userReg,
        certParams.certificate.qr.darkHex,
        certParams.certificate.qr.lightHex,
        certParams.certificate.qr.size
      )
    );
    await image.composite(
      qr,
      certParams.certificate.qr.x,
      certParams.certificate.qr.y
    );
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
  size: number = 400
): Promise<Buffer> => {
  const url = `${process.env.API_HOSTNAME}/api/v1/verify?registrantId=${userReg.registrantId}`;
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
