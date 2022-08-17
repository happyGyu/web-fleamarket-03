import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { Region } from './entities/region.entity';
import { UserRegion } from './entities/userRegion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, UserRegion])],
  controllers: [RegionController],
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {}
