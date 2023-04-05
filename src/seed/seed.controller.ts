import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entity/user.entity';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth()
  async executeSeed(@GetUser() user: User) {
    return this.seedService.execute(user);
  }
}
