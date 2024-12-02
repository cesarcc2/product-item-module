import React from 'react';
import { StoryFn } from '@storybook/react';
import { ProductItem, ProductItemProps } from '../index';

export default {
    title: 'Components/ProductItem',
    component: ProductItem,
  };
  
  const mockProduct = {
    id: '1',
    name: 'Sample Product',
    price: 19.99,
  };
  
  const Template: StoryFn<ProductItemProps> = (args: any) => <ProductItem {...args} />;
  
  export const Default = Template.bind({});
  Default.args = {
    product: mockProduct,
    onSelect: (id: string) => console.log('Selected:', id),
    standalone: true
  };
  
  export const WithQuantity = Template.bind({});
  WithQuantity.args = {
    product: mockProduct,
    quantity: 2,
    onSelect: (id: string) => console.log('Selected:', id),
    onQuantityChange: (id: string, quantity: number) =>
      console.log('Quantity Changed:', id, quantity),
    standalone: true
  };