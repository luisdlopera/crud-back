import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  name: string;

  @Transform(({ value }) => parseFloat(value))
  price: number;

  description: string;
}