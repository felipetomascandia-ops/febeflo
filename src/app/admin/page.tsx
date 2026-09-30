'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  Plus,
  Search,
  Settings2,
  ShoppingBag,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type AdminProduct = {
  id: string;
  name: string;
  category: 'Hombre' | 'Mujer';
  price: number;
  stock: number;
  status: 'Activo' | 'Borrador';
};

type AdminTab = 'overview' | 'inventory' | 'products' | 'orders';

const initialProducts: AdminProduct[] = [
  { id: 'SKU-001', name: 'Polera Oversize Esencial', category: 'Hombre', price: 29990, stock: 42, status: 'Activo' },
  { id: 'SKU-002', name: 'Jeans Slim Fit Negro', category: 'Hombre', price: 45990, stock: 8, status: 'Activo' },
  { id: 'SKU-003', name: 'Chaqueta Bomber Premium', category: 'Mujer', price: 79990, stock: 0, status: 'Borrador' },
  { id: 'SKU-004', name: 'Vestido Verano Elegante', category: 'Mujer', price: 34990, stock: 24, status: 'Activo' },
  { id: 'SKU-005', name: 'Blusa Seda Premium', category: 'Mujer', price: 68990, stock: 13, status: 'Activo' },
];

const sales = [
  { label: 'Lun', value: 42 },
  { label: 'Mar', value: 68 },
  { label: 'Mié', value: 54 },
  { label: 'Jue', value: 86 },
  { label: 'Vie', value: 72 },
  { label: 'Sáb', value: 96 },
  { label: 'Dom', value: 78 },
];

const orders = [
  { id: '#FF-2048', customer: 'Camila Rojas', total: 129980, status: 'Pagado', date: 'Hoy, 10:42' },
  { id: '#FF-2047', customer: 'Tomás Vidal', total: 45990, status: 'En preparación', date: 'Hoy, 09:18' },
  { id: '#FF-2046', customer: 'Sofía León', total: 103980, status: 'Enviado', date: 'Ayer, 18:30' },
  { id: '#FF-2045', customer: 'Martín Silva', total: 79990, status: 'Pagado', date: 'Ayer, 16:11' },
];

const currency = (value: number) => `$${value.toLocaleString('es-CL')}`;

