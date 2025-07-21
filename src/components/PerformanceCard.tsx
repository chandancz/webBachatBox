import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PerformanceCardProps {
  title: string;
  value: string;
  change: number;
  status: "excellent" | "good" | "warning" | "poor";
  unit?: string;
  className?: string;
}

export function PerformanceCard({ 
  title, 
  value, 
  change, 
  status, 
  unit = "ms",
  className 
}: PerformanceCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-performance-excellent/10 border-performance-excellent text-performance-excellent";
      case "good":
        return "bg-performance-good/10 border-performance-good text-performance-good";
      case "warning":
        return "bg-performance-warning/10 border-performance-warning text-performance-warning";
      case "poor":
        return "bg-performance-poor/10 border-performance-poor text-performance-poor";
      default:
        return "bg-muted/10 border-muted text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (change > 0) return "text-performance-poor";
    if (change < 0) return "text-performance-excellent";
    return "text-muted-foreground";
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border transition-all duration-300 hover:shadow-glow animate-scale-in",
      getStatusStyles(status),
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {value}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {unit}
              </span>
            </p>
            <div className={cn("flex items-center text-xs", getTrendColor())}>
              {getTrendIcon()}
              <span className="ml-1">
                {Math.abs(change)}% from last hour
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-glow opacity-20" />
      </CardContent>
    </Card>
  );
}