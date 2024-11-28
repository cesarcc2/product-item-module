import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export interface ProductItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onSelect?: (id: string) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  isControlled?: boolean; // If true, parent controls state
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onSelect,
  onQuantityChange,
  isControlled = false,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSelect = () => {
    if (!isControlled && onSelect) onSelect(product.id);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 0) {
      if (!isControlled) setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(product.id, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{product.name}</Text>
      <Text>{`Price: $${product.price}`}</Text>
      <View style={styles.actions}>
        <Button title="Select" onPress={handleSelect} />
        <Button title="-" onPress={() => handleQuantityChange(-1)} />
        <Text>{quantity}</Text>
        <Button title="+" onPress={() => handleQuantityChange(1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1 },
  actions: { flexDirection: 'row', alignItems: 'center' },
});

export default ProductItem;