export default function AdminPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Mujer' as AdminProduct['category'], price: '', stock: '' });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.replace('/account');
    }
  }, [isLoading, router, user]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('febeflo_admin_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('febeflo_admin_products', JSON.stringify(products));
  }, [products]);

  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toLowerCase().includes(searchTerm.toLowerCase())),
    [products, searchTerm],
  );

  const totalStock = products.reduce((total, product) => total + product.stock, 0);
  const lowStock = products.filter((product) => product.stock > 0 && product.stock <= 10).length;
  const outOfStock = products.filter((product) => product.stock === 0).length;

  const updateStock = (id: string, amount: number) => {
    setProducts((current) => current.map((product) => (product.id === id ? { ...product, stock: Math.max(0, product.stock + amount) } : product)));
    setNotice('Inventario actualizado correctamente.');
    window.setTimeout(() => setNotice(''), 2600);
  };

  const handleAddProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.stock) return;

    setProducts((current) => [
      ...current,
      {
        id: `SKU-${String(current.length + 1).padStart(3, '0')}`,
        name: newProduct.name.trim(),
        category: newProduct.category,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        status: 'Activo',
      },
    ]);
    setNewProduct({ name: '', category: 'Mujer', price: '', stock: '' });
    setIsAddOpen(false);
    setNotice('Nuevo artículo agregado al catálogo.');
    window.setTimeout(() => setNotice(''), 2600);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading || !user || user.role !== 'admin') {
    return <div className="flex min-h-[70vh] items-center justify-center bg-[#f5f7fb] text-sm text-slate-500">Verificando acceso seguro...</div>;
  }

  const navigation: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventario', icon: Boxes },
    { id: 'products', label: 'Productos', icon: ShoppingBag },
    { id: 'orders', label: 'Pedidos', icon: BarChart3 },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f7fb] text-[#202b3c]">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-[#172235] px-5 py-5 text-white lg:min-h-[calc(100vh-80px)] lg:w-64 lg:border-b-0 lg:border-r lg:px-4 lg:py-8">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f3bd4b]">FEBEFLO</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Commerce OS</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">Admin</span>
          </div>

          <nav className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:block lg:space-y-1">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${activeTab === id ? 'bg-[#e05a3f] text-white shadow-lg shadow-[#e05a3f]/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-8 hidden rounded-2xl border border-white/10 bg-white/5 p-4 lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Sesión activa</p>
            <p className="mt-3 truncate text-sm font-medium text-white">{user.email}</p>
            <p className="mt-1 text-xs text-emerald-300">Google verificado</p>
          </div>

          <button type="button" onClick={handleLogout} className="mt-8 hidden items-center gap-3 px-3 text-sm text-slate-400 transition hover:text-white lg:flex">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          <header className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e05a3f]">Panel de administración</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172235] sm:text-4xl">Buenos días, {user.name.split(' ')[0]}</h1>
              <p className="mt-2 text-sm text-slate-500">Aquí tienes una vista clara de la operación de FEBEFLO.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:inline-flex"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Tienda online activa</span>
              <button type="button" onClick={() => setIsAddOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#e05a3f] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e05a3f]/20 transition hover:bg-[#b9412d]"><Plus className="h-4 w-4" /> Nuevo artículo</button>
            </div>
          </header>

          {notice && <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"><Check className="h-4 w-4" />{notice}</div>}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Ventas netas', value: '$1.284.600', change: '+18,4%', icon: BarChart3, positive: true },
                  { label: 'Pedidos', value: '184', change: '+12,8%', icon: ShoppingBag, positive: true },
                  { label: 'Clientes', value: '2.846', change: '+9,6%', icon: Users, positive: true },
                  { label: 'Stock total', value: totalStock.toLocaleString('es-CL'), change: `${lowStock + outOfStock} alertas`, icon: Boxes, positive: false },
                ].map((metric) => {
                  const Icon = metric.icon;
                  return <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="rounded-xl bg-[#fff0eb] p-2.5 text-[#e05a3f]"><Icon className="h-5 w-5" /></div><span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${metric.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{metric.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{metric.change}</span></div><p className="mt-5 text-sm text-slate-500">{metric.label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-[#172235]">{metric.value}</p></div>;
                })}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Rendimiento</p><h2 className="mt-2 text-xl font-bold text-[#172235]">Ventas de la semana</h2></div><select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600"><option>Últimos 7 días</option><option>Últimos 30 días</option></select></div><div className="mt-8 flex h-56 items-end gap-3 sm:gap-6">{sales.map((sale, index) => <div key={sale.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] font-semibold text-slate-400">{sale.value}k</span><div className={`w-full max-w-10 rounded-t-lg transition ${index === 5 ? 'bg-[#e05a3f]' : 'bg-[#dbe5f0] hover:bg-[#9db4cd]'}`} style={{ height: `${sale.value * 1.65}px` }} /><span className="text-xs font-medium text-slate-400">{sale.label}</span></div>)}</div></div>
                <div className="rounded-2xl border border-slate-200 bg-[#172235] p-6 text-white shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Inventario</p><h2 className="mt-2 text-xl font-bold">Salud del stock</h2></div><Boxes className="h-5 w-5 text-[#f3bd4b]" /></div><div className="mt-8 space-y-5"><div><div className="mb-2 flex justify-between text-sm"><span className="text-slate-300">Disponible</span><span className="font-bold">{products.filter((product) => product.stock > 10).length}</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 w-[72%] rounded-full bg-emerald-400" /></div></div><div><div className="mb-2 flex justify-between text-sm"><span className="text-slate-300">Stock bajo</span><span className="font-bold text-[#f3bd4b]">{lowStock}</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 w-[28%] rounded-full bg-[#f3bd4b]" /></div></div><div><div className="mb-2 flex justify-between text-sm"><span className="text-slate-300">Agotado</span><span className="font-bold text-[#f28a70]">{outOfStock}</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 w-[12%] rounded-full bg-[#e05a3f]" /></div></div></div><button type="button" onClick={() => setActiveTab('inventory')} className="mt-8 text-sm font-semibold text-[#f3bd4b] hover:text-white">Revisar inventario →</button></div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Actividad reciente</p><h2 className="mt-2 text-xl font-bold text-[#172235]">Últimos pedidos</h2></div><button type="button" onClick={() => setActiveTab('orders')} className="text-sm font-semibold text-[#e05a3f]">Ver todos</button></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-slate-100 text-xs uppercase tracking-[0.15em] text-slate-400"><tr><th className="pb-3 font-semibold">Pedido</th><th className="pb-3 font-semibold">Cliente</th><th className="pb-3 font-semibold">Fecha</th><th className="pb-3 font-semibold">Total</th><th className="pb-3 font-semibold">Estado</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-b border-slate-100 last:border-0"><td className="py-4 font-semibold text-[#172235]">{order.id}</td><td className="py-4 text-slate-600">{order.customer}</td><td className="py-4 text-slate-500">{order.date}</td><td className="py-4 font-semibold text-[#172235]">{currency(order.total)}</td><td className="py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{order.status}</span></td></tr>)}</tbody></table></div></section>
            </div>
          )}

          {(activeTab === 'inventory' || activeTab === 'products') && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e05a3f]">{activeTab === 'inventory' ? 'Control de stock' : 'Catálogo'}</p><h2 className="mt-2 text-2xl font-bold text-[#172235]">{activeTab === 'inventory' ? 'Inventario de tienda' : 'Todos los artículos'}</h2><p className="mt-2 text-sm text-slate-500">Actualiza cantidades y mantén la operación al día.</p></div><div className="flex gap-3"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar SKU o nombre" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#e05a3f] sm:w-56" /></div><button type="button" onClick={() => setIsAddOpen(true)} className="hidden items-center gap-2 rounded-xl bg-[#172235] px-3 py-2 text-sm font-semibold text-white sm:inline-flex"><PackagePlus className="h-4 w-4" />Agregar</button></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-slate-100 text-xs uppercase tracking-[0.15em] text-slate-400"><tr><th className="pb-3 font-semibold">Producto</th><th className="pb-3 font-semibold">Categoría</th><th className="pb-3 font-semibold">Precio</th><th className="pb-3 font-semibold">Stock</th><th className="pb-3 font-semibold">Estado</th><th className="pb-3 text-right font-semibold">Acciones</th></tr></thead><tbody>{filteredProducts.map((product) => <tr key={product.id} className="border-b border-slate-100 last:border-0"><td className="py-4"><p className="font-semibold text-[#172235]">{product.name}</p><p className="mt-1 text-xs text-slate-400">{product.id}</p></td><td className="py-4 text-slate-600">{product.category}</td><td className="py-4 font-semibold text-[#172235]">{currency(product.price)}</td><td className="py-4"><span className={`font-bold ${product.stock === 0 ? 'text-red-500' : product.stock <= 10 ? 'text-amber-600' : 'text-emerald-600'}`}>{product.stock} uds.</span></td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.status === 'Activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{product.status}</span></td><td className="py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => updateStock(product.id, -1)} disabled={product.stock === 0} className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-[#e05a3f] hover:text-[#e05a3f] disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Reducir stock de ${product.name}`}><ArrowDownRight className="h-4 w-4" /></button><button type="button" onClick={() => updateStock(product.id, 1)} className="rounded-lg bg-[#e05a3f] p-2 text-white transition hover:bg-[#b9412d]" aria-label={`Aumentar stock de ${product.name}`}><Plus className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div></section>}

          {activeTab === 'orders' && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e05a3f]">Operación</p><h2 className="mt-2 text-2xl font-bold text-[#172235]">Pedidos y ventas</h2></div><Settings2 className="h-5 w-5 text-slate-400" /></div><div className="space-y-3">{orders.concat(orders.slice(0, 2)).map((order, index) => <div key={`${order.id}-${index}`} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-[#172235]">{order.id} · {order.customer}</p><p className="mt-1 text-xs text-slate-500">{order.date} · Pedido online</p></div><div className="flex items-center justify-between gap-6 sm:justify-end"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{order.status}</span><span className="font-bold text-[#172235]">{currency(order.total)}</span></div></div>)}</div></section>}
        </main>
      </div>

      {isAddOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172235]/60 px-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e05a3f]">Catálogo</p><h2 className="mt-2 text-2xl font-bold text-[#172235]">Nuevo artículo</h2></div><button type="button" onClick={() => setIsAddOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Cerrar formulario"><X className="h-5 w-5" /></button></div><form onSubmit={handleAddProduct} className="mt-6 space-y-4"><label className="block text-sm font-medium text-slate-700">Nombre del artículo<input required value={newProduct.name} onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#e05a3f]" placeholder="Ej. Camisa Resort" /></label><div className="grid gap-4 sm:grid-cols-3"><label className="block text-sm font-medium text-slate-700 sm:col-span-1">Categoría<select value={newProduct.category} onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value as AdminProduct['category'] })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-[#e05a3f]"><option>Hombre</option><option>Mujer</option></select></label><label className="block text-sm font-medium text-slate-700">Precio<input required min="1" type="number" value={newProduct.price} onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-[#e05a3f]" placeholder="59990" /></label><label className="block text-sm font-medium text-slate-700">Stock inicial<input required min="0" type="number" value={newProduct.stock} onChange={(event) => setNewProduct({ ...newProduct, stock: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-[#e05a3f]" placeholder="20" /></label></div><button type="submit" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e05a3f] px-4 py-3 font-semibold text-white transition hover:bg-[#b9412d]"><Plus className="h-4 w-4" />Agregar al catálogo</button></form></div></div>}
    </div>
  );
}
