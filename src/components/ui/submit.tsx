"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Icon } from "./icon";

export function SubmitButton({
  icon,
  children,
  type = "submit",
  variant = "default",
}: {
  children: React.ReactNode;
  icon?: string;
  type?: "submit" | "button" | "reset";
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
}) {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} type={type} disabled={pending}>
      {pending ? (
        <Icon icon="svg-spinners:3-dots-fade" className="mr-2" />
      ) : (
        <>{icon && <Icon icon={icon} className="mr-2" />}</>
      )}{" "}
      {children}
    </Button>
  );
}
