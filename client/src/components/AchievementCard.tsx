import { CheckCircle, Lock, Trophy, Dumbbell, Medal, Crown, UserPlus } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const iconMap = {
  'user-plus': UserPlus,
  'dumbbell': Dumbbell,
  'medal': Medal,
  'crown': Crown,
  'trophy': Trophy
};

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
  
  return (
    <div className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} rounded-xl p-4 text-center border`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${achievement.unlocked ? 'bg-secondary' : 'bg-gray-300'}`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <p className={`text-sm font-medium ${achievement.unlocked ? 'text-secondary' : 'text-muted-foreground'}`}>
        {achievement.title}
      </p>
      <p className="text-xs text-muted-foreground">
        {achievement.unlocked ? 'Conquistado!' : achievement.description}
      </p>
    </div>
  );
}
