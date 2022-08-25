import { Expose, Transform } from 'class-transformer';
import { UserEntity } from '../../auth/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';


export class ReportDto extends PickType(UserEntity, [
  'id'
]) {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  /*
  @Transform((params) => {
    return params?.obj?.user?.id;
  })
  @Expose()
  userId: number;
  */
}
