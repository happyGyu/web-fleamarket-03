import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
