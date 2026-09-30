'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Mail, Lock, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const { login, loginWithGoogle, isLoading, error } = useAuth();
  const router = useRouter();

  const formError = useMemo(() => localError || error, [localError, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setLocalError('Completa tu email y contraseña para continuar.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setLocalError('Ingresa un email válido.');
      return;
    }

    setLocalError(null);

    try {
      await login(email, password);
      router.push('/account');
    } catch (err: any) {
      setLocalError(err?.message || 'No pudimos iniciar sesión. Inténtalo de nuevo.');
    }
  };

  const handleGoogleLogin = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setLocalError('Escribe tu correo corporativo para continuar con Google.');
      return;
    }

    setLocalError(null);

    try {
      await loginWithGoogle(normalizedEmail);
      router.push('/account');
    } catch (err: any) {
      setLocalError(err?.message || 'No pudimos validar tu cuenta de Google.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-stone-100 px-4 py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_30px_70px_rgba(0,0,0,0.06)] lg:grid-cols-2">
        <div className="hidden bg-[#141414] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-300">FEBEFLO</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">Bienvenido de nuevo.</h1>
            <p className="mt-4 max-w-md text-base text-stone-300">
              Accede a tus compras, favoritos y detalles de tu cuenta para una experiencia premium.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-300">Demo</p>
            <p className="mt-4 text-lg font-medium">john@example.com</p>
            <p className="text-sm text-stone-300">Contraseña: demo123</p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">Cuenta</p>
              <h2 className="mt-2 text-3xl font-semibold text-primary">Iniciar sesión</h2>
            </div>
            <Link href="/" className="text-sm font-medium text-accent hover:underline">
              Volver
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tuemail@ejemplo.com"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-4 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-12 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-500 transition hover:text-stone-800"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-stone-600">
                <input type="checkbox" className="h-4 w-4 rounded border-stone-300 text-accent focus:ring-accent" />
                Recordarme
              </label>
              <Link href="/login" className="font-medium text-accent hover:underline">
                Recuperar contraseña
              </Link>
            </div>

            {formError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-base font-medium text-stone-800 transition hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Globe className="h-4 w-4" />
              Continuar con Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-600">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-semibold text-accent hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
