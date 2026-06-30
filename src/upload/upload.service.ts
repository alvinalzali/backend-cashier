import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  
  async processAndSaveImage(file: Express.Multer.File) {
    // cek ukuran size (max 5mb)
    const maxSize = 5 * 1024 * 1024; 
    if (file.size > maxSize) {
      throw new BadRequestException('File size is too large. Max size: 5MB');
    }

    // cek file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only file types are allowed: ' + allowedMimeTypes.join(', '));
    }

    // cek file exist
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // pemberian nama file by timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase(); 
    const filename = `${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // simpan file ke hard disk (dari buffer)
    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (error) {
      console.error("🔥 ERROR SIMPAN FILE:", error);
      throw new InternalServerErrorException('Gagal menyimpan file ke server.');
    }

    // return image as url
    const fileUrl = `http://localhost:3000/uploads/${filename}`;
    
    return {
      message: 'Upload gambar berhasil',
      pictureUrl: fileUrl,
    };
  }
}