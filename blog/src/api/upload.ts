import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import {
  GatsbyFunctionRequest,
  GatsbyFunctionResponse,
} from "gatsby";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export default async function uploadHandler(
  req: GatsbyFunctionRequest<{ file: File }>,
  res: GatsbyFunctionResponse
) {
  try {
    if (req.method === "POST") {
      console.log(req.body);

      const { file } = req.body;

      const command = new PutObjectCommand({
        Bucket: "justin-cms-images",
        Key: file.name,
        Body: "ABC!",
      });

      const result = await s3Client.send(command);

      res.json(result);
    }
  } catch (error) {
    console.log("Upload error", error);
  }
}
