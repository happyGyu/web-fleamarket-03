import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserRequestDto } from './dto/createUserRequset.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async create(
    @Res() res: Response,
    @Body() createUserDto: CreateUserRequestDto,
  ) {
    const userId = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ ok: true, userId });
  }
}
