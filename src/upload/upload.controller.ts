import { Controller, UseGuards, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';


@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('image')
    @UseInterceptors(FileInterceptor('file')) //ambil file lalu simpan di buffer
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.handleFileUpload(file);
    }

}
