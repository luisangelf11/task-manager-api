import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class UpdateTaskDto{
    @IsString()
    @IsNotEmpty()
    title

    @IsString()
    @IsNotEmpty()
    description

    @IsBoolean()
    status
}