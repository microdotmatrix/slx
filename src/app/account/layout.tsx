import { Transition } from "@/components/transition";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Transition>{children}</Transition>;
}
