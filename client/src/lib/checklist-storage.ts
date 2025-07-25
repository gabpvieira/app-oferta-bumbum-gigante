// Device fingerprinting and checklist storage utilities

/**
 * Generate a unique device fingerprint based on browser characteristics
 */
function getDeviceId(): string {
  const userAgent = navigator.userAgent;
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Create a simple hash of the combined values
  const fingerprint = `${userAgent}_${screenWidth}_${screenHeight}_${timezone}`;
  
  // Simple hash function to create a shorter, more manageable ID
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36);
}

/**
 * Save checklist progress to localStorage with device-specific key
 */
export function saveProgress(data: Record<string, boolean>): void {
  try {
    const deviceId = getDeviceId();
    const key = `checklist_${deviceId}`;
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Progress saved for device:', deviceId);
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

/**
 * Load checklist progress from localStorage for current device
 */
export function loadProgress(): Record<string, boolean> {
  try {
    const deviceId = getDeviceId();
    const key = `checklist_${deviceId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      const data = JSON.parse(stored);
      console.log('Progress loaded for device:', deviceId);
      return data;
    }
    
    return {};
  } catch (error) {
    console.error('Failed to load progress:', error);
    return {};
  }
}

/**
 * Clear all checklist progress for current device
 */
export function clearProgress(): void {
  try {
    const deviceId = getDeviceId();
    const key = `checklist_${deviceId}`;
    localStorage.removeItem(key);
    console.log('Progress cleared for device:', deviceId);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
}

/**
 * Get current device fingerprint (for debugging)
 */
export function getCurrentDeviceId(): string {
  return getDeviceId();
}