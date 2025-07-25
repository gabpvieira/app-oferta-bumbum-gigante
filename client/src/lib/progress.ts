export interface ProgressData {
  completedLessons: string[];
  dayCount: number;
  startDate: string;
}

export function getProgressData(): ProgressData {
  // Fallback to old format for now - will integrate checklist storage later
  const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
  const dayCount = parseInt(localStorage.getItem('dayCount') || '1');
  const startDate = localStorage.getItem('startDate') || new Date().toISOString();
  
  return { completedLessons, dayCount, startDate };
}

export function toggleLessonComplete(lessonId: string): boolean {
  const progress = getProgressData();
  const isCompleted = progress.completedLessons.includes(lessonId);
  
  if (isCompleted) {
    progress.completedLessons = progress.completedLessons.filter(id => id !== lessonId);
  } else {
    progress.completedLessons.push(lessonId);
  }
  
  // Save to localStorage
  localStorage.setItem('completedLessons', JSON.stringify(progress.completedLessons));
  
  return !isCompleted;
}

export function calculateProgress(): {
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  completedModules: number;
} {
  const progress = getProgressData();
  const totalLessons = 9; // Total lessons across all modules
  const progressPercentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
  const completedModules = Math.floor(progress.completedLessons.length / 3);
  
  return {
    completedLessons: progress.completedLessons.length,
    totalLessons,
    progressPercentage,
    completedModules
  };
}

export function initializeProgress(): void {
  if (!localStorage.getItem('startDate')) {
    localStorage.setItem('startDate', new Date().toISOString());
  }
  if (!localStorage.getItem('dayCount')) {
    localStorage.setItem('dayCount', '1');
  }
}
