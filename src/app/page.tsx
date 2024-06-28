import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="border-x-zinc-100/20 border-x h-full overflow-y-scroll">
      Home Page
      <Button
        className="absolute bottom-4 right-4 shadow-lg sm:hidden"
        size="icon-lg"
      >
        <PencilSquareIcon className="w-8 h-8" />
      </Button>
    </div>
  );
}
