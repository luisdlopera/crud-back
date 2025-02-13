import { IsString, IsNumber, IsOptional, IsPositive, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;

  @IsString({ message: 'La descripción debe ser un texto' })
  description: string;
}