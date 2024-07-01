import { IsString, MinLength } from "class-validator"

export class CreateUserDto{
    @IsString()
    @MinLength(8)
    username

    @IsString()
    @MinLength(8)
    password

    @IsString()
    name

    @IsString()
    lastname
}