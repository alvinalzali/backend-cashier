import { Body, Post, Controller, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //register endpoint
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    //login endpoint
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // validasi dulu user kemudian lanjut login (untuk ekstract token)
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        return this.authService.login({ id: user.id, name: user.name });
    }

}
