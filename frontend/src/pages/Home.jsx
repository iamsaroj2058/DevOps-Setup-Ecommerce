import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAxios } from "../hooks/useAxios";
import useAuth from "../hooks/useAuth"; // ← Uncomment this
import Hero from "./Hero";
import Products from "./Products";

export const Home = () => {
  const { dispatch } = useCart();
  const { auth } = useAuth(); // ← Uncomment this
  const accessToken = auth?.accessToken; // ← Use ONLY this line (remove the null line)

  const { api } = useAxios();

  const fetchCartData = async () => {
    dispatch({ type: "START_LOADING" });
    if (!accessToken) {
      dispatch({ type: "STOP_LOADING" });
      return;
    }
    try {
      const response = await api.get("/cart/");
      dispatch({
        type: "SET_CART",
        payload: {
          items: response.data.items,
          subtotal: response.data.subtotal || 0,
          total: parseFloat(response.data.grand_total) || 0,
          itemCount: response?.data?.items?.length || 0,
        },
      });
    } catch (err) {
      console.error("Fetch error", err);
      dispatch({ type: "STOP_LOADING" });
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [accessToken]); // ← Add accessToken as dependency

  return (
    <>
      <Hero />
      <Products />
    </>
  );
};
