'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Bell,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  LayoutDashboard,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-stone-100 px-4">
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-5 text-sm text-stone-600 shadow-sm">
          Cargando tu cuenta...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const profileSections = [
    {
      label: 'Resumen',
      value: 'Mi cuenta',
      icon: <UserRound className="h-4 w-4" />,
    },
    {
      label: 'Email',
      value: user.email,
      icon: <Mail className="h-4 w-4" />,
    },
    {
      label: 'Direcciones',
      value: '0 registradas',
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">Cuenta</p>
              <h1 className="mt-2 text-4xl font-semibold text-primary">Hola, {user.name.split(' ')[0]}</h1>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Resumen</p>
                  <h2 className="mt-2 text-2xl font-semibold text-primary">Tu actividad</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                  Activa
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-stone-50 p-4">
                  <Package className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-2xl font-semibold text-primary">0</p>
                  <p className="text-sm text-stone-600">Pedidos</p>
                </div>
                <div className="rounded-2xl bg-stone-50 p-4">
                  <Heart className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-2xl font-semibold text-primary">0</p>
                  <p className="text-sm text-stone-600">Favoritos</p>
                </div>
                <div className="rounded-2xl bg-stone-50 p-4">
                  <MapPin className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-2xl font-semibold text-primary">0</p>
                  <p className="text-sm text-stone-600">Direcciones</p>
                </div>
              </div>
            </section>

            {user.role === 'admin' && (
              <section className="rounded-[28px] border border-[#e9c98b] bg-[#fff8e7] p-6 shadow-[0_20px_40px_rgba(215,168,62,0.12)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b6b13]">Workspace privado</p>
                    <h2 className="mt-2 text-2xl font-semibold text-primary">Panel de administración</h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Controla ventas, inventario, productos y operaciones desde un solo lugar.</p>
                  </div>
                  <LayoutDashboard className="h-6 w-6 shrink-0 text-[#b77d16]" />
                </div>
                <Link href="/admin" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent">
                  Abrir panel
                </Link>
              </section>
            )}

            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Datos personales</p>
                <button type="button" className="text-sm font-medium text-accent hover:underline">
                  Editar
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {profileSections.map((section) => (
                  <div key={section.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                      {section.icon}
                      {section.label}
                    </div>
                    <p className="mt-3 text-sm font-medium text-primary break-all">{section.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-sm text-stone-700">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <span>Nombre</span>
                  <span className="font-medium text-primary">{user.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <span>Email</span>
                  <span className="font-medium text-primary">{user.email}</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <span>Rol</span>
                  <span className="font-medium text-primary">{user.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Miembro desde</span>
                  <span className="font-medium text-primary">{new Date(user.createdAt).toLocaleDateString('es-CL')}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Pedidos</p>
                <Link href="/shop" className="text-sm font-medium text-accent hover:underline">
                  Ver tienda
                </Link>
              </div>

              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <Package className="mx-auto h-8 w-8 text-stone-400" />
                <h3 className="mt-4 text-xl font-semibold text-primary">No tienes pedidos todavía.</h3>
                <p className="mt-2 text-sm text-stone-600">Tus compras aparecerán aquí cuando realices tu primera compra.</p>
                <Link
                  href="/shop"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  Volver a comprar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Direcciones</p>
                <button type="button" className="text-sm font-medium text-accent hover:underline">
                  Agregar
                </button>
              </div>

              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <MapPin className="mx-auto h-8 w-8 text-stone-400" />
                <h3 className="mt-4 text-xl font-semibold text-primary">No tienes direcciones guardadas.</h3>
                <p className="mt-2 text-sm text-stone-600">Guarda tus ubicaciones para una compra más rápida.</p>
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Favoritos</p>
                <Link href="/favorites" className="text-sm font-medium text-accent hover:underline">
                  Ver todos
                </Link>
              </div>

              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <Heart className="mx-auto h-8 w-8 text-stone-400" />
                <h3 className="mt-4 text-xl font-semibold text-primary">Tu wishlist está vacía.</h3>
                <p className="mt-2 text-sm text-stone-600">Guarda tus prendas favoritas para volver luego.</p>
                <Link
                  href="/shop"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  Explorar colección
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Seguridad</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                <p className="text-sm font-medium">Sesión protegida y persistente</p>
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <div className="mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-stone-600" />
                <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Configuración</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700">
                  <span className="inline-flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notificaciones
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-700">
                    Activado
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700">
                  <span className="inline-flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Preferencias
                  </span>
                  <span className="text-stone-500">Personalizar</span>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
              <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Acciones rápidas</p>
              <div className="mt-4 space-y-3">
                <Link href="/shop" className="flex items-center justify-between rounded-2xl border border-stone-200 p-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                  Continuar comprando
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/favorites" className="flex items-center justify-between rounded-2xl border border-stone-200 p-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                  Ver favoritos
                  <Heart className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
