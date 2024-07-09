import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`);
    },
});

export const upload = multer({ storage });
