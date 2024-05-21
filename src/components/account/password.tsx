import { Input } from "../ui/input";

export function Password({
  name,
  label,
}: {
  name: string;
  passwordError?: string;
  label: string;
}) {
  return (
    <div className="mt-3">
      <Input
        id={name}
        name={name}
        type="password"
        autoComplete={
          name === "currentPassword" ? "current-password" : undefined
        }
        placeholder={label}
        aria-label={label}
        minLength={8}
      />
    </div>
  );
}
