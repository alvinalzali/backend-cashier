import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    // helper untuk cari unique
    findUnique(arg0: { where: { id: any; }; }) {
        throw new Error('Method not implemented.');
    }
    constructor(
        private prisma: PrismaService, 
        private jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto) {
        const { username, password, name } = registerDto;

        // Cek kalau user sudah ada
        const existingUser = await this.prisma.users.findUnique({
            where: {
                username,
            },
        });

        if (existingUser) {
            throw new ConflictException('User already exists'); 
        }
        
        // Buat user baru
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await this.prisma.users.create({
            data: {
                username,
                passwordHash: hashedPassword,
                name,
            },
        });
        
        // Kecualikan password ketika mau return
        const { passwordHash: _, ...result } = user; 

        return result;
    }

    async validateUser(username: string, password: string) {
        if (!username || !password) {
            throw new UnauthorizedException('Please insert username and password');
        }

        const user = await this.prisma.users.findUnique({
            where: { username },
        });

        if (!user) {
            throw new UnauthorizedException('Credentials not valid'); 
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credentials not valid'); 
        }

        const { passwordHash: _, ...result } = user;
        return result;
    }

    async login(user: { id: number, name: string }) {
        const payload = { sub: user.id, name: user.name };
        const accessToken = await this.jwtService.signAsync(payload, { 
            expiresIn: '12h' //token perlu diperbaharui setiap 12 jam
        });

        return { accessToken };
    }

    //verify token refresh
    verifyToken(token: string) {
        try {
            const payload = this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
            return payload;
        } catch (error) {
            return null;
        }
    }

    //helper find user by id
    findUserById(id: number) {
        return this.prisma.users.findUnique({
            where: {
                id,
            },
        });
        
    }


}

