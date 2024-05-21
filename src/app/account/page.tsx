import AddressBook from "@/components/account/address/book";
import { AddressForm } from "@/components/account/address/form";
import { AccountDetails } from "@/components/account/orders/details";
import { AccountForm } from "@/components/account/orders/form";
import { getCustomer } from "@/lib/shopify/graphql/customer";
import { getIdFromURL } from "@/lib/utils";
import { flattenConnection } from "@shopify/hydrogen-react";
import type {
  Order,
  MailingAddress,
} from "@shopify/hydrogen-react/storefront-api-types";
import { cookies } from "next/headers";
import Orders from "@/components/account/orders/orders";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { [key: string]: string; id: string };
}) {
  const token = cookies().get("customerAccessToken")?.value as string;
  const customer = await getCustomer(token);
  const { orders, firstName } = customer;
  const welcomeMessage = firstName
    ? `Welcome, ${firstName}.`
    : `Welcome to your account.`;
  const heading = customer ? welcomeMessage : "Account Details";

  const customerOrders = flattenConnection(orders) as Order[];
  const addresses = flattenConnection(customer.addresses) as MailingAddress[];
  const address =
    (searchParams &&
      addresses.find((res) => {
        const editId = decodeURIComponent(searchParams?.id);
        const { id: editMailingId } = getIdFromURL(editId);
        const { id: mailingId } = getIdFromURL(res.id);
        return mailingId === editMailingId && searchParams?.id;
      })) ||
    undefined;

  return (
    <div className="container mt-8">
      <h4>{heading}</h4>
      {customerOrders && <Orders orders={customerOrders} />}
      <AccountDetails customer={customer} />
      <AddressBook addresses={addresses} customer={customer} />

      {searchParams?.modal === "address-edit" && (
        <AddressForm
          isNewAddress={false}
          address={address}
          defaultAddress={customer.defaultAddress}
        />
      )}
      {searchParams?.modal === "address-add" && (
        <AddressForm
          isNewAddress={true}
          address={address}
          defaultAddress={customer.defaultAddress}
        />
      )}
      {searchParams?.modal === "account-edit" && (
        <AccountForm customer={customer} />
      )}
    </div>
  );
}
