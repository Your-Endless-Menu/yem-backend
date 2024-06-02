import {IsArray, IsNotEmpty, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsArray()
    emails: string[];

    @IsNotEmpty()
    @IsArray()
    role: string[];
}
