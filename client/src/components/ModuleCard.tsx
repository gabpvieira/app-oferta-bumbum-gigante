import { useState } from "react";
import { ChevronDown, Check, CheckCircle, Clock, Target, Lightbulb, AlertTriangle, Heart, BarChart, ArrowRight } from "lucide-react";
import { toggleLessonComplete, getProgressData } from "@/lib/progress";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  example?: {
    title: string;
    content: string;
  };
  tip?: {
    title: string;
    content: string;
    type: 'important' | 'extra' | 'warning';
  };
}

interface ModuleData {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  iconBg: string;
  lessons: Lesson[];
  summary: {
    content: string;
    nextSteps: string;
  };
}

interface ModuleCardProps {
  module: ModuleData;
  onProgressUpdate: () => void;
}

export default function ModuleCard({ module, onProgressUpdate }: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = getProgressData();
  
  const handleToggleComplete = (lessonId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleLessonComplete(lessonId);
    onProgressUpdate();
  };
  
  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };
  
  const getTipIcon = (type: string) => {
    switch (type) {
      case 'important': return Target;
      case 'warning': return AlertTriangle;
      case 'extra': return Heart;
      default: return Lightbulb;
    }
  };
  
  const getTipColor = (type: string) => {
    switch (type) {
      case 'important': return 'text-secondary';
      case 'warning': return 'text-destructive';
      case 'extra': return 'text-secondary';
      default: return 'text-accent';
    }
  };
  
  const getTipBg = (type: string) => {
    switch (type) {
      case 'important': return 'bg-secondary/10';
      case 'warning': return 'bg-destructive/10';
      case 'extra': return 'bg-secondary/10';
      default: return 'bg-accent/10';
    }
  };

  return (
    <div className="module-card border border-border rounded-xl overflow-hidden mobile-card">
      <div 
        className="module-header bg-muted/50 p-3 sm:p-4 cursor-pointer touch-target" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <div className={`w-10 sm:w-12 h-10 sm:h-12 ${module.iconBg} rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}>
              <i className={`fas ${module.icon} text-white text-sm sm:text-base`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-responsive-sm truncate">{module.title}</h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-tight">{module.description}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-3 sm:w-4 h-3 sm:h-4 text-accent mr-1 sm:mr-2 flex-shrink-0" />
                <span className="text-muted-foreground text-xs sm:text-sm">{module.duration}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="mobile-button flex-shrink-0">
            <ChevronDown 
              className={`w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        </div>
      </div>
      
      <div className={`module-content ${isExpanded ? 'expanded' : ''} mobile-scroll`}>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="lesson-intro bg-primary/5 rounded-xl p-3 sm:p-4">
            <h5 className="font-semibold text-foreground mb-2 flex items-center text-responsive-sm">
              <Target className="w-4 sm:w-5 h-4 sm:h-5 text-primary mr-2" />
              O que você vai aprender:
            </h5>
            <p className="text-muted-foreground text-responsive-sm">
              {module.lessons.length > 0 && module.lessons[0].description}
            </p>
          </div>
          
          <div className="lessons-list space-y-4">
            {module.lessons.map((lesson) => (
              <div key={lesson.id} className="lesson-item border border-border rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-semibold">{lesson.number}</span>
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-foreground mb-2">{lesson.title}</h6>
                      <p className="text-muted-foreground mb-3">{lesson.description}</p>
                      
                      {lesson.example && (
                        <div className="bg-accent/10 rounded-lg p-3 mb-3">
                          <h6 className="font-medium text-foreground mb-2 flex items-center">
                            <Lightbulb className="w-4 h-4 text-accent mr-2" />
                            {lesson.example.title}:
                          </h6>
                          <p className="text-muted-foreground text-sm">{lesson.example.content}</p>
                        </div>
                      )}
                      
                      {lesson.tip && (
                        <div className={`${getTipBg(lesson.tip.type)} rounded-lg p-3`}>
                          <h6 className="font-medium text-foreground mb-2 flex items-center">
                            {(() => {
                              const TipIcon = getTipIcon(lesson.tip.type);
                              return <TipIcon className={`w-4 h-4 ${getTipColor(lesson.tip.type)} mr-2`} />;
                            })()}
                            {lesson.tip.title}:
                          </h6>
                          <p className="text-muted-foreground text-sm">{lesson.tip.content}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`ml-4 transition-colors ${
                      isLessonCompleted(lesson.id) 
                        ? 'border-secondary bg-secondary/10 hover:bg-secondary/20' 
                        : 'hover:border-secondary hover:bg-secondary/10'
                    }`}
                    onClick={(e) => handleToggleComplete(lesson.id, e)}
                  >
                    {isLessonCompleted(lesson.id) ? (
                      <CheckCircle className="w-4 h-4 text-secondary" />
                    ) : (
                      <Check className="w-4 h-4 text-secondary" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="module-summary bg-muted/50 rounded-xl p-4">
            <h5 className="font-semibold text-foreground mb-2 flex items-center">
              <BarChart className="w-5 h-5 text-primary mr-2" />
              Resumo do Módulo:
            </h5>
            <p className="text-muted-foreground mb-4">{module.summary.content}</p>
            
            <div className="next-steps bg-card rounded-lg p-3">
              <h6 className="font-medium text-foreground mb-2 flex items-center">
                <ArrowRight className="w-4 h-4 text-accent mr-2" />
                Próximos Passos:
              </h6>
              <p className="text-muted-foreground text-sm">{module.summary.nextSteps}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
