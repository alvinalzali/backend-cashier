import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';



@Injectable()
export class FileService { 

    //ambil path file sementara /uploads/temp dari env untuk multer
    getUploadPathTemp() {
        return process.env.UPLOAD_TEMP_PATH;
    }

    //ambil path file /uploads/pictures dari env untuk multer
    getUploadPath() {
        return process.env.UPLOAD_PATH;
    }

    async uploadFile(file: Pick<Express.Multer.File, 'originalname' | 'buffer'>) {
        const { originalname, buffer } = file;
        const extension = extname(originalname);
        const fileName = `${Date.now()}${extension}`;
        const filePathTemp = `${this.getUploadPathTemp()}/${fileName}`;
        const filePathSave = `${this.getUploadPath()}/${fileName}`;
    }
}
