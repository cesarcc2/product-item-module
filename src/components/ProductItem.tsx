import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Product } from 'shared-utils';

type ProductItemProps = {
  product: Product;
  onSelectedChange?: (selected: boolean) => void;
  onQuantityChange?: (quantity: number) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onSelectedChange, onQuantityChange }) => {
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const toggleSelected = () => {
    setSelected(!selected);
    onSelectedChange?.(!selected);
  };

  const updateQuantity = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{product.name}</Text>
      <Text>${product.price}</Text>
      <Button title={selected ? 'Deselect' : 'Select'} onPress={toggleSelected} />
      {selected && (
        <View style={styles.controls}>
          <Button title="-" onPress={() => updateQuantity(-1)} />
          <Text>{quantity}</Text>
          <Button title="+" onPress={() => updateQuantity(1)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
});

export default ProductItem;