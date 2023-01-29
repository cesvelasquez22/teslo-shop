import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  getImagePath(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);

    if (!existsSync(path)) {
      throw new NotFoundException(`No image found with image: ${imageName}`);
    }
    return path;
  }
}
