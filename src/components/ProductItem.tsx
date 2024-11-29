import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Product } from 'shared-utils';

export interface ProductItemProps {
  product: Product; // Always pass the product object
  quantity?: number; // Optional: Quantity (only for cart items)
  onSelect: (id: string) => void; // Callback for adding to the cart
  onQuantityChange?: (id: string, quantity: number) => void; // Callback for changing quantity
  isControlled?: boolean; // If true, use controlled mode for quantity
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  quantity,
  onSelect,
  onQuantityChange,
  isControlled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      {quantity !== undefined ? (
        <View style={styles.cartActions}>
          <Button title="-" onPress={() => onQuantityChange?.(product.id, Math.max(quantity - 1, 0))} />
          <Text style={styles.quantity}>{quantity}</Text>
          <Button title="+" onPress={() => onQuantityChange?.(product.id, quantity + 1)} />
        </View>
      ) : (
        <Button title="Add to Cart" onPress={() => onSelect(product.id)} />
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