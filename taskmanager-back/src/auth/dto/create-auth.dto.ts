import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
	@ApiProperty({ example: 'user@example.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'João Silva' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ example: 'strongPassword123', minLength: 6 })
	@IsString()
	@MinLength(6)
	password: string;
}
