import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportsEntity } from './reports.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity)
    private readonly reportsRepo: Repository<ReportsEntity>,
  ) {}

  create(reportDto: CreateReportDto, user: UserEntity) {
    const report = this.reportsRepo.create({
      ...reportDto,
      user,
    });

    return this.reportsRepo.save(report);
  }
}
