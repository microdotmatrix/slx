import { revalidatePath } from "next/cache";
import { createCustomer, loginCustomer } from "@/lib/shopify/graphql/customer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

let emailError: string | null = null;
let passwordError: string | null = null;

export default function RegisterPage() {
  async function handleSubmit(data: FormData) {
    "use server";
    const res = await createCustomer({
      variables: {
        input: {
          email: data.get("email") as string,
          password: data.get("password") as string,
        },
      },
    });

    if (res.body.data.customerCreate.customer) {
      const loginRes = await loginCustomer({
        variables: {
          input: {
            email: data.get("email") as string,
            password: data.get("password") as string,
          },
        },
      });

      if (
        loginRes.body.data.customerAccessTokenCreate.customerAccessToken
          ?.accessToken
      ) {
        cookies().set({
          name: "customerAccessToken",
          value:
            loginRes.body.data.customerAccessTokenCreate.customerAccessToken
              .accessToken,
          httpOnly: true,
          path: "/",
          expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
        });
        redirect("/account");
      }

      redirect("/account/login");
    }

    if (res.body.data.customerCreate.customerUserErrors.length > 0) {
      res.body.data.customerCreate.customerUserErrors.forEach((error: any) => {
        if (error.field.includes("email")) {
          emailError = error.message;
        }
        if (error.field.includes("password")) {
          passwordError = error.message;
        }
      });
    }

    revalidatePath("/account/register");
  }

  return (
    <div className="container max-w-md pt-24">
      <h2>Register</h2>
      <form
        action={handleSubmit}
        noValidate
        className="mb-4 mt-4 space-y-3 pb-8 pt-6"
      >
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            autoFocus
          />
          {emailError && (
            <p className="text-xs text-red-500">{emailError} &nbsp;</p>
          )}
        </div>
        <div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            minLength={8}
            required
            autoFocus
          />
          {passwordError && (
            <p className="text-xs text-red-500"> {passwordError} &nbsp;</p>
          )}
        </div>

        <div className="flex w-full items-center">
          <SubmitButton type="submit" variant="default" icon="carbon:login">
            Sign Up
          </SubmitButton>
          <Button type="reset" variant="secondary" className="space-x-2">
            <Icon icon="carbon:reset" /> <span>Reset</span>
          </Button>
          <Link href="/account/login" className="w-full text-right">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
