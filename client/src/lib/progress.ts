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
  
  // Try to get checklist progress from new storage system
  let totalCompleted = progress.completedLessons.length;
  
  try {
    // Count all completed items from localStorage for device fingerprint
    const deviceFingerprint = `${navigator.userAgent}_${screen.width}x${screen.height}_${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    const checklistKey = `checklist_${deviceFingerprint}`;
    const checklistData = localStorage.getItem(checklistKey);
    
    if (checklistData) {
      const checklistProgress = JSON.parse(checklistData);
      Object.values(checklistProgress).forEach((value) => {
        if (value) totalCompleted++;
      });
    }
  } catch (error) {
    console.log('Checklist progress not available');
  }
  
  // Estimate total items (approximate)
  const totalLessons = 120; // Estimate of all checklists across all modules and bonuses
  const progressPercentage = Math.min(100, Math.round((totalCompleted / totalLessons) * 100));
  const completedModules = Math.floor(totalCompleted / 15);
  
  return {
    completedLessons: totalCompleted,
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
