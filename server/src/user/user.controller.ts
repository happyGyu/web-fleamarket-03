import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const userId = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ ok: true, userId });
  }
}
