import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateTaskDto{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        type: String,
        description: "This is a title"
    })
    title?

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        type: String,
        description: "This is a description about task"
    })
    description?

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        type: Boolean,
        description: "Done or not done"
    })
    status?
}