import React from 'react';
import { Product } from 'shared-utils';

type ProductItemProps = {
    product: Product;
    onSelectedChange?: (selected: boolean) => void;
    onQuantityChange?: (quantity: number) => void;
};
declare const ProductItem: React.FC<ProductItemProps>;

export { ProductItem };
