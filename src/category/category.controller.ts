import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createGame(@Body() categoryDto: CreateCategoryDto, @Req() req) {
    return await this.categoryService.createCategory(categoryDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllCategories() {
    return await this.categoryService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get('paginate')
  async findAllAndPaginate(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.categoryService.findAllAndPaginate(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoryService.findCategoryById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, categoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
