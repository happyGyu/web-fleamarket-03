import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateRegionDto } from './dto/createRegion.dto';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const newRegion = this.regionRepository.create(createRegionDto);
    await this.regionRepository.save(newRegion);
    return newRegion.id;
  }

  async searchByKeyword(keyword: string) {
    return await this.regionRepository.find({
      where: {
        address: Like(`%${keyword}%`),
      },
    });
  }
}
