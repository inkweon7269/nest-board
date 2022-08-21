import { IsEnum } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class UpdateBoardStatusDto {
  @IsEnum(BoardStatus)
  status: BoardStatus;
}