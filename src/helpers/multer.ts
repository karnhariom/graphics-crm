import multer, { diskStorage } from "multer";
import { NextRequest, NextResponse } from "next/server";

const multerStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});

const multerFilter = (req: any, file: any, cb: any) => {
    let allowedMimes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error("Invalid file type"));
    }
};

const upload: any = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("categoryImage");



export const handleCategoryImgUpload = async (req: NextRequest, res: NextResponse) => {
    return new Promise((resolve, reject) => {
        upload(req, res, async (err: any) => {
            if (err instanceof multer.MulterError) {
                console.log('err: ', err);
                return resolve(NextResponse.json({
                    status: 412,
                    message: err.message
                }))
            } else if (err) {
                console.log('err: ', err);
                return resolve(NextResponse.json({
                    status: 412,
                    message: err.message
                }))
            }
            return resolve(NextResponse.next());
        })
    })
};