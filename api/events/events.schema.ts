export interface EventSchema {
  _id: string;
  name: string;
  slug: string;
  date: string;
  poster: string;
  link: string;
  certificate: {
    fileName: string;
    fileType: string;
    fontColor: "WHITE" | "BLACK";
    objects: Array<{
      type: "name" | "position" | "theme";
      x: number;
      y: number;
      maxWidth: number;
      maxHeight: number;
      fontSize: 8 | 16 | 32 | 64 | 128;
    }>;
  };
}
