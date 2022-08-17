import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionService } from 'src/region/region.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private regionService: RegionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, oAuthOrigin, oAuthId, regionId } = createUserDto;
    const newUser = this.userRepository.create({ name, oAuthOrigin, oAuthId });
    const newUserId = await (await this.userRepository.save(newUser)).id;
    this.regionService.createUserRegion({ userId: newUserId, regionId });
    return newUserId;
  }
}
