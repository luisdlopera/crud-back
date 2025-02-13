import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) { }

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo producto' })
	@ApiBody({ type: CreateProductDto })
	@ApiResponse({
		status: 201,
		description: 'Producto creado exitosamente',
		type: ProductResponseDto,
	})
	@ApiResponse({ status: 400, description: 'Datos inválidos o producto ya existe' })
	create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
		return this.productsService.createProduct(createProductDto);
	}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los productos' })
	@ApiResponse({
		status: 200,
		description: 'Listado de productos',
		type: [ProductResponseDto],
	})
	findAll() {
		return this.productsService.findAllProducts();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un producto por ID' })
	@ApiParam({ name: 'id', description: 'ID del producto' })
	@ApiResponse({
		status: 200,
		description: 'Producto encontrado',
		type: ProductResponseDto,
	})
	@ApiResponse({ status: 404, description: 'Producto no encontrado' })
	findOne(@Param('id') id: string) {
		return this.productsService.findProductById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar un producto por ID' })
	@ApiParam({ name: 'id', description: 'ID del producto a actualizar' })
	@ApiBody({ type: UpdateProductDto })
	@ApiResponse({
		status: 200,
		description: 'Producto actualizado exitosamente',
		type: ProductResponseDto,
	})
	@ApiResponse({ status: 400, description: 'Datos inválidos' })
	@ApiResponse({ status: 404, description: 'Producto no encontrado' })
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.updateProduct(id, updateProductDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un producto por ID' })
	@ApiParam({ name: 'id', description: 'ID del producto a eliminar' })
	@ApiResponse({
		status: 200,
		description: 'Producto eliminado exitosamente',
		type: ProductResponseDto,
	})
	@ApiResponse({ status: 404, description: 'Producto no encontrado' })
	remove(@Param('id') id: string) {
		return this.productsService.deleteProduct(id);
	}
}
