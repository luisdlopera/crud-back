import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  name: string;
  price: number;
  description: string;
}