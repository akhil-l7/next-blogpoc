import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <h1 className="text-4xl">Migrated To Vercel</h1>
      <Separator className="my-2" />
      <p className="flex gap-2">
        now at
        <a className="flex gap-2 text-blue-700" href="https://ak-blogpoc.vercel.app/">ak-blogpoc <Globe /> </a>
      </p>
    </div>
  );
}


