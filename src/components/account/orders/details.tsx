import Link from "next/link";
import type { Customer } from "@shopify/hydrogen-react/storefront-api-types";
import { convertObjectToQueryString } from "@/lib/utils";

export function AccountDetails({ customer }: { customer: Customer }) {
  const { firstName, lastName, email, phone } = customer;
  const formattedFirstName = firstName ? firstName + " " : "";

  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="text-lead font-bold">Account Details</h3>
        <div className="rounded border border-gray-200 p-6 lg:p-8">
          <div className="flex items-center">
            <h5 className="flex-1">Profile & Security</h5>
            <Link
              className="text-sm font-normal underline"
              scroll={false}
              href={`/account?${convertObjectToQueryString({
                modal: "account-edit",
              })}`}
            >
              Edit
            </Link>
          </div>
          <div className="mt-4 text-sm text-primary/50">Name</div>
          <p className="mt-1">
            {firstName || lastName ? formattedFirstName + lastName : "Add name"}{" "}
          </p>

          <div className="mt-4 text-sm text-primary/50">Contact</div>
          <p className="mt-1">{phone ?? "Add mobile"}</p>

          <div className="mt-4 text-sm text-primary/50">Email address</div>
          <p className="mt-1">{email}</p>

          <div className="mt-4 text-sm text-primary/50">Password</div>
          <p className="mt-1">**************</p>
        </div>
      </div>
    </>
  );
}
