import React from 'react';
import { Product } from 'shared-utils';

interface ProductItemProps {
    product: Product;
    quantity?: number;
    onSelect: (id: string) => void;
    onQuantityChange?: (id: string, quantity: number) => void;
    standalone?: boolean;
}
declare const ProductItem: React.FC<ProductItemProps>;

export { ProductItem, type ProductItemProps };
