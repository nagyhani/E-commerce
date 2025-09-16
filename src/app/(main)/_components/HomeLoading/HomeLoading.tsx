import { Skeleton } from "@/components/ui/skeleton"

export function HomeLoading() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 p-5">
         {Array.from({length: 6}).map((ele , id)=>{
        return  <div key={id} className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    })}
    </div>
   
    </>
  )
}
