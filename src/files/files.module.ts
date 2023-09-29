import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule, CloudinaryModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
