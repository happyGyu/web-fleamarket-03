import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
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
    await this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json({ ok: true });
  }

  @Get('')
  async searchByNickname(
    @Res() res: Response,
    @Query('nickname') nickname: string,
  ) {
    const data = await this.userService.checkDuplicatedUserByNickname(nickname);
    return res.status(HttpStatus.OK).json({ ok: true, data });
  }
}
