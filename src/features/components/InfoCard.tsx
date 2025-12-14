import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InfoCardProps = {
  title: string;
  stats: string;
}

function InfoCard({ title, stats }: InfoCardProps) {
  return (
    <div>
      <Card className='p-0 gap-0 bg-transparent shadow-none border-0'>
        <CardHeader className='p-2 gap-0'>
          <CardTitle className="text-secondary-foreground text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent className='p-2'>
          <p className="text-primary">{stats}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default InfoCard