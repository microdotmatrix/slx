"use server";

import { TAGS } from "@/lib/shopify/utils";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify/graphql/cart";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function resetCart() {
  const cartId = cookies().get("cartId")?.value;

  if (cartId) {
    cookies().delete("cartId");
  }

  try {
    await createCart();
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error resetting cart";
  }
}

export async function newCart() {
  const cartCookie = cookies().get("cartId")?.value;
  const cart = await createCart();
  let cartId;

  if (!cartCookie || cartCookie === "undefined") {
    cookies().set("cartId", cart.id, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  } else {
    cartId = cartCookie;
  }

  return cartId;
}

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined,
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: unknown, lineId: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  },
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}
