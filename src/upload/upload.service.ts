import { Injectable, BadRequestException } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
    handleFileUpload(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // cek file tipe
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpeg', 'image/webp'];       
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type : Only jpg, png, jpeg, webp are allowed');
        }

        // cek file size
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new BadRequestException('File size exceeds the maximum limit of 5MB');
        }

        // path untuk menyimpan file
        const uploadDir = './public/uploads'; 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // penamaan file 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extention = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extention}`;
        const filePath = path.join(uploadDir, filename);

        // simpan file dari buffer ke path (./public/uploads)
        try {
            fs.writeFileSync(filePath, file.buffer);
        } catch(error) {
            throw new BadRequestException('Failed to save file');
        }

        // kembalikan file as url
        const fileUrl = `http://localhost:3000/uploads/${filename}`;

        return {
            message: 'File uploaded successfully',
            pictureUrl: fileUrl,
        }

    }



}
