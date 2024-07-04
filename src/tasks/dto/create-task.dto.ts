import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    title

    @IsString()
    @IsNotEmpty()
    description
}