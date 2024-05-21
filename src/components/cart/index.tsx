import { getCart } from "@/lib/shopify/graphql/cart";
import { cookies } from "next/headers";
import { CartDrawer } from "./drawer";

export const Cart = async () => {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  // @ts-ignore
  return <CartDrawer cart={cart} />;
};
