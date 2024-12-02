import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Product } from 'shared-utils';

export interface ProductItemProps {
  product: Product; // Always pass the product object
  quantity?: number; // Optional: Quantity (only for cart items)
  onSelect: (id: string) => void; // Callback for adding to the cart
  onQuantityChange?: (id: string, quantity: number) => void; // Callback for changing quantity
  standalone?: boolean; // If true, use controlled mode for quantity
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  quantity,
  onSelect,
  onQuantityChange,
  standalone = false,
}) => {

  const [localQuantity, setLocalQuantity] = useState<number>(quantity || 0);

  const handleQuantityChange = (newQuantity: number) => {
    console.log('Quantity Changed:', newQuantity);
    if (standalone) {
      setLocalQuantity(newQuantity); // Update local state
    } else {
      if (onQuantityChange) {
        onQuantityChange(product.id, newQuantity); // Use callback
      }
    }
  };

  const handleAddToCart = () => {
    console.log('Add to Cart:', product.id);
    if (standalone) {
      setLocalQuantity((prev) => prev + 1);
    } else {
      if (onSelect) {
        onSelect(product.id);
      }
    }
  };

  const displayQuantity = standalone ? localQuantity : quantity;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      {displayQuantity !== 0 && displayQuantity !== undefined ? (
        <View style={styles.cartActions}>
          <Button title="-" onPress={() => handleQuantityChange(Math.max(displayQuantity! - 1, 0))} />
          <Text style={styles.quantity}>{displayQuantity}</Text>
          <Button title="+" onPress={() => handleQuantityChange(displayQuantity! + 1)} />
        </View>
      ) : (
        <Button title="Add to Cart" onPress={() => handleAddToCart()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#888' },
  cartActions: { flexDirection: 'row', alignItems: 'center' },
  quantity: { marginHorizontal: 10, fontSize: 16 },
});