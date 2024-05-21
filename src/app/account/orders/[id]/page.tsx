import Link from "next/link";
import { flattenConnection } from "@shopify/hydrogen-react";
import { getCustomerOrder } from "@/lib/shopify/graphql/customer";
import type { OrderLineItem } from "@shopify/hydrogen-react/storefront-api-types";

import clsx from "clsx";
import Image from "next/image";
import { Money } from "@/components/money";
import { statusMessage } from "@/lib/shopify/helpers";

export default async function Orders({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { key: string };
}) {
  const orderToken = searchParams.key;
  const orderId = `gid://shopify/Order/${params.id}?key=${orderToken}`;

  const response = await getCustomerOrder(orderId);
  const order = response.body.data.node;

  if (!order) {
    throw new Response("Order not found", { status: 404 });
  }

  const lineItems = flattenConnection(order.lineItems) as Array<OrderLineItem>;

  const discountApplications = flattenConnection(order.discountApplications);

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === "MoneyV2" && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === "PricingPercentageValue" &&
    firstDiscount?.percentage;

  return (
    <div>
      <header>
        <h4>Order Detail</h4>
        <Link href="/account" className="text-sm">
          Return to Account Overview
        </Link>
      </header>
      <div className="w-full p-6 sm:grid-cols-1 md:p-8 lg:p-12 lg:py-6">
        <div>
          <h3>Order No. {order.name}</h3>
          <p className="mt-2">
            Placed on {new Date(order.processedAt).toDateString()}
          </p>
          <div className="grid items-start gap-12 sm:grid-cols-1 sm:divide-y sm:divide-gray-200 md:grid-cols-4 md:gap-16">
            <table className="my-8 min-w-full divide-y divide-gray-300 md:col-span-3">
              <thead>
                <tr className="align-baseline ">
                  <th
                    scope="col"
                    className="pb-4 pl-0 pr-3 text-left font-semibold"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 text-right font-semibold sm:table-cell md:table-cell"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 pb-4 text-right font-semibold sm:table-cell md:table-cell"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-4 pb-4 text-right font-semibold"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lineItems.map((lineItem: OrderLineItem) => (
                  <tr key={lineItem.variant!.id}>
                    <td className="w-full max-w-0 py-4 pl-0 pr-3 align-top sm:w-auto sm:max-w-none sm:align-middle">
                      <div className="flex gap-6">
                        <Link
                          href={`/products/${lineItem.variant!.product.handle}`}
                        >
                          {lineItem?.variant?.image && (
                            <div className="card-image aspect-square w-24">
                              <Image
                                width={lineItem.variant.image.width || 96}
                                height={lineItem.variant.image.height || 96}
                                src={lineItem.variant.image.url}
                                alt={
                                  lineItem.variant.image.altText || "Cart item"
                                }
                              />
                            </div>
                          )}
                        </Link>
                        <div className="hidden flex-col justify-center lg:flex">
                          <p>{lineItem.title}</p>
                          <p className="mt-1">{lineItem.variant!.title}</p>
                        </div>
                        <dl className="grid">
                          <dt className="sr-only">Product</dt>
                          <dd className="truncate lg:hidden">
                            <h3>{lineItem.title}</h3>
                            <p className="mt-1">{lineItem.variant!.title}</p>
                          </dd>
                          <dt className="sr-only">Price</dt>
                          <dd className="truncate sm:hidden">
                            <p className="mt-4">
                              <Money data={lineItem.variant!.price} />
                            </p>
                          </dd>
                          <dt className="sr-only">Quantity</dt>
                          <dd className="truncate sm:hidden">
                            <p className="mt-1">Qty: {lineItem.quantity}</p>
                          </dd>
                        </dl>
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      <Money data={lineItem.variant!.price} />
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      {lineItem.quantity}
                    </td>
                    <td className="px-3 py-4 text-right align-top sm:table-cell sm:align-middle">
                      <p>
                        <Money data={lineItem.discountedTotalPrice} />
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {(discountValue?.amount || discountPercentage) && (
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-6 pr-3 pt-6 text-right font-normal sm:table-cell md:pl-0"
                    >
                      <p>Discounts</p>
                    </th>
                    <th
                      scope="row"
                      className="pr-3 pt-6 text-left font-normal sm:hidden"
                    >
                      <p>Discounts</p>
                    </th>
                    <td className="pl-3 pr-4 pt-6 text-right font-medium text-green-700 md:pr-3">
                      {discountPercentage ? (
                        <span className="text-sm">
                          -{discountPercentage}% OFF
                        </span>
                      ) : (
                        discountValue && <Money data={discountValue} />
                      )}
                    </td>
                  </tr>
                )}
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pl-6 pr-3 pt-6 text-right font-normal sm:table-cell md:pl-0"
                  >
                    <p>Subtotal</p>
                  </th>
                  <th
                    scope="row"
                    className="pr-3 pt-6 text-left font-normal sm:hidden"
                  >
                    <p>Subtotal</p>
                  </th>
                  <td className="pl-3 pr-4 pt-6 text-right md:pr-3">
                    {order.subtotalPrice && (
                      <Money data={order.subtotalPrice} />
                    )}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pl-6 pr-3 pt-4 text-right font-normal sm:table-cell md:pl-0"
                  >
                    Tax
                  </th>
                  <th
                    scope="row"
                    className="pr-3 pt-4 text-left font-normal sm:hidden"
                  >
                    <p>Tax</p>
                  </th>
                  <td className="pl-3 pr-4 pt-4 text-right md:pr-3">
                    {order.totalTax && <Money data={order.totalTax} />}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pl-6 pr-3 pt-4 text-right font-semibold sm:table-cell md:pl-0"
                  >
                    Total
                  </th>
                  <th
                    scope="row"
                    className="pr-3 pt-4 text-left font-semibold sm:hidden"
                  >
                    <p>Total</p>
                  </th>
                  <td className="pl-3 pr-4 pt-4 text-right font-semibold md:pr-3">
                    <Money data={order.totalPrice} />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="top-nav sticky border-none md:my-8">
              <h4 className="font-semibold">Shipping Address</h4>
              {order?.shippingAddress ? (
                <ul className="mt-6">
                  <li>
                    <p>
                      {order.shippingAddress.firstName &&
                        order.shippingAddress.firstName + " "}
                      {order.shippingAddress.lastName}
                    </p>
                  </li>
                  {order?.shippingAddress?.formatted ? (
                    order.shippingAddress.formatted.map((line: string) => (
                      <li key={line}>
                        <p>{line}</p>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <p className="mt-3">No shipping address defined</p>
              )}
              <h4 className="mt-8 font-semibold">Status</h4>
              <div
                className={clsx(
                  `mt-3 inline-block w-auto rounded-full px-3 py-1 text-xs font-medium`,
                  order.fulfillmentStatus === "FULFILLED"
                    ? "bg-green-100 text-green-800"
                    : "bg-primary/20 text-primary/50",
                )}
              >
                <p className="text-sm">
                  {statusMessage(order.fulfillmentStatus)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
