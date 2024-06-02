import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ECategory } from '../types';
import { User } from '../users/entity/user.entity';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: User) {
    const { name } = createCategoryDto;

    if (!name) {
      throw new BadRequestException(ECategory.MISSING_PARAMS);
    }
    const existCategory = await this.categoryRepository.findOne({
      where: { name },
    });

    if (existCategory) {
      throw new BadRequestException(ECategory.CATEGORY_EXIST);
    }

    const createdCategory = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });

    const category = await this.categoryRepository.save(createdCategory);

    return { message: 'Category created successfully', category };
  }

  async findAllCategories() {
    return await this.categoryRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findAllAndPaginate(page: number, limit: number) {
    console.log(page, limit);
    const [categories, count] = await this.categoryRepository.findAndCount({
      order: { id: 'ASC' },
      skip: (+page - 1) * +limit,
      take: +limit,
    });

    return { categories, count };
  }

  async findCategoryById(id: number) {
    return await this.categoryRepository.findOne({
      where: { id },
    });
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(
      { id },
      { name: updateCategoryDto.name },
    );

    const category = await this.findCategoryById(id);

    return { message: 'Category update successfully', category };
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.delete({ id });
    return { message: 'Category delete successfully' };
  }
}
