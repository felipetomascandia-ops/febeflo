'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, LockKeyhole, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const formatPrice = (value: number) => `$${value.toLocaleString('es-CL')}`;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError('Completa los campos marcados para continuar.');
      form.reportValidity();
      return;
    }

    clearCart();
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-[0_24px_60px_rgba(23,21,19,0.08)] sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
            <Check className="h-8 w-8" />
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Pedido confirmado</p>
          <h1 className="mt-3 text-4xl font-bold text-primary">Gracias por elegir FEBEFLO</h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-stone-600">
            Tu pedido fue registrado correctamente. En esta demo no se realiza ningún cobro real.
          </p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-accent">
            Seguir comprando
          </Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-primary">Tu carrito está vacío</h1>
          <p className="mt-4 text-stone-600">Agrega productos antes de comenzar el checkout.</p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-accent">
            Explorar colección
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-accent">
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </Link>

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Paso final</p>
          <h1 className="mt-2 text-4xl font-bold text-primary sm:text-5xl">Finalizar compra</h1>
          <p className="mt-3 max-w-xl text-stone-600">Completa tus datos y reserva tus prendas favoritas.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-3 border-b border-stone-200 pb-5">
              <LockKeyhole className="h-5 w-5 text-accent" />
              <div>
                <h2 className="text-xl font-bold text-primary">Datos de entrega</h2>
                <p className="text-sm text-stone-500">Usaremos estos datos para preparar tu pedido.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-stone-700">
                Nombre
                <input required name="firstName" className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
              </label>
              <label className="text-sm font-medium text-stone-700">
                Apellido
                <input required name="lastName" className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
              </label>
              <label className="text-sm font-medium text-stone-700 sm:col-span-2">
                Email
                <input required type="email" name="email" className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
              </label>
              <label className="text-sm font-medium text-stone-700 sm:col-span-2">
                Dirección
                <input required name="address" className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
              </label>
              <label className="text-sm font-medium text-stone-700">
                Ciudad
                <input required name="city" className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
              </label>
              <label className="text-sm font-medium text-stone-700">
                Código postal
                <input required name="postalCode" className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-stone-600">
              <input required type="checkbox" name="legalAcceptance" className="mt-1 h-4 w-4 shrink-0 rounded border-stone-300 text-accent focus:ring-accent" />
              <span>
                He leído y acepto los <Link href="/terminos" target="_blank" className="font-semibold text-accent hover:underline">Términos y condiciones</Link>, la <Link href="/privacidad" target="_blank" className="font-semibold text-accent hover:underline">Política de privacidad</Link> y la <Link href="/cambios-y-devoluciones" target="_blank" className="font-semibold text-accent hover:underline">Política de garantía</Link>.
              </span>
            </label>

            {error && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button type="submit" className="mt-8 w-full rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-accent-dark">
              Confirmar pedido · {formatPrice(cartTotal)}
            </button>
          </form>

          <aside className="h-fit rounded-[1.75rem] border border-stone-200 bg-[#171513] p-6 text-white shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">Resumen</p>
            <h2 className="mt-3 text-2xl font-bold">Tu selección</h2>
            <div className="mt-6 space-y-4 border-b border-white/10 pb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between gap-4 text-sm">
                  <span className="text-stone-300">{item.name} · {item.size} × {item.quantity}</span>
                  <span className="whitespace-nowrap font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between">
              <span className="text-stone-300">Total</span>
              <span className="text-2xl font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <p className="mt-5 text-xs leading-5 text-stone-400">El despacho se realiza mediante Starken y su costo corresponde a la tarifa informada para tu destino antes del pago.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
