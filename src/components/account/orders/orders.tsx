import type { Order } from "@shopify/hydrogen-react/storefront-api-types";
import { getIdFromURL } from "@/lib/utils";
import { flattenConnection } from "@shopify/hydrogen-react";
import { statusMessage } from "@/lib/shopify/helpers";
import Link from "next/link";
import Image from "next/image";

export default function Orders({ orders }: { orders: Order[] }) {
  return (
    <div className="container">
      {orders?.length ? (
        <ul className="false grid grid-flow-row grid-cols-1 gap-2 gap-y-6 sm:grid-cols-3 md:gap-4 lg:gap-6">
          {orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </ul>
      ) : (
        <p>You have not placed any orders yet.</p>
      )}
    </div>
  );
}

export function OrderCard({ order }: { order: Order }) {
  if (!order?.id) return null;
  const { id: legacyOrderId, key } = getIdFromURL(order.id);
  const lineItems = flattenConnection(order?.lineItems);

  return (
    <li className="grid rounded border text-center">
      <Link
        href={`/account/orders/${legacyOrderId}?${key}`}
        className="grid items-center gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-6"
        prefetch={true}
      >
        {lineItems[0].variant?.image && (
          <div className="card-image aspect-square bg-primary/5">
            <Image
              width={168}
              height={168}
              className="fadeIn cover w-full"
              alt={lineItems[0].variant?.image?.altText ?? "Order image"}
              src={lineItems[0].variant?.image.url}
            />
          </div>
        )}
        <div
          className={`flex-col justify-center text-left ${
            !lineItems[0].variant?.image && "md:col-span-2"
          }`}
        >
          <h3>
            {lineItems.length > 1
              ? `${lineItems[0].title} +${lineItems.length - 1} more`
              : lineItems[0].title}
          </h3>
          <dl className="grid-gap-1 grid">
            <dt className="sr-only">Order ID</dt>
            <dd>
              <span className="text-sm">Order No. {order.orderNumber}</span>
            </dd>
            <dt className="sr-only">Order Date</dt>
            <dd>
              <span className="text-md">
                {new Date(order.processedAt).toDateString()}
              </span>
            </dd>
            <dt className="sr-only">Fulfillment Status</dt>
            <dd className="mt-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  order.fulfillmentStatus === "FULFILLED"
                    ? "bg-green-100 text-green-800"
                    : "bg-primary/5 text-primary/50"
                }`}
              >
                <p>{statusMessage(order.fulfillmentStatus)}</p>
              </span>
            </dd>
          </dl>
        </div>
      </Link>
      <div className="self-end border-t">
        <Link
          href={`/account/orders/${legacyOrderId}?${key}`}
          className="block w-full p-2 text-center"
          prefetch={true}
        >
          <span className="ml-3">View Details</span>
        </Link>
      </div>
    </li>
  );
}
