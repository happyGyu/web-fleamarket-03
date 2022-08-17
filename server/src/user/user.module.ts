import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { RegionModule } from 'src/region/region.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RegionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
