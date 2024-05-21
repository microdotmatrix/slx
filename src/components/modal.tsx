import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

interface IFormModal {
  heading: string;
  children: React.ReactNode;
  action: () => void;
}

export function FormModal({ heading, children, action }: IFormModal) {
  return (
    <>
      <div className="fixed inset-0 z-20 bg-gray-950/50 bg-opacity-75 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative flex-1 transform overflow-hidden rounded bg-gray-100 px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-12 sm:w-full sm:max-w-md sm:flex-none sm:p-6">
            <h4>{heading}</h4>
            <form
              className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"
              action={action}
            >
              <Button
                className="-m-2 p-2 text-primary transition hover:text-primary/50"
                type="submit"
                variant="outline"
              >
                <Icon icon="carbon:close" className="size-8" />
              </Button>
            </form>
            <div className="max-w-lg">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
