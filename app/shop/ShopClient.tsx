'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Product = { id: string; name: string; price: number; category: string; img: string; desc: string; };
type CartItem = Product & { qty: number; };

const products: Product[] = [
  { id: '1', name: '8×10 Fine Art Print', price: 799, category: 'Prints', img: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&q=80', desc: 'Premium lustre paper, archival quality, ready to frame.' },
  { id: '2', name: '12×18 Canvas Print', price: 1999, category: 'Prints', img: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80', desc: 'Gallery-wrapped canvas, 1.5" depth, UV protected.' },
  { id: '3', name: 'Signature Photo Album', price: 4999, category: 'Albums', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80', desc: '30 pages, lay-flat binding, linen hardcover, 40 images.' },
  { id: '4', name: 'Mini Accordion Album', price: 1499, category: 'Albums', img: 'https://images.unsplash.com/photo-1474366521808-f2f9ae7b462e?w=400&q=80', desc: 'Pocket-sized accordion album, 16 images, gift-ready.' },
  { id: '5', name: 'Personalised Photo Mug', price: 599, category: 'Gifts', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80', desc: '11oz ceramic mug with your favourite photo.' },
  { id: '6', name: 'Acrylic Photo Block', price: 2499, category: 'Prints', img: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80', desc: 'Floating acrylic display block, 6×8", museum quality.' },
  { id: '7', name: 'Photo Calendar 2026', price: 899, category: 'Gifts', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80', desc: '12-month personalised wall calendar with your photos.' },
  { id: '8', name: 'Luxury Gift Voucher', price: 5000, category: 'Gifts', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80', desc: 'Gift a photography session. Valid 12 months.' },
];

const categories = ['All', 'Prints', 'Albums', 'Gifts'];

export default function ShopClient() {
  const [activeCat, setActiveCat] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--charcoal)', paddingTop: 140, paddingBottom: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Print Shop
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
              Premium<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>prints & gifts</em>
            </h1>
          </div>
          <button onClick={() => setCartOpen(true)} style={{ background: 'var(--gold)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 2, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}>
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderRadius: 2, border: '1.5px solid', transition: 'all 0.25s',
                  background: activeCat === c ? 'var(--gold)' : 'transparent',
                  color: activeCat === c ? 'white' : 'var(--mist)',
                  borderColor: activeCat === c ? 'var(--gold)' : 'var(--border-strong)',
                }}>
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
            {filtered.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s,box-shadow 0.3s' }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(44,36,22,0.14)' }}>
                <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.05)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>{p.category}</span>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--charcoal)', margin: '0.4rem 0 0.5rem' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--mist)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: 'var(--gold)' }}>₹{p.price.toLocaleString('en-IN')}</p>
                    <button onClick={() => addToCart(p)} className="btn-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.64rem' }}>Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(44,36,22,0.5)', zIndex: 1200, backdropFilter: 'blur(4px)' }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 24, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 380, maxWidth: '95vw', background: 'var(--white)', zIndex: 1300, display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-strong)' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, color: 'var(--charcoal)' }}>Your Cart</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--mist)' }}>✕</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
                    <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛒</p>
                    <p style={{ color: 'var(--mist)', fontSize: '0.88rem' }}>Your cart is empty</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                    <img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal)', marginBottom: 2 }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>Qty: {item.qty}</p>
                      <p style={{ fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mist)', fontSize: '0.9rem', alignSelf: 'flex-start' }}>✕</button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--mist)', fontWeight: 500 }}>Total</span>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 300 }}>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                    Order via WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
