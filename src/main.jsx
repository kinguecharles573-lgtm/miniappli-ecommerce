import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, ShoppingCart, UserRound, MapPin, Phone, Menu, ArrowRight, ShieldCheck, Truck, CreditCard, Plus, Minus, Trash2, Wifi, WifiOff, Heart, ChevronDown, CheckCircle2, X } from "lucide-react";
import "./styles.css";

const PRODUCTS = [
  { id:"p1", name:"Réfrigérateur Samsung Smart Inverter 320L", category:"Réfrigérateurs", price:529000, old:599000, image:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85", badge:"-12%", rating:4.8, reviews:12, brand:"Samsung", description:"Un réfrigérateur spacieux conçu pour conserver les aliments au quotidien. La technologie Inverter est annoncée pour une consommation maîtrisée.", specs:[["Marque","Samsung"],["Capacité","320 litres (indiquée dans le nom du modèle)"],["Catégorie","Réfrigérateur"],["Prix précédent", "599 000 FCFA"]] },
  { id:"p2", name:"Congélateur coffre Roch RFR-300D (300L)", category:"Congélateurs", price:309000, old:345000, image:"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=85", badge:"-10%", rating:4.6, reviews:8, brand:"Roch", description:"Congélateur coffre pensé pour stocker des produits surgelés à la maison ou dans une petite activité commerciale.", specs:[["Marque","Roch"],["Référence","RFR-300D"],["Capacité","300 litres (indiquée dans le nom du modèle)"],["Catégorie","Congélateur coffre"]] },
  { id:"p3", name:"Climatiseur Westpoint 1.5 CV Inverter", category:"Climatiseurs", price:249000, old:295000, image:"https://images.unsplash.com/photo-1631545806609-5b4f7e7f4d9a?auto=format&fit=crop&w=900&q=85", badge:"-15%", rating:4.7, reviews:14, brand:"Westpoint", description:"Climatiseur pour améliorer le confort thermique d’une pièce. Vérifiez la surface de la pièce et les conditions d’installation avant achat.", specs:[["Marque","Westpoint"],["Puissance annoncée","1,5 CV"],["Technologie annoncée","Inverter"],["Installation","À confirmer selon le besoin"]] },
  { id:"p4", name:"Machine à laver Hisense 8 kg", category:"Machines à laver", price:229000, old:265000, image:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85", badge:"-10%", rating:4.7, reviews:10, brand:"Hisense", description:"Machine à laver adaptée aux lessives du quotidien. Vérifiez les programmes, les dimensions et le type de raccordement sur la fiche constructeur avant commande.", specs:[["Marque","Hisense"],["Capacité annoncée","8 kg"],["Catégorie","Machine à laver"],["Raccordement","À vérifier sur le modèle exact"]] },
  { id:"p5", name:"Cuisinière à gaz Delta 4 feux", category:"Cuisinières à gaz", price:169000, old:185000, image:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85", badge:"-8%", rating:4.5, reviews:6, brand:"Delta", description:"Cuisinière à gaz destinée à la préparation de plusieurs plats en parallèle. Confirmez le modèle, les dimensions et les accessoires inclus avec le magasin.", specs:[["Marque","Delta"],["Nombre de feux annoncé","4"],["Catégorie","Cuisinière à gaz"],["Accessoires","À confirmer"]] },
  { id:"p6", name:"Plaque à gaz Premax 4 feux", category:"Plaques à gaz", price:109000, old:120000, image:"https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=85", badge:"-9%", rating:4.6, reviews:9, brand:"Premax", description:"Plaque à gaz compacte pour équiper une cuisine. Assurez-vous que l’espace d’encastrement et le raccordement sont compatibles avec votre installation.", specs:[["Marque","Premax"],["Nombre de feux annoncé","4"],["Catégorie","Plaque à gaz"],["Installation","À vérifier avant achat"]] },
  { id:"p7", name:"Ventilateur rechargeable Innova", category:"Ventilateurs rechargeables", price:49000, old:56000, image:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=85", badge:"-12%", rating:4.6, reviews:7, brand:"Innova", description:"Ventilateur rechargeable pour profiter d’une circulation d’air même lors de coupures de courant. L’autonomie et le temps de charge sont à confirmer pour le modèle exact.", specs:[["Marque","Innova"],["Alimentation","Rechargeable (annoncée)"],["Catégorie","Ventilateur"],["Autonomie","À confirmer sur le modèle exact"]] }
];
const CATEGORIES = [
  ["Réfrigérateurs", "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80"],["Congélateurs", "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=400&q=80"],["Climatiseurs", "https://images.unsplash.com/photo-1631545806609-5b4f7e7f4d9a?auto=format&fit=crop&w=400&q=80"],
  ["Machines à laver", "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80"],["Cuisinières à gaz", "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80"],["Plaques à gaz", "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=400&q=80"],["Ventilateurs rechargeables", "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80"]
];
const money = n => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
function readCart(){ try { return JSON.parse(localStorage.getItem("batobaye-cart") || "{}"); } catch { return {}; } }

function App(){
  const [cart,setCart] = useState(readCart);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("Tous les produits");
  const [cartOpen,setCartOpen] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState(null);
  const [online,setOnline] = useState(navigator.onLine);
  const [notice,setNotice] = useState("");
  const [checkout,setCheckout] = useState(false);
  const [orderConfirmation,setOrderConfirmation] = useState(null);
  const [customer,setCustomer] = useState({name:"",phone:"",location:""});
  useEffect(()=>{ localStorage.setItem("batobaye-cart",JSON.stringify(cart)); },[cart]);
  useEffect(()=>{
    const up=()=>setOnline(true), down=()=>setOnline(false);
    const syncProductRoute=()=>{ const match=window.location.hash.match(/^#produit\/(p\d+)$/); setSelectedProduct(match ? PRODUCTS.find(p=>p.id===match[1]) || null : null); };
    syncProductRoute(); window.addEventListener("hashchange",syncProductRoute);
    window.addEventListener("online",up); window.addEventListener("offline",down);
    if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{});
    return ()=>{window.removeEventListener("online",up);window.removeEventListener("offline",down);window.removeEventListener("hashchange",syncProductRoute)};
  },[]);
  const filtered = useMemo(()=>PRODUCTS.filter(p=>(category==="Tous les produits"||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase())),[category,search]);
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  const cartProducts = PRODUCTS.filter(p=>cart[p.id]);
  const subtotal = cartProducts.reduce((sum,p)=>sum+p.price*cart[p.id],0);
  const openProduct = p => { setSelectedProduct(p); window.location.hash = `produit/${p.id}`; window.scrollTo({top:0,behavior:"smooth"}); };
  const backToCatalog = () => { setSelectedProduct(null); history.replaceState(null,"",window.location.pathname + window.location.search); window.scrollTo({top:0,behavior:"smooth"}); };
  const add = p => {setCart(c=>({...c,[p.id]:(c[p.id]||0)+1}));setNotice(`${p.name} ajouté au panier`);setTimeout(()=>setNotice(""),2200)};
  const change = (id,delta)=>setCart(c=>{const next={...c};const n=(next[id]||0)+delta;if(n<=0)delete next[id];else next[id]=n;return next});
  const remove = id=>setCart(c=>{const n={...c};delete n[id];return n});
  const placeOrder = e => {
    e.preventDefault();
    // Mode démo : enregistre localement la commande, même hors ligne.
    // Aucune commande n'est envoyée au magasin sans API/backend connecté.
    if (!customer.name.trim() || !customer.phone.trim() || !customer.location.trim()) {
      setNotice("Veuillez remplir tous les champs avant de confirmer.");
      return;
    }
    if (!count) {
      setNotice("Votre panier est vide. Ajoutez un produit avant de commander.");
      setCheckout(false);
      return;
    }
    const order = {
      reference: `BAT-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer: { name: customer.name.trim(), phone: customer.phone.trim(), location: customer.location.trim() },
      items: cartProducts.map(p => ({ id: p.id, name: p.name, price: p.price, quantity: cart[p.id] })),
      total: subtotal,
      status: "Démo — commande enregistrée sur cet appareil"
    };
    try {
      const previousOrders = JSON.parse(localStorage.getItem("batobaye-orders") || "[]");
      localStorage.setItem("batobaye-orders", JSON.stringify([order, ...previousOrders]));
    } catch (error) {
      console.error("Impossible de sauvegarder la commande localement", error);
    }
    setOrderConfirmation(order);
    setCheckout(false);
    setCartOpen(false);
    setCart({});
  };
  return <div className="app">
    {!online && <div className="offline"><WifiOff size={15}/> Mode hors ligne — votre panier reste disponible sur cet appareil.</div>}
    <header className="topbar">
      <a className="brand" href="#" aria-label="Batobaye Market accueil"><span className="brand-icon"><ShoppingCart size={29}/></span><span><strong>Batobaye <em>Market</em></strong><small>Le meilleur de l'électroménager</small></span></a>
      <div className="search"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un produit..." aria-label="Rechercher un produit"/><button aria-label="Rechercher"><Search size={20}/></button></div>
      <div className="location"><MapPin size={21}/><span><b>Akwa en face ancienne</b><small>station MRS, Douala</small></span></div>
      <div className="phone"><Phone size={19}/><span><b>+237 672 027 744</b><small>+237 678 447 922</small></span></div>
      <button className="account" onClick={()=>setNotice("Bienvenue chez Batobaye Market !")}><UserRound/><span>Compte</span></button>
      <button className="cart-button" onClick={()=>setCartOpen(true)}><ShoppingCart/><span>Panier</span>{count>0&&<b className="cart-count">{count}</b>}</button>
    </header>
    <nav className="nav">
      <button className="allcats" onClick={()=>setCategory("Tous les produits")}><Menu size={19}/> Toutes les catégories <ChevronDown size={14}/></button>
      <a className="active" href="#accueil">Accueil</a><a href="#produits">Produits</a><a href="#promotions">Promotions</a><a href="#magasins">Nos magasins</a><a href="#contact">Contact</a>
      <span className="nav-status">{online?<><Wifi size={14}/> En ligne</>:<><WifiOff size={14}/> Hors ligne</>}</span>
    </nav>
    <main>
      {selectedProduct ? <section className="product-detail-page">
        <button className="back-catalog" onClick={backToCatalog}>← Retour aux produits</button>
        <div className="detail-layout">
          <div className="detail-photo"><span className="discount">{selectedProduct.badge}</span><img src={selectedProduct.image} alt={selectedProduct.name}/></div>
          <div className="detail-copy"><span className="eyebrow">{selectedProduct.category.toUpperCase()}</span><small className="product-brand">{selectedProduct.brand}</small><h1>{selectedProduct.name}</h1><div className="rating"><span>★★★★★</span> <small>{selectedProduct.rating}/5 · {selectedProduct.reviews} avis (démo)</small></div><div className="detail-prices"><strong>{money(selectedProduct.price)}</strong><del>{money(selectedProduct.old)}</del><span>{selectedProduct.badge}</span></div><p className="detail-description">{selectedProduct.description}</p><h3>Détails du produit</h3><table className="spec-table"><tbody>{selectedProduct.specs.map(([label,value])=><tr key={label}><th>{label}</th><td>{value}</td></tr>)}<tr><th>Disponibilité</th><td>À confirmer auprès de Batobaye Market</td></tr><tr><th>Livraison</th><td>Douala — frais et délai à confirmer</td></tr><tr><th>Paiement</th><td>Espèces, Orange Money ou MTN MoMo (à confirmer)</td></tr></tbody></table><div className="detail-actions"><button className="add detail-add" onClick={()=>{add(selectedProduct);setCartOpen(true)}}><ShoppingCart size={17}/> Ajouter au panier</button><a className="detail-phone" href="tel:+237672027744">Contacter le magasin : 672 027 744</a></div><p className="detail-disclaimer">Les caractéristiques non confirmées sont indiquées comme telles. Les photos sont illustratives et peuvent différer du modèle exact.</p></div>
        </div>
      </section> : <>
      <section className="hero" id="accueil">
        <div className="hero-copy"><span className="eyebrow">LE CONFORT À BON PRIX</span><h1>Électroménager<br/><em>de qualité</em></h1><p>pour un quotidien meilleur</p><button onClick={()=>document.getElementById("produits").scrollIntoView({behavior:"smooth"})}>Découvrir maintenant <ArrowRight size={18}/></button></div>
        <div className="hero-products"><img src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80" alt="Réfrigérateur"/><img src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80" alt="Machine à laver"/><img src="https://images.unsplash.com/photo-1631545806609-5b4f7e7f4d9a?auto=format&fit=crop&w=400&q=80" alt="Climatiseur"/></div>
        <div className="hero-benefits"><span><ShieldCheck/> Produits de qualité</span><span><Truck/> Livraison rapide</span><span><CreditCard/> Paiement flexible</span></div>
      </section>
      <section className="category-row" aria-label="Catégories de produits">{CATEGORIES.map(([name,img])=><button key={name} className={category===name?"category selected":"category"} onClick={()=>setCategory(category===name?"Tous les produits":name)}><img src={img} alt=""/><span>{name}</span></button>)}</section>
      <section className="section-head" id="produits"><div><span className="eyebrow">NOTRE SÉLECTION</span><h2>{category==="Tous les produits"?"Produits populaires":category}</h2></div><span className="result-count">{filtered.length} produit(s)</span></section>
      {filtered.length ? <section className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><span className="discount">{p.badge}</span><button className="heart" aria-label="Favori" onClick={()=>setNotice("Fonction favoris à connecter à un compte")}><Heart size={17}/></button><div className="product-image"><img src={p.image} alt={p.name}/></div><div className="product-info"><small className="product-brand">{p.brand}</small><h3>{p.name}</h3><div className="rating"><span>★★★★★</span> <small>({p.reviews})</small></div><div className="prices"><strong>{money(p.price)}</strong><del>{money(p.old)}</del></div><button className="add" onClick={()=>openProduct(p)}><ShoppingCart size={16}/> Voir le produit</button></div></article>)}
        <aside className="delivery-card" id="promotions"><div><span className="eyebrow">BATOBAYE VOUS LIVRE</span><h3>Livraison<br/><em>à Douala</em></h3><p>Rapide et sécurisée, à domicile ou en agence.</p></div><Truck size={48}/><div className="delivery-foot"><CreditCard size={19}/> Paiement à la livraison · Orange Money · MTN MoMo</div></aside>
      </section> : <div className="empty"><Search size={32}/><h3>Aucun produit trouvé</h3><p>Essayez un autre mot-clé ou choisissez une catégorie.</p><button onClick={()=>{setSearch("");setCategory("Tous les produits")}}>Voir tous les produits</button></div>}
      <section className="trust-row"><div><ShieldCheck/><span><b>Produits sélectionnés</b><small>Qualité et fiabilité</small></span></div><div><Truck/><span><b>Livraison pratique</b><small>À domicile ou en agence</small></span></div><div><CreditCard/><span><b>Paiement flexible</b><small>Selon les options disponibles</small></span></div><div><CheckCircle2/><span><b>Équipe à votre écoute</b><small>Conseils avant achat</small></span></div></section>
      </>}
    </main>
    <footer id="contact"><div className="footer-main"><div className="footer-brand"><div className="brand"><span className="brand-icon"><ShoppingCart size={28}/></span><span><strong>Batobaye <em>Market</em></strong><small>Le meilleur de l'électroménager</small></span></div><p>Votre partenaire électroménager à Douala : du choix, des conseils et des prix compétitifs.</p></div><div><h4>Liens utiles</h4><a href="#accueil">Accueil</a><a href="#produits">Produits</a><a href="#promotions">Promotions</a><a href="#magasins">Nos magasins</a></div><div id="magasins"><h4>Nos magasins</h4><p><MapPin size={15}/> Akwa en face ancienne station MRS</p><p><MapPin size={15}/> Salle de fête d'Akwa</p><p><Phone size={15}/> +237 672 027 744</p><p><Phone size={15}/> +237 678 447 922</p></div><div><h4>Paiements</h4><div className="payments"><span>Orange Money</span><span>MTN MoMo</span><span>Espèces</span></div><p className="secure"><ShieldCheck size={16}/> Navigation sécurisée</p></div></div><div className="copyright"><span>© 2026 Batobaye Market. Projet pédagogique e-business.</span><span>Douala, Cameroun</span></div></footer>
    {notice&&<div className="toast"><CheckCircle2 size={18}/>{notice}<button onClick={()=>setNotice("")}><X size={15}/></button></div>}
    {cartOpen&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="drawer"><div className="drawer-head"><div><h2>Votre panier</h2><small>{count} article(s) · sauvegardé localement</small></div><button className="icon-button" onClick={()=>setCartOpen(false)}><X/></button></div>
      <div className="drawer-items">{cartProducts.length===0?<div className="empty-cart"><ShoppingCart size={40}/><h3>Votre panier est vide</h3><p>Ajoutez un produit pour commencer.</p></div>:cartProducts.map(p=><div className="cart-item" key={p.id}><img src={p.image} alt={p.name}/><div className="cart-item-info"><b>{p.name}</b><strong>{money(p.price)}</strong><div className="quantity"><button onClick={()=>change(p.id,-1)} aria-label="Diminuer"><Minus size={14}/></button><span>{cart[p.id]}</span><button onClick={()=>change(p.id,1)} aria-label="Augmenter"><Plus size={14}/></button></div></div><button className="remove" onClick={()=>remove(p.id)} aria-label="Retirer"><Trash2 size={17}/></button></div>)}</div>
      <div className="drawer-bottom"><div className="summary-line"><span>Sous-total</span><b>{money(subtotal)}</b></div><div className="summary-line"><span>Livraison</span><b className="green">À confirmer</b></div><div className="summary-line total"><span>Total estimatif</span><strong>{money(subtotal)}</strong></div><p className="offline-note"><ShieldCheck size={15}/> Le panier est conservé sur cet appareil, même hors ligne.</p><button className="checkout" disabled={!count} onClick={()=>setCheckout(true)}>Passer la commande <ArrowRight size={18}/></button><button className="continue" onClick={()=>setCartOpen(false)}>Continuer mes achats</button></div>
    </aside></div>}
    {checkout&&<div className="overlay checkout-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCheckout(false)}}><form className="checkout-modal" onSubmit={placeOrder}><div className="drawer-head"><h2>Finaliser la commande</h2><button type="button" className="icon-button" onClick={()=>setCheckout(false)} aria-label="Fermer"><X/></button></div><p className="modal-copy">Démo pédagogique : la commande sera enregistrée dans ce navigateur, même hors ligne. Elle ne sera pas transmise au magasin sans connexion à un serveur.</p><label>Nom complet<input required autoComplete="name" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Votre nom"/></label><label>Téléphone<input required type="tel" autoComplete="tel" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="6XX XX XX XX"/></label><label>Quartier / lieu de livraison<input required autoComplete="street-address" value={customer.location} onChange={e=>setCustomer({...customer,location:e.target.value})} placeholder="Ex. Akwa, Douala"/></label><div className="modal-total">Total estimatif <b>{money(subtotal)}</b></div><button className="checkout" type="submit">Confirmer (démo)</button></form></div>}
    {orderConfirmation&&<div className="overlay confirmation-overlay"><section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><div className="confirmation-icon"><CheckCircle2 size={34}/></div><h2 id="confirmation-title">Commande enregistrée !</h2><p className="modal-copy">La démonstration a bien enregistré votre commande sur cet appareil.</p><div className="order-reference"><span>Référence de commande</span><strong>{orderConfirmation.reference}</strong></div><div className="order-customer"><b>{orderConfirmation.customer.name}</b><span>{orderConfirmation.customer.phone}</span><span>{orderConfirmation.customer.location}</span></div><div className="order-lines">{orderConfirmation.items.map(item=><div className="order-line" key={item.id}><span>{item.name} × {item.quantity}</span><b>{money(item.price*item.quantity)}</b></div>)}</div><div className="modal-total"><span>Total estimatif</span><b>{money(orderConfirmation.total)}</b></div><p className="confirmation-warning">Important : ceci est une confirmation locale de démonstration, pas une commande reçue par Batobaye Market.</p><button className="checkout" onClick={()=>{setOrderConfirmation(null);setSelectedProduct(null);history.replaceState(null,"",window.location.pathname+window.location.search);window.scrollTo({top:0,behavior:"smooth"})}}>Retour à la boutique</button></section></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);