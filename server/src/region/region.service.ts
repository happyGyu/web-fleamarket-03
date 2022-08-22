import { CreateUserRegionDto } from './dto/createUserRegion.dto';
import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/createRegion.dto';
import { RegionRepository } from './repository/region.repository';
import { UserRegionRepository } from './repository/userRegion.repository';

@Injectable()
export class RegionService {
  constructor(
    private readonly userRegionRepository: UserRegionRepository,
    private readonly regionRepository: RegionRepository, // private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionRepository.create(createRegionDto);
    return newRegion.id;
  }

  async createUserRegion(createUserRegionDto: CreateUserRegionDto) {
    return await this.userRegionRepository.create(createUserRegionDto);
  }

  async searchByKeyword(keyword: string) {
    return this.regionRepository.findByKeyword(keyword);
  }
}
