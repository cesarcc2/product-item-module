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

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onSelect,
  onQuantityChange,
  isControlled = false,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSelect = () => {
    if(!onSelect) {
      return;
    }
    if (!isControlled) {
      setQuantity(1); // Automatically set quantity to 1 when selected 
    }
    onSelect(product.id);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = isControlled ? product.quantity + change : quantity + change;
    if (newQuantity >= 0) {
      if (!isControlled) setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(product.id, newQuantity);
    }
  };

  const isSelected = isControlled ? product.quantity > 0 : quantity > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text>{`Price: $${product.price}`}</Text>
      <View style={styles.actions}>
        {!isSelected ? (
          <Button title="Select" onPress={handleSelect} />
        ) : (
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => handleQuantityChange(-1)} />
            <Text style={styles.quantity}>
              {isControlled ? product.quantity : quantity}
            </Text>
            <Button title="+" onPress={() => handleQuantityChange(1)} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  name: { fontWeight: 'bold', marginBottom: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantity: { marginHorizontal: 10, fontSize: 16 },
});