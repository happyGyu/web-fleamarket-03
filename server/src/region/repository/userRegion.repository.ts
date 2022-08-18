import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRegion } from '../entities/userRegion.entity';
import { CreateUserRegionDto } from '../dto/createUserRegion.dto';

@Injectable()
export class UserRegionRepository {
  private repository: Repository<UserRegion>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserRegion);
  }

  public async create(input: CreateUserRegionDto): Promise<UserRegion> {
    return this.repository.save({ ...input });
  }
}
