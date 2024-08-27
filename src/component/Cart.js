// components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../Redux/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleRemoveItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddItem({ id: '1', name: 'New Item' })}>Add Item</button>
    </div>
  );
}

export default Cart;
