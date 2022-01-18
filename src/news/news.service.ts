import { Injectable } from '@nestjs/common';

export interface News {
  id: number;
  title: string;
  description: string;
  author: string;
  countView: number;
}

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'string',
      description: 'string',
      author: 'string',
      countView: 34,
    },
  ];

  create(news: News): string {
    const index = this.news.findIndex((item) => item.id === news.id);
    if (index !== -1) {
      for (const key in news) {
        this.news[index][key] = news[key];
      }
      return 'новость изменена';
    }
    this.news.push(news);
    return 'новость добавлена';
  }

  find(id?: News['id']): News | News[] {
    return id ? this.news.find((news) => news.id === id) : this.news;
  }

  remove(id: News['id']): boolean {
    const index = this.news.findIndex((news) => news.id === id);
    if (index !== -1) {
      this.news.splice(index, 1);
      return true;
    }
    return false;
  }

  replace(body: News[]): News[] {
    this.news.splice(0, this.news.length, ...body);
    return this.news;
  }

  change(news: News): News[] | string {
    const index = this.news.findIndex((item) => item.id === news.id);
    if (index !== -1) {
      this.news.splice(index, 1, news);
      return this.news;
    }
    return 'not found';
  }
}
