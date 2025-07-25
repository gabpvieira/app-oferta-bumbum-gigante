import { calculateProgress } from "@/lib/progress";

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className = "" }: ProgressBarProps) {
  const { progressPercentage } = calculateProgress();
  
  return (
    <div className={`${className} mobile-container`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-responsive-sm font-medium text-foreground">Progresso Geral</span>
        <span className="text-responsive-sm text-muted-foreground font-semibold">{progressPercentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 sm:h-3 shadow-inner">
        <div 
          className="gradient-bg h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
