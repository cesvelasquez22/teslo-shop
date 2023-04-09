import { join } from 'path';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FilesService {
  constructor(private readonly cloudinary: CloudinaryService) {}
  async uploadImage(file: Express.Multer.File) {
    try {
      const result = await this.cloudinary.uploadImage(file);
      return result.secure_url;
    } catch (error) {
      console.log({error});
      throw new BadRequestException('Invalid type file');
    }
  }
  getImagePath(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);

    if (!existsSync(path)) {
      throw new NotFoundException(`No image found with image: ${imageName}`);
    }
    return path;
  }
}
