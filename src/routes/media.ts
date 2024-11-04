import express, { Request, Response } from "express";
import multer from "multer";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import {
  DO_SPACES_ENDPOINT,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_REGION,
  DO_SPACES_NAME,
} from "../constants/secret";
const mediaRoutes = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Save files in src/uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage: storage });

// Configure AWS SDK with DigitalOcean Spaces credentials
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(DO_SPACES_ENDPOINT),
  accessKeyId: DO_SPACES_KEY,
  secretAccessKey: DO_SPACES_SECRET,
  region: DO_SPACES_REGION,
});
mediaRoutes.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const fileContent = fs.readFileSync(req.file.path);
    const params = {
      Bucket: DO_SPACES_NAME,
      Key: req.file.filename, // Name the file in the space
      Body: fileContent,
      ACL: "public-read", // Optional: makes file publicly readable
    };

    s3.upload(params, (err: any, data: { Location: any }) => {
      // Delete file from local storage

      req && req.file && fs.unlinkSync(req.file.path);
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send("Failed to upload file");
      }
      res.send({ message: "File uploaded successfully", data });
    });
  }
);
export { mediaRoutes };
