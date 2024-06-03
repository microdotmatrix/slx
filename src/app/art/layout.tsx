import { Categories } from "@/components/art/categories";
import { Transition } from "@/components/transition";

export const dynamic = "force-static";

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full flex-1 flex-col space-y-8 lg:flex-row">
      <Categories />
      <article className="flex flex-1 items-center justify-center text-center lg:px-24">
        <Transition>{children}</Transition>
      </article>
    </section>
  );
}
