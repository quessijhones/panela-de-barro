import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.css";
import { menu, categories } from "./menuData";

// i18n
const i18n = {
  en:{nav:{about:"About",menu:"Menu",gallery:"Gallery",location:"Location",contact:"Contact",reserv:"Reservations"},
      hero:{title:"Panela de Barro",sub:"Brazilian Heritage Cuisine in Qatar",cta1:"Reserve a Table",cta2:"See the Menu"},
      search:"Search dishes…",note:"Halal, prepared fresh daily.",
      sections:{mains:"Chef’s Mains",sides:"Sides",desserts:"Desserts",drinks:"Drinks (0% Alc)"},
      about:{title:"Our Story",body:"We celebrate slow cooking, countryside flavors and generous hospitality. Led by Chef Cass, we serve iconic regional classics with fresh halal ingredients."},
      gallery:{title:"Gallery"}, location:{title:"Location & Hours",address:"Address",hours:"Hours"},
      contact:{title:"Contact",msg:"For events & groups, talk to us."}, flags:{pt:"BR PT",en:"GB EN",ar:"QA AR"},
      view:"View dish", ok:"OK"},
  pt:{nav:{about:"Sobre",menu:"Menu",gallery:"Galeria",location:"Localização",contact:"Contato",reserv:"Reservas"},
      hero:{title:"Panela de Barro",sub:"Culinária brasileira de raiz no Catar",cta1:"Reservar Mesa",cta2:"Ver o Menu"},
      search:"Buscar prato…",note:"Halal, preparado diariamente.",
      sections:{mains:"Principais",sides:"Acompanhamentos",desserts:"Sobremesas",drinks:"Bebidas (0% Alc)"},
      about:{title:"Nossa História",body:"Celebramos o fogo lento, os sabores da roça e a hospitalidade generosa. Liderados pelo Chef Cass, servimos clássicos regionais com ingredientes frescos e halal."},
      gallery:{title:"Galeria"}, location:{title:"Localização & Horários",address:"Endereço",hours:"Horários"},
      contact:{title:"Contato",msg:"Para eventos e grupos, fale conosco."}, flags:{pt:"BR PT",en:"GB EN",ar:"QA AR"},
      view:"Ver prato", ok:"OK"},
  ar:{nav:{about:"نبذة",menu:"القائمة",gallery:"المعرض",location:"الموقع",contact:"تواصل",reserv:"حجوزات"},
      hero:{title:"بانيلّا دي بارّو",sub:"مأكولات برازيلية أصيلة في قطر",cta1:"احجز طاولة",cta2:"عرض القائمة"},
      search:"ابحث عن طبق…",note:"حلال ويُحضّر يومياً.",
      sections:{mains:"الأطباق الرئيسية",sides:"مقبلات",desserts:"حلويات",drinks:"مشروبات (بدون كحول)"},
      about:{title:"حكايتنا",body:"نحتفي بالطهي البطيء ونكهات الريف والضيافة الكريمة. بقيادة الشيف كاس، نقدّم أطباقاً تقليدية بمكوّنات حلال طازجة."},
      gallery:{title:"المعرض"}, location:{title:"العنوان والساعات",address:"العنوان",hours:"الساعات"},
      contact:{title:"تواصل",msg:"للعروض والمناسبات، تواصل معنا."}, flags:{pt:"BR PT",en:"GB EN",ar:"QA AR"},
      view:"عرض الطبق", ok:"حسناً"}
};

// ---------- Layout ----------
function Layout({lang,setLang}){
  const t = i18n[lang];
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/">
          <img src="/logo.png" alt="Panela de Barro"/>
          <span>Panela de Barro</span>
        </Link>
        <nav>
          <NavLink to="/#about">{t.nav.about}</NavLink>
          <NavLink to="/menu">{t.nav.menu}</NavLink>
          <NavLink to="/gallery">{t.nav.gallery}</NavLink>
          <NavLink to="/location">{t.nav.location}</NavLink>
          <NavLink to="/contact">{t.nav.contact}</NavLink>
          <NavLink to="/reservations">{t.nav.reserv}</NavLink>
        </nav>
        <div>
          <button className={`flagbtn ${lang==='pt'?'active':''}`} onClick={()=>setLang('pt')}>{t.flags.pt}</button>
          <button className={`flagbtn ${lang==='en'?'active':''}`} onClick={()=>setLang('en')}>{t.flags.en}</button>
          <button className={`flagbtn ${lang==='ar'?'active':''}`} onClick={()=>setLang('ar')}>{t.flags.ar}</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Home (hero com carrossel) ----------
function Home({lang}){
  const t = i18n[lang];
  const imgs = [
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
  ];
  const [i,setI] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setI(p=> (p+1)%imgs.length ), 4000);
    return ()=>clearInterval(id);
  },[]);
  return (
    <>
      <section className="hero">
        <div className="carousel">
          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={`${imgs[i]}?auto=format&fit=crop&w=1600&q=80`}
              initial={{opacity:0, scale:1.05}}
              animate={{opacity:1, scale:1}}
              exit={{opacity:0}}
              transition={{duration:0.8}}
              alt=""
            />
          </AnimatePresence>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <h1>{t.hero.title}</h1>
          <p>{t.hero.sub}</p>
          <div className="hero-actions">
            <Link className="button" to="/reservations">{t.hero.cta1}</Link>
            <Link className="button ghost" to="/menu">{t.hero.cta2}</Link>
          </div>
        </div>
      </section>

      <section id="about" className="section container">
        <h2>{i18n[lang].about.title}</h2>
        <p className="muted">{i18n[lang].about.body}</p>
      </section>
    </>
  );
}

