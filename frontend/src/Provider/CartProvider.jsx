import { useReducer } from "react";
import CartContext from "../context/CartContext";

const cartReducer = (state, action) => {
  switch (action?.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "SET_CART":
      return {
        ...state,
        items: action?.payload?.items || [],
        subtotal: action?.payload?.subtotal || 0,
        total: action?.payload?.total || 0,
        itemCount: action?.payload?.itemCount || 0,
        loading: false,
      };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    subtotal: 0,
    loading: false,
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {" "}
      {/* ← Fixed: Added .Provider and spread state */}
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
