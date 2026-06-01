import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); //ambil request
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Missing token');
        }
        try {
            const payload = await this.jwtService.verify(token); //untuk memverifikasi token
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Invalid token'+token);
        }
        return true;
    }

    //untuk ekstract token
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}