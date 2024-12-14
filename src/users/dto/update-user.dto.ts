import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'newemail@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The new password for the user',
    example: 'NewStrongPassword123',
    required: false,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password should be at least 8 characters' })
  @IsOptional()
  password?: string;
}
