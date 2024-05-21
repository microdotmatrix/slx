import type { MailingAddress } from "@shopify/hydrogen-react/storefront-api-types";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { deleteAddress } from "@/lib/shopify/graphql/customer";
import { cookies } from "next/headers";

import { convertObjectToQueryString } from "@/lib/utils";
import { SubmitButton } from "../../ui/submit";
import { buttonVariants } from "../../ui/button";
import { Icon } from "../../ui/icon";
import { Badge } from "../../ui/badge";

function AddressCard({
  address,
  defaultAddress,
}: {
  address: MailingAddress;
  defaultAddress?: boolean;
}) {
  const removeAddress = async (formData: FormData) => {
    "use server";
    const token = cookies().get("customerAccessToken")?.value as string;
    const id = formData.get("id") as string;
    await deleteAddress({
      variables: {
        customerAccessToken: token,
        id,
      },
    });
    revalidatePath("/account");
  };
  return (
    <div className="flex flex-col rounded border border-gray-200/20 p-4 lg:p-6">
      {defaultAddress && (
        <div className="mb-3 flex flex-row">
          <Badge variant="outline" className="text-[0.6rem] font-semibold">
            Default
          </Badge>
        </div>
      )}
      <ul className="flex-1 flex-row">
        {(address.firstName || address.lastName) && (
          <li>
            {"" +
              (address.firstName && address.firstName + " ") +
              address?.lastName}
          </li>
        )}
        {address.formatted?.map((line: string) => <li key={line}>{line}</li>)}
      </ul>

      <div className="mt-6 flex flex-row items-baseline font-medium">
        <Link
          href={`/account?${convertObjectToQueryString({
            modal: "address-edit",
            id: encodeURIComponent(address.id),
          })}`}
          scroll={false}
          className={buttonVariants({ variant: "secondary" })}
        >
          <Icon icon="carbon:edit" className="mr-2" />
          Edit
        </Link>
        <form action={removeAddress}>
          <input type="hidden" name="id" value={address.id} />
          <SubmitButton type="submit" icon="carbon:delete">
            Remove
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default AddressCard;
