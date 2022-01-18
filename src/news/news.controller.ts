import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { NewsService, News } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/all')
  getAll(): News | News[] {
    return this.newsService.find();
  }

  @Get('/:id')
  get(@Param('id') id: string): News | News[] {
    const idInt = parseInt(id);
    return this.newsService.find(idInt);
  }

  @Post()
  create(@Body() news: News): string {
    if (news) return this.newsService.create(news);
  }

  @Put()
  replace(@Body() news: News[]): News[] {
    if (news) return this.newsService.replace(news);
  }

  @Patch()
  change(@Body() news: News) {
    if (news) return this.newsService.change(news);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoved = this.newsService.remove(idInt);
    return isRemoved ? 'Новость удаленна' : 'Новость не найденна';
  }
}
