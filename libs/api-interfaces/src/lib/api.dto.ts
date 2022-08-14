import { IsOptional, IsPositive } from 'class-validator';

export interface Message {
  message: string;
}

export class PaginationQuery {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  constructor(limit: number, offset: number) {
    this.limit = limit;
    this.offset = offset;
  }
}
