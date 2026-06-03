import { Controller, Post, UseGuards } from '@nestjs/common';
import {AuthGuard} from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {

    
    @Post('upload')
    uploadFile() {
        return 'upload file';
    }
}
