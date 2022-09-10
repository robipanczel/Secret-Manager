import { IsPositive } from 'class-validator';

export interface Message {
  message: string;
}

export class PaginationQuery {
  @IsPositive()
  limit: number;

  @IsPositive()
  offset: number;

  constructor(limit: number, offset: number) {
    this.limit = limit;
    this.offset = offset;
  }
}
