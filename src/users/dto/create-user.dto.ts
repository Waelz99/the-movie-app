import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'StrongPassword123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password should be at least 8 characters' })
  password: string;
}
