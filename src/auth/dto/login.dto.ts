import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    @MinLength(6)
    password: string
}