// ---------- Menu Page ----------
function MenuPage({lang}){
  const t = i18n[lang];
  const [tab,setTab] = useState("mains");
  const [q,setQ] = useState("");
  const [dish,setDish] = useState(null);

  const list = (menu[tab]||[]).filter(d => {
    const qq = q.toLowerCase();
    return !qq || d.name[lang].toLowerCase().includes(qq) || d.desc[lang].toLowerCase().includes(qq);
  });

  return (
    <section className="section container">
      <h2>{t.nav.menu}</h2>
      <p className="muted">{t.note}</p>

      <div className="filters">
        {categories.map(c=>(
          <button key={c} className={`badge ${tab===c?'active':''}`} onClick={()=>setTab(c)}>{t.sections[c]}</button>
        ))}
        <input className="card" placeholder={t.search} value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <div className="menu-grid">
        {list.map(d=>(
          <div key={d.slug} className="menu-card" onClick={()=>setDish(d)}>
            <img src={`${d.img}?auto=format&fit=crop&w=1200&q=70`} alt={d.name[lang]} />
            <h4>{d.name[lang]}</h4>
            <p className="muted">{d.desc[lang]}</p>
            <div className="price">{d.price}</div>
            <button className="button small">{t.view}</button>
          </div>
        ))}
      </div>

      {dish && (
        <div className="backdrop" onClick={()=>setDish(null)}>
          <div className="card modal" onClick={e=>e.stopPropagation()}>
            <img src={`${dish.img}?auto=format&fit=crop&w=1600&q=80`} style={{width:'100%',borderRadius:'var(--radius)'}} alt="" />
            <div className="modal-head">
              <div>
                <h3 style={{margin:'8px 0'}}>{dish.name[lang]}</h3>
                <p className="muted">{dish.desc[lang]}</p>
              </div>
              <div className="price">{dish.price}</div>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <button className="button" onClick={()=>setDish(null)}>{t.ok}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------- Gallery ----------
function GalleryPage({lang}){
  const t = i18n[lang];
  const ids = ["photo-1559339352-11d035aa65de","photo-1504674900247-0877df9cc836","photo-1498654896293-37aacf113fd9","photo-1528605248644-14dd04022da1"];
  return (
    <section className="section container">
      <h2>{t.gallery.title}</h2>
      <div className="gallery">
        {ids.map((id,i)=>(<img key={i} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`} alt="" />))}
      </div>
    </section>
  );
}

// ---------- Location ----------
function LocationPage({lang}){
  const t = i18n[lang];
  return (
    <section className="section container">
      <h2>{t.location.title}</h2>
      <div className="grid two">
        <div className="card">
          <h3>{t.location.address}</h3>
          <p>Doha, Qatar — Al Waab / Aspire Zone</p>
          <h3 style={{marginTop:12}}>{t.location.hours}</h3>
          <p>Mon–Sun: 12:00–23:00</p>
        </div>
        <div className="card">
          <iframe title="map" width="100%" height="280" style={{border:0,borderRadius:"var(--radius)"}} loading="lazy" allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627!2d51.45!3d25.26"></iframe>
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function ContactPage({lang}){
  const t = i18n[lang];
  return (
    <section className="section container">
      <h2>{t.nav.contact}</h2>
      <div className="grid two">
        <div className="card">
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/97455555555" target="_blank">+974 5555-5555</a></p>
          <p><strong>Instagram:</strong> <a href="#" target="_blank">@panela.de.barro.qa</a></p>
          <p className="muted">{t.contact.msg}</p>
        </div>
        <div className="card">
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="form">
              <input className="card" placeholder="Nome / Name" />
              <input className="card" placeholder="WhatsApp" />
              <textarea className="card" rows={4} placeholder="Mensagem / Message" />
              <button className="button" type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ---------- Reservations ----------
function ReservationsPage({lang}){
  const t = i18n[lang];
  return (
    <section className="section container">
      <h2>{i18n[lang].nav.reserv}</h2>
      <div className="grid two">
        <div className="card">
          <p className="muted">Em breve integração com OpenTable / Reserve with Google.</p>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="form">
              <input className="card" placeholder="Nome" />
              <input className="card" type="date" />
              <input className="card" type="time" />
              <input className="card" placeholder="Pessoas / Guests" />
              <button className="button" type="submit">Solicitar Reserva</button>
            </div>
          </form>
        </div>
        <div className="card">
          <p><strong>Telefone:</strong> +974 5555-5555</p>
          <p><strong>Email:</strong> reservas@paneladebarroqatar.com</p>
        </div>
      </div>
    </section>
  );
}

// ---------- App com Router ----------
export default function App(){
  const [lang,setLang] = useState("pt");
  const location = useLocation();
  return (
    <>
      <Layout lang={lang} setLang={setLang}/>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}
          transition={{duration:0.25}}
        >
          <Routes>
            <Route path="/" element={<Home lang={lang}/>}/>
            <Route path="/menu" element={<MenuPage lang={lang}/>}/>
            <Route path="/gallery" element={<GalleryPage lang={lang}/>}/>
            <Route path="/location" element={<LocationPage lang={lang}/>}/>
            <Route path="/contact" element={<ContactPage lang={lang}/>}/>
            <Route path="/reservations" element={<ReservationsPage lang={lang}/>}/>
          </Routes>
        </motion.main>
      </AnimatePresence>
      <footer className="footer">© {new Date().getFullYear()} Panela de Barro — Doha, Qatar</footer>
    </>
  );
}

// Wrapper do Router (como você não usa src/, deixo tudo num arquivo)
export function Root(){
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}


      <footer className="footer">© {new Date().getFullYear()} Panela de Barro — Doha, Qatar</footer>
    </>
  );
}
