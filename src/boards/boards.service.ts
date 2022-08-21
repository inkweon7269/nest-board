import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepo: Repository<BoardEntity>,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    const { title, description } = createBoardDto;

    const board = this.boardRepo.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepo.save(board);

    return board;
  }

  async getAllBoards(user: UserEntity): Promise<BoardEntity[]> {
    const query = this.boardRepo.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();
    return boards;

    // return this.boardRepo.find();
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    const found = await this.boardRepo.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: UserEntity): Promise<void> {
    // const result = await this.boardRepo.delete({ id, user );
    const result = await this.boardRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result', result);
  }

  async updateBoardStatus(
    id: number,
    status: BoardStatus,
  ): Promise<BoardEntity> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepo.save(board);

    return board;
  }

  /*
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);

    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
  */
}
