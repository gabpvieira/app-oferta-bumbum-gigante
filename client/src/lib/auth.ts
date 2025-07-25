export interface AuthCredentials {
  email: string;
  password: string;
}

export const AUTH_CONFIG = {
  validEmail: 'user236@projetogluteogigante.com',
  validPassword: '123654',
  productName: 'projetogluteogigante'
};

export function validateLogin(email: string, password: string): boolean {
  if (email === AUTH_CONFIG.validEmail && password === AUTH_CONFIG.validPassword) {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('productAccess', AUTH_CONFIG.productName);
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('userLoggedIn') === 'true';
}

export function getCurrentUser(): string | null {
  return localStorage.getItem('userEmail');
}

export function logout(): void {
  localStorage.removeItem('userLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('productAccess');
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
