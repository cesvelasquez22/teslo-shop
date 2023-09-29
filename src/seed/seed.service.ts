import { Injectable } from '@nestjs/common';
import { User } from '../auth/entity/user.entity';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed.data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute() {
    // Delete all products
    await this.hardDelete();
    // Insert new users
    const firstUser = await this.insertNewUsers();
    // Insert new products
    await this.insertNewProducts(firstUser);
    return 'seed executed!';
  }

  private async hardDelete() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    for (const user of seedUsers) {
      users.push(this.userRepository.create(user));
    }

    const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
