import React from 'react';

interface ProductItemProps {
    product: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    };
    onSelect?: (id: string) => void;
    onQuantityChange?: (id: string, quantity: number) => void;
    isControlled?: boolean;
}
declare const ProductItem: React.FC<ProductItemProps>;

export { ProductItem, type ProductItemProps };
