import { Injectable } from '@nestjs/common';
import { UserRegionRepository } from 'src/region/repository/userRegion.repository';
import { CreateUserRequestDto } from './dto/createUserRequset.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private regionRepository: UserRegionRepository,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    const { name, oAuthOrigin, oAuthId, regionId } = createUserDto;
    const newUser = await this.userRepository.create({
      name,
      oAuthOrigin,
      oAuthId,
    });

    await this.regionRepository.create({
      userId: newUser.id,
      regionId,
    });
    return newUser;
  }

  async getOneByOAuthId(id: string) {
    return await this.userRepository.findOneByOAuthId(id);
  }
}
