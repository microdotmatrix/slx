import { redirect } from "next/navigation";
import { loginCustomer } from "@/lib/shopify/graphql/customer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Input } from "@/components/ui/input";

import { SubmitButton } from "@/components/ui/submit";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

let emailError: string | null = null;
let passwordError: string | null = null;
let unidentifiedUserError: string | null = null;

export default function LoginPage() {
  async function handleSubmit(data: FormData) {
    "use server";
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

    if (
      loginRes.body.data.customerAccessTokenCreate.customerUserErrors.length > 0
    ) {
      loginRes.body.data.customerAccessTokenCreate.customerUserErrors.forEach(
        (error: any) => {
          if (error.field) {
            if (error.field.includes("email")) {
              emailError = error.message;
            }
            if (error.field.includes("password")) {
              passwordError = error.message;
            }
          } else {
            if (error.code === "UNIDENTIFIED_CUSTOMER") {
              unidentifiedUserError = error.message;
            }
          }
        },
      );
    }

    revalidatePath("/account/login");
  }

  return (
    <div className="container max-w-md pt-24">
      <h2>Login</h2>
      {unidentifiedUserError && (
        <p className="mt-4 text-red-500">{unidentifiedUserError}</p>
      )}
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
            Login
          </SubmitButton>
          <Button type="reset" variant="secondary" className="space-x-2">
            <Icon icon="carbon:reset" /> <span>Reset</span>
          </Button>
          <div className="flex w-full flex-col space-y-1 text-xs">
            <Link href="/account/register" className="w-full text-right">
              Create an account
            </Link>
            <Link href="/account/recover" className="w-full text-right">
              Forgot password
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
