import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class UpdateTaskDto{
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

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        description: "Done or not done"
    })
    status
}