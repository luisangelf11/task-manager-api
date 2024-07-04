import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "This is a title"
    })
    title

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "This is a description about task"
    })
    description
}