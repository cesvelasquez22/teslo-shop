import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RoleProtected } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entity/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
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
  @UseGuards(AuthGuard())
  getUser(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() headers: string[],
  ) {
    console.log({ headers });
    return {
      ok: true,
      user,
      email,
    };
  }

  @Get('users')
  // @SetMetadata('roles', ['admin', 'superuser'])
  @RoleProtected(Roles.admin, Roles.superuser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getUsers() {
    return this.authService.getUsers();
  }
}
