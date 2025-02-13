import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {

	constructor(private prisma: PrismaService) { }

	async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
		try {
			const product = await this.prisma.product.create({ data });
			return this.toProductResponseDto(product);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				// Código de error para violación de constraint (por ejemplo, producto duplicado)
				if (error.code === 'P2002') {
					throw new BadRequestException('El producto ya existe');
				}
			}
			throw new BadRequestException('Error al crear el producto');
		}
	}

	async findAllProducts(): Promise<ProductResponseDto[]> {
		try {
			const products = await this.prisma.product.findMany();
			return products.map(product => this.toProductResponseDto(product));
		} catch (error) {
			throw new BadRequestException('Error al obtener los productos');
		}
	}

	async findProductById(id: string): Promise<ProductResponseDto> {
		try {
			const product = await this.prisma.product.findUnique({ where: { id } });
			if (!product) {
				throw new NotFoundException('Producto no encontrado');
			}
			return this.toProductResponseDto(product);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new BadRequestException('Error al obtener el producto');
		}
	}

	async updateProduct(id: string, data: UpdateProductDto): Promise<ProductResponseDto> {
		try {
			const updatedProduct = await this.prisma.product.update({ where: { id }, data });
			return this.toProductResponseDto(updatedProduct);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				// P2025 indica que no se encontró el registro para actualizar
				if (error.code === 'P2025') {
					throw new NotFoundException('Producto no encontrado');
				}
			}
			throw new BadRequestException('Error al actualizar el producto');
		}
	}

	async deleteProduct(id: string): Promise<ProductResponseDto> {
		if (!id) {
			throw new BadRequestException('El ID del producto es obligatorio');
		}
		try {
			const deletedProduct = await this.prisma.product.delete({ where: { id } });
			return this.toProductResponseDto(deletedProduct);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				// P2025 indica que no se encontró el registro para eliminar
				if (error.code === 'P2025') {
					throw new NotFoundException('Producto no encontrado');
				}
			}
			throw new BadRequestException('Error al eliminar el producto');
		}
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
