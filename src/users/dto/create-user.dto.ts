import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class CreateUserDto{
    @IsString()
    @MinLength(8)
    @ApiProperty({
        type: String,
        description: 'The username in the app'
    })
    username

    @IsString()
    @MinLength(8)
    @ApiProperty({
        type: String,
        description: 'The password for login'
    })
    password

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the user'
    })
    name

    @IsString()
    @ApiProperty({
        type: String,
        description: 'The lastname of the user'
    })
    lastname
}