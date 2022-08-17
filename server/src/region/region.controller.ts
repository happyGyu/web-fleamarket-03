import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/createRegion.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Res() res: Response, @Body() createRegionDto: CreateRegionDto) {
    const regionId = await this.regionService.create(createRegionDto);
    return res.status(HttpStatus.CREATED).json({ ok: true, regionId });
  }
}
