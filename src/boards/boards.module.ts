import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
