import { calculateProgress } from "@/lib/progress";

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className = "" }: ProgressBarProps) {
  const { progressPercentage } = calculateProgress();
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Progresso Geral</span>
        <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="gradient-bg h-2 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
