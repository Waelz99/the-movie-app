import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
