import { User } from '../types/user';

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const STORAGE_KEY = 'febeflo_user_session';
export const ADMIN_EMAIL_DOMAIN = '@febefllo';
const demoUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-2',
    name: 'Jane Admin',
    email: 'admin@febefllo',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

const demoPasswords = new Map<string, string>([
  ['john@example.com', 'demo123'],
  ['admin@febefllo', 'admin123'],
]);

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const isAdminEmail = (email: string) => normalizeEmail(email).endsWith(ADMIN_EMAIL_DOMAIN);

const hashPassword = async (value: string): Promise<string> => {
  if (typeof window !== 'undefined' && window.crypto && 'subtle' in window.crypto) {
    const encoded = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  return btoa(value);
};

const saveUserSession = (user: User) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

const clearUserSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedEmail = normalizeEmail(email);

    if (isAdminEmail(normalizedEmail)) {
      throw new Error('Las cuentas administrativas deben ingresar con Google.');
    }

    const user = demoUsers.find((item) => normalizeEmail(item.email) === normalizedEmail);

    if (!user) {
      throw new Error('No existe una cuenta con este email.');
    }

    const storedPasswordHash = demoPasswords.get(normalizedEmail);
    if (!storedPasswordHash) {
      throw new Error('Credenciales inválidas.');
    }

    const enteredHash = await hashPassword(password);
    if (storedPasswordHash !== enteredHash) {
      throw new Error('La contraseña es incorrecta.');
    }

    saveUserSession(user);
    return user;
  },

  loginWithGoogle: async (email: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const normalizedEmail = normalizeEmail(email);

    if (!isAdminEmail(normalizedEmail)) {
      throw new Error(`Google está reservado para cuentas con dominio ${ADMIN_EMAIL_DOMAIN}.`);
    }

    const existingUser = demoUsers.find((item) => normalizeEmail(item.email) === normalizedEmail);
    const user: User = existingUser || {
      id: `admin-${Date.now()}`,
      name: normalizedEmail.split('@')[0].replace(/[._-]/g, ' '),
      email: normalizedEmail,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    if (!existingUser) {
      demoUsers.push(user);
    }

    saveUserSession(user);
    return user;
  },

  register: async ({ firstName, lastName, email, password }: RegisterInput): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedEmail = normalizeEmail(email);

    if (isAdminEmail(normalizedEmail)) {
      throw new Error(`Las cuentas ${ADMIN_EMAIL_DOMAIN} solo pueden registrarse con Google.`);
    }

    if (demoUsers.some((item) => normalizeEmail(item.email) === normalizedEmail)) {
      throw new Error('El email ya está registrado.');
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const passwordHash = await hashPassword(password);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: fullName,
      email: normalizedEmail,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    demoUsers.push(newUser);
    demoPasswords.set(normalizedEmail, passwordHash);
    saveUserSession(newUser);

    return newUser;
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    clearUserSession();
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },
};
