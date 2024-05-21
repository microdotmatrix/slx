import { Button, buttonVariants } from "../../ui/button";
import type {
  Customer,
  CustomerUpdateInput,
} from "@shopify/hydrogen-react/storefront-api-types";
import { SubmitButton } from "../../ui/submit";
import { Password } from "../password";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { updateAccount } from "@/lib/shopify/graphql/customer";
import { redirect } from "next/navigation";
import { FormModal } from "../../modal";
import { Input } from "../../ui/input";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Icon } from "../../ui/icon";

let formError: string | null = null;

interface IAccountForm {
  customer?: Customer;
}
export function AccountForm({ customer }: IAccountForm) {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    formError = null;

    const token = cookies().get("customerAccessToken")?.value as string;
    const customerInput: CustomerUpdateInput = {};

    const keys: (keyof CustomerUpdateInput)[] = [
      "lastName",
      "firstName",
      "email",
      "phone",
      "password",
    ];

    keys.forEach((key) => {
      const value = formData.get(key === "password" ? "newPassword" : key);
      if (typeof value === "string") {
        (customerInput[key] as string) = value;
      }
    });

    if (
      formData.get("currentPassword") !== "" ||
      formData.get("newPassword") !== ""
    ) {
      if (
        formData.get("currentPassword") !== formData.get("newPassword") &&
        formData.get("newPassword") === formData.get("newPassword2") &&
        formData.get("currentPassword") !== ""
      ) {
        try {
          const updateAccountResponse = await updateAccount({
            variables: {
              customer: customerInput,
              customerAccessToken: token,
            },
          });

          const accountUpdated = updateAccountResponse.body.data.customerUpdate;

          const customerUserErrors = accountUpdated.customerUserErrors;

          customerUserErrors.forEach(({ message }: { message: string }) => {
            formError = message;
          });
        } catch (error) {
          console.log(error);
        }
        cookies().set({
          name: "customerAccessToken",
          value: "",
          httpOnly: true,
          path: "/",
          expires: new Date(Date.now()),
        });
        redirect("/account/login");
      } else {
        formError = "There is something wrong with your new passswordd";
      }
    } else {
      try {
        const updateAccountResponse = await updateAccount({
          variables: {
            customer: customerInput,
            customerAccessToken: token,
          },
        });

        const accountUpdated = updateAccountResponse.body.data.customerUpdate;

        const customerUserErrors = accountUpdated.customerUserErrors;

        customerUserErrors.forEach(({ message }: { message: string }) => {
          formError = message;
        });
      } catch (error) {
        console.log(error);
      }
    }

    revalidatePath("/account");

    if (!formError) {
      redirect("/account");
    }
  };

  async function handleCleanError() {
    "use server";
    formError = null;
    revalidatePath("/account/edit");
    redirect("/account");
  }

  return (
    <FormModal heading="Edit Profile" action={handleCleanError}>
      <div className="max-w-lg">
        <form action={handleSubmit} noValidate>
          {formError && (
            <Badge variant="destructive" className="mt-3">
              <Icon icon="mdi:alert" className="mr-2 text-white" /> {formError}
            </Badge>
          )}
          <div className="mt-3">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              aria-label="First name"
              defaultValue={customer?.firstName ?? ""}
            />
          </div>
          <div className="mt-3">
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              aria-label="Last name"
              defaultValue={customer?.lastName ?? ""}
            />
          </div>
          <div className="mt-3">
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Mobile"
              aria-label="Mobile"
              defaultValue={customer?.phone ?? ""}
            />
          </div>
          <div className="mt-3">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              defaultValue={customer?.email ?? ""}
            />
          </div>
          <h6 className="mt-6">Change your password</h6>
          <Password name="currentPassword" label="Current password" />
          <Password name="newPassword" label="New password" />
          <Password name="newPassword2" label="Re-enter new password" />
          <span className="ml-1 mt-2 text-[0.65rem]">
            Passwords must be at least 8 characters.
          </span>
          <div className="mt-6 flex items-center justify-between">
            <SubmitButton type="submit" icon="carbon:save">
              Save
            </SubmitButton>
            <Link
              href="/account"
              scroll={false}
              className={buttonVariants({ variant: "secondary" })}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </FormModal>
  );
}
