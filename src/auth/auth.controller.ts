import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entity/user.entity';
import { Roles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('user')
  @Auth()
  getUser(
    @GetUser() user: User,
  ) {
    return this.authService.getUser(user);
  }

  @Get('users')
  @Auth(Roles.admin, Roles.superuser)
  getUsers() {
    return this.authService.getUsers();
  }
}
