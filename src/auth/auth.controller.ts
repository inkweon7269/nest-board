import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor, Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import {
  Serialize,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('auth')
// 로그인시 토큰값이 노출되지 않는 부작용이 생김
// @Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: UserEntity) {
    console.log('user', user);
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    const obj = { username, password };
    return this.authService.signIn(obj);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id, @GetUser() user: UserEntity) {
    console.log('handler is running');
    return this.authService.findOne(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: UserEntity,
  ) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id, @GetUser() user: UserEntity) {
    return this.authService.remove(id);
  }
}
