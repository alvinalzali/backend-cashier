import { IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    constructor(username: string, password: string, name: string) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    name: string;
}