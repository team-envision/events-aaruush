export interface certSchema {
  category: string;
  fileName: string;
  fontColor: "WHITE" | "BLACK";
  objects: Array<{
    type: string;
    x: number;
    y: number;
    maxWidth: number;
    maxHeight: number;
    fontSize: 8 | 16 | 32 | 64 | 128;
  }>;
  qr: {
    enabled: boolean;
    darkHex: string;
    lightHex: string;
    x: number;
    y: number;
    size: number;
  };
}

export interface EventSchema {
  _id: string;
  name: string;
  slug: string;
  date: Date;
  poster: string;
  description: string;
  link: string;
  certificates: Array<certSchema>;
}
