import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type InfoCardProps = {
    title: string;
    stats: string;
} 

function InfoCard({ title, stats }: InfoCardProps) {
  return (
    <div>
        <Card className='p-0 gap-0 bg-neutral-700 border-0'>
         <CardHeader className='p-2 gap-0'>
           <CardTitle className="text-gray-400">{title}</CardTitle>
         </CardHeader>
        <CardContent className='p-2'>
          <Tooltip>
          <TooltipTrigger asChild>
              <p className="truncate text-white">{stats}</p>
          </TooltipTrigger>
            <TooltipContent>
              <p className="text-white truncate">{stats}</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
        </Card>
    </div>
  )
}

export default InfoCard