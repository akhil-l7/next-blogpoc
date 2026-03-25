import { Item, ItemContent, ItemHeader, ItemMedia } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto bg-background min-h-screen lg:px-6">
      {/* Post Header Skeleton */}
      <div className="space-y-10 animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-4 h-6">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Separator />
        </div>

        <div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Comments Skeleton */}
      <Item className="my-1" variant={"outline"}>
        <ItemHeader>
          <ItemMedia>
            <Skeleton className="h-5 w-5" />
          </ItemMedia>
          <ItemContent>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </ItemContent>
        </ItemHeader>
        <Separator />
        
        <div className="space-y-4 w-full my-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        
        <Skeleton className="h-32 w-full" />
      </Item>
    </div>
  );
}

