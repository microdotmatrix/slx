import AddressCard from "@/components/account/address/card";
import type {
  Customer,
  MailingAddress,
} from "@shopify/hydrogen-react/storefront-api-types";
import { convertObjectToQueryString } from "@/lib/utils";
import Link from "next/link";

export default function AddressBook({
  customer,
  addresses,
}: {
  customer: Customer;
  addresses: MailingAddress[];
}) {
  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="text-lead font-bold">Address Book</h3>
        <div>
          {!addresses?.length && (
            <p>You haven&apos;t saved any addresses yet.</p>
          )}
          <div className="w-48">
            <Link
              href={`account?${convertObjectToQueryString({
                modal: "address-add",
              })}`}
              scroll={false}
              className="bg-contrast mb-6 mt-2 inline-block w-full rounded border border-primary/10 px-6 py-3 text-center text-sm font-medium text-primary"
            >
              Add an Address
            </Link>
          </div>
          {Boolean(addresses?.length) && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {customer.defaultAddress && (
                <AddressCard address={customer.defaultAddress} defaultAddress />
              )}
              {addresses
                .filter((address) => address.id !== customer.defaultAddress?.id)
                .map((address) => (
                  <AddressCard key={address.id} address={address} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
