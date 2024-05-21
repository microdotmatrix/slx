import { revalidatePath } from "next/cache";
import { recoverCustomersPassword } from "@/lib/shopify/graphql/customer";
import { SubmitButton } from "@/components/ui/submit";
import { Input } from "@/components/ui/input";

let emailError: string | null = null;
let isSubmitted: boolean = false;
const headings = {
  submited: {
    title: "Request Sent.",
    description:
      "If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.",
  },
  default: {
    title: "Forgot Password.",
    description:
      "Enter the email address associated with your account to receive a link to reset your password.",
  },
};

export default function RecoverPassword() {
  async function handleSubmit(data: FormData) {
    "use server";
    try {
      const response = await recoverCustomersPassword({
        variables: {
          email: data.get("email") as string,
        },
      });

      if (response.body.data.customerRecover.customerUserErrors.length > 0) {
        response.body.data.customerRecover.customerUserErrors.forEach(
          (error: any) => {
            if (error.field?.includes("email")) {
              emailError = error.message;
            }
          },
        );
      } else {
        isSubmitted = true;
      }
    } catch (error) {
      interface ERROR {
        message: string;
      }
      const err = error as { error: ERROR };
      emailError = err.error.message;
    }

    revalidatePath("/account/recover");
  }

  return (
    <div className="mx-auto max-w-md pt-24">
      <h5>{headings[isSubmitted ? "submited" : "default"].title}</h5>
      <p className="mt-4">
        {headings[isSubmitted ? "submited" : "default"].description}
      </p>
      {!isSubmitted && (
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

          <SubmitButton type="submit">Request Reset Link</SubmitButton>
        </form>
      )}
    </div>
  );
}
