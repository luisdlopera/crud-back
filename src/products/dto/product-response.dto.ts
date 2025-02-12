export class ProductResponseDto {
    id: string;
    name: string;
    price: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}