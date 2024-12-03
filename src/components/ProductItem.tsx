import { IonItem, IonLabel, IonButtons, IonButton, IonText } from '@ionic/react';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
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
    <IonItem>
      {/* Product Details */}
      <IonLabel>
        <h2>{product.name}</h2>
        <p>{product.price.toFixed(2)} €</p>
      </IonLabel>

      {/* Quantity Controls */}
      {displayQuantity !== 0 && displayQuantity !== undefined ? (
        <IonButtons slot="end">
          <IonButton style={styles.roundBtn} fill="solid" color={'primary'} shape="round" onClick={() => handleQuantityChange(Math.max(displayQuantity! - 1, 0))}>
            -
          </IonButton>
          <IonText style={{ margin: '0 8px' }}>{displayQuantity}</IonText>
          <IonButton style={styles.roundBtn} fill="solid" color={'primary'} shape="round" onClick={() => handleQuantityChange(displayQuantity! + 1)}>+</IonButton>
        </IonButtons>
      ) : (
        // Add to Cart Button
        <IonButton style={styles.mainBtn} color={'primary'} slot="end" onClick={() => handleAddToCart()}>
          Add to Cart
        </IonButton>
      )}
    </IonItem>
  );
};

const styles = StyleSheet.create({
  item: { padding: 2 },
  mainBtn: { fontSize: 14},
  roundBtn: { fontSize: 20, fontWeight: 'bold', width: 30},
});