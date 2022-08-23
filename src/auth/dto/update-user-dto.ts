import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  age: number;
}