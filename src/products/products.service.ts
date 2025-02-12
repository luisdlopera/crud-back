import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) { }

  async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.prisma.product.create({ data });
    return this.toProductResponseDto(product);
    
  }

  async findAllProducts() {
    return this.prisma.product.findMany();
  }

  async findProductById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  private toProductResponseDto(product: any): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
