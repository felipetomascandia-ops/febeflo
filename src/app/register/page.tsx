'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Mail, UserRound, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const { register, isLoading, error } = useAuth();
  const router = useRouter();

  const formError = useMemo(() => localError || error, [localError, error]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();

    if (!firstName || !lastName || !email || !form.password || !form.confirmPassword) {
      setLocalError('Completa todos los campos para crear tu cuenta.');
      return;
    }

    if (firstName.length < 2 || lastName.length < 2) {
      setLocalError('Nombre y apellido deben tener al menos 2 caracteres.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setLocalError('Ingresa un email válido.');
      return;
    }

    if (form.password.length < 8) {
      setLocalError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }

    setLocalError(null);

    try {
      await register({
        firstName,
        lastName,
        email,
        password: form.password,
      });

      router.push('/account');
    } catch (err: any) {
      setLocalError(err?.message || 'No pudimos crear tu cuenta.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-stone-100 px-4 py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_30px_70px_rgba(0,0,0,0.06)]">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="hidden bg-[#141414] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-300">FEBEFLO</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight">Crea tu cuenta.</h1>
              <p className="mt-4 max-w-md text-base text-stone-300">
                Disfruta de una experiencia dedicada a tus compras, favoritos y pedidos premium.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-stone-300">Beneficios</p>
              <ul className="mt-4 space-y-3 text-sm text-stone-200">
                <li>• Acceso a tu historial de compras.</li>
                <li>• Gestión de favoritos y tallas.</li>
                <li>• Ofertas reservadas para miembros.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">Nueva cuenta</p>
                <h2 className="mt-2 text-3xl font-semibold text-primary">Regístrate</h2>
              </div>
              <Link href="/login" className="text-sm font-medium text-accent hover:underline">
                Iniciar sesión
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-stone-700">
                    Nombre
                  </label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-4 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-stone-700">
                    Apellido
                  </label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      placeholder="Tu apellido"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-4 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-stone-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    id="register-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="tuemail@ejemplo.com"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-4 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-stone-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-12 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    autoComplete="new-password"
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

              <div>
                <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-stone-700">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-12 text-base text-stone-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-500 transition hover:text-stone-800"
                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
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
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-stone-600">
              Ya tienes una cuenta?{' '}
              <Link href="/login" className="font-semibold text-accent hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
