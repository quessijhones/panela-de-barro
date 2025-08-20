import React, { useState, useMemo } from "react";
import "./styles.css";

/* ========= i18n ========= */
const tAll = {
  en:{ nav:{about:"About",menu:"Menu",gallery:"Gallery",location:"Location",contact:"Contact"},
       hero:{title:"Panela de Barro",subtitle:"Brazilian Heritage Cuisine in Qatar",ctaReserve:"Reserve a Table",ctaMenu:"See the Menu"},
       search:"Search dishes…", note:"Halal, prepared fresh daily.",
       sections:{mains:"Chef’s Mains",sides:"Sides",desserts:"Desserts",drinks:"Drinks (0% Alc)"},
       about:{title:"Our Story",body:"We celebrate slow cooking, countryside flavors and generous hospitality. Led by Chef Cass, we serve iconic regional classics with fresh halal ingredients."},
       gallery:{title:"Gallery"}, location:{title:"Location & Hours",address:"Address",hours:"Hours"},
       contact:{title:"Contact",whatsapp:"WhatsApp",instagram:"Instagram",msg:"For events & groups, talk to us."},
       lang:{pt:"BR PT",en:"GB EN",ar:"QA AR"}, view:"View dish", ok:"OK" },
  pt:{ nav:{about:"Sobre",menu:"Menu",gallery:"Galeria",location:"Localização",contact:"Contato"},
       hero:{title:"Panela de Barro",subtitle:"Culinária brasileira de raiz no Catar",ctaReserve:"Reservar Mesa",ctaMenu:"Ver o Menu"},
       search:"Buscar prato…", note:"Halal, preparado diariamente.",
       sections:{mains:"Principais",sides:"Acompanhamentos",desserts:"Sobremesas",drinks:"Bebidas (0% Alc)"},
       about:{title:"Nossa História",body:"Celebramos o fogo lento, os sabores da roça e a hospitalidade generosa. Liderados pelo Chef Cass, servimos clássicos regionais com ingredientes frescos e halal."},
       gallery:{title:"Galeria"}, location:{title:"Localização & Horários",address:"Endereço",hours:"Horários"},
       contact:{title:"Contato",whatsapp:"WhatsApp",instagram:"Instagram",msg:"Para eventos e grupos, fale conosco."},
       lang:{pt:"BR PT",en:"GB EN",ar:"QA AR"}, view:"Ver prato", ok:"OK" },
  ar:{ nav:{about:"نبذة",menu:"القائمة",gallery:"المعرض",location:"الموقع",contact:"تواصل"},
       hero:{title:"بانيلّا دي بارّو",subtitle:"مأكولات برازيلية أصيلة في قطر",ctaReserve:"احجز طاولة",ctaMenu:"عرض القائمة"},
       search:"ابحث عن طبق…", note:"حلال ويُحضّر يومياً.",
       sections:{mains:"الأطباق الرئيسية",sides:"مقبلات",desserts:"حلويات",drinks:"مشروبات (بدون كحول)"},
       about:{title:"حكايتنا",body:"نحتفي بالطهي البطيء ونكهات الريف والضيافة الكريمة. بقيادة الشيف كاس، نقدّم أطباقاً تقليدية بمكوّنات حلال طازجة."},
       gallery:{title:"المعرض"}, location:{title:"العنوان والساعات",address:"العنوان",hours:"الساعات"},
       contact:{title:"تواصل",whatsapp:"واتساب",instagram:"إنستغرام",msg:"للعروض والمناسبات، تواصل معنا."},
       lang:{pt:"BR PT",en:"GB EN",ar:"QA AR"}, view:"عرض الطبق", ok:"حسناً" },
};

/* ========= dados (imagens placeholder) ========= */
const img = {
  picanha:"https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  feijoada:"https://images.unsplash.com/photo-1544025162-d76694265947",
  vaca:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  moqueca:"https://images.unsplash.com/photo-1526318472351-c75fcf070305",
  burger:"https://images.unsplash.com/photo-1550547660-d9450f859349",
  mandioca:"https://images.unsplash.com/photo-1505575972945-270b16fda6fb",
  pudim:"https://images.unsplash.com/photo-1505250469679-203ad9ced0cb",
};

const menu = {
  mains:[
    {key:"picanha",price:"QAR 165",
     name:{pt:"Picanha do Chef",en:"Chef’s Picanha",ar:"بيكانيا الشيف"},
     desc:{pt:"Picanha grelhada com risoto de cogumelos, polenta de milho verde e molho de pimenta.",
           en:"Grilled picanha with mushroom risotto, green-corn polenta & pepper sauce.",
           ar:"بيكانيا مشوية مع ريزوتو الفطر وبولينتا وصلصة الفلفل."},
     img:img.picanha},
    {key:"feijoada",price:"QAR 160",
     name:{pt:"Feijoada de Costela",en:"Beef Rib Feijoada",ar:"فيجوادا بأضلاع"},
     desc:{pt:"Feijão-preto com costela, farofa de banana, laranja, vinagrete e arroz.",
           en:"Black-bean stew with beef ribs, banana farofa, orange, vinaigrette & rice.",
           ar:"يخنة فاصولياء سوداء مع أضلاع بقر وإضافات تقليدية."},
     img:img.feijoada},
    {key:"vaca",price:"QAR 160",
     name:{pt:"Vaca Atolada (Ossobuco)",en:"Vaca Atolada (Ossobuco)",ar:"أوسّوبوكو"},
     desc:{pt:"Ossobuco braseado com polenta de milho verde e rúcula cítrica.",
           en:"Braised ossobuco with creamy green-corn polenta & citrus arugula.",
           ar:"عظم العجل المطهو ببطء مع بولينتا الذرة الخضراء وسلطة الجرجير."},
     img:img.vaca},
    {key:"moqueca",price:"QAR 178",
     name:{pt:"Moqueca Baiana",en:"Bahian Moqueca",ar:"مُوكِيكا"},
     desc:{pt:"Peixe com leite de coco e dendê; acompanha arroz e farofa.",
           en:"Fish stew with coconut milk & dendê; served with rice and farofa.",
           ar:"يخنة سمك مع حليب جوز الهند وزيت الدندي."},
     img:img.moqueca},
    {key:"burger",price:"QAR 89",
     name:{pt:"Hambúrguer de Picanha",en:"Picanha Burger",ar:"برغر بيكانيا"},
     desc:{pt:"Molho de cogumelos e pimenta-verde, queijo, bacon, batata rústica e maionese.",
           en:"Mushroom & green-peppercorn sauce, cheese, bacon, rustic fries & mayo.",
           ar:"صلصة الفطر والفلفل الأخضر مع الجبن والبطاطا."},
     img:img.burger},
  ],
  sides:[
    {key:"mandioca",price:"QAR 24",
     name:{pt:"Mandioca Frita",en:"Fried Cassava",ar:"كسافا مقلية"},
     desc:{pt:"Palitos dourados e crocantes.",en:"Golden, crispy cassava sticks.",ar:"عيدان مقرمشة."},
     img:img.mandioca},
  ],
  desserts:[
    {key:"pudim",price:"QAR 42",
     name:{pt:"Encanto de Coco",en:"Encanto de Coco",ar:"بودينغ جوز الهند"},
     desc:{pt:"Pudim de coco aveludado com caramelo leve.",en:"Silky coconut flan with light caramel.",ar:"بودينغ جوز الهند مع كراميل ذهبي."},
     img:img.pudim},
  ],
  drinks:[]
};

/* ========= componentes auxiliares ========= */
const Flag = ({active,children,onClick}) => (
  <button className={`flagbtn ${active?'active':''}`} onClick={onClick}>{children}</button>
);

function Modal({open,onClose,children}){
  if(!open) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="card modal" onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

/* ========= App ========= */
export default function App(){
  const [lang,setLang] = useState("pt");
  const t = useMemo(()=>tAll[lang],[lang]);

  const [tab,setTab] = useState("mains");
  const [q,setQ]   = useState("");
  const [open,setOpen] = useState(false);
  const [current,setCurrent] = useState(null);

  const categories = ["mains","sides","desserts","drinks"];

  const list = useMemo(()=>{
    const arr = menu[tab]||[];
    if(!q.trim()) return arr;
    const qq = q.toLowerCase();
    return arr.filter(it =>
      it.name[lang].toLowerCase().includes(qq) ||
      it.desc[lang].toLowerCase().includes(qq)
    );
  },[q,tab,lang]);

  return (
    <>
      {/* NAV */}
      <div className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#hero">
            <img src="/logo.png" alt="Panela de Barro" />
            <span>Panela de Barro</span>
          </a>
          <nav>
            <a href="#about">{t.nav.about}</a>
            <a href="#menu">{t.nav.menu}</a>
            <a href="#gallery">{t.nav.gallery}</a>
            <a href="#location">{t.nav.location}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="lang">
            <Flag active={lang==='pt'} onClick={()=>setLang('pt')}>{t.lang.pt}</Flag>
            <Flag active={lang==='en'} onClick={()=>setLang('en')}>{t.lang.en}</Flag>
            <Flag active={lang==='ar'} onClick={()=>setLang('ar')}>{t.lang.ar}</Flag>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="hero" className="hero"
        style={{backgroundImage:'url(https://images.unsplash.com/photo-1528605248644-14dd04022da1)'}}>
        <div>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-actions">
            <a className="button" href="#contact">{t.hero.ctaReserve}</a>
            <a className="button ghost" href="#menu">{t.hero.ctaMenu}</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section container">
        <h2> {t.about.title} </h2>
        <p className="muted">{t.about.body}</p>
      </section>

      {/* MENU */}
      <section id="menu" className="section container">
        <h2>{t.nav.menu}</h2>
        <p className="muted">{t.note}</p>

        <div className="filters">
          {categories.map(c=>(
            <button key={c} className={`badge ${tab===c?'active':''}`} onClick={()=>setTab(c)}>
              {t.sections[c]}
            </button>
          ))}
          <input className="card" placeholder={t.search} value={q} onChange={e=>setQ(e.target.value)}/>
        </div>

        <div className="menu-grid">
          {list.map(it=>(
            <div key={it.key} className="menu-card" onClick={()=>{setCurrent(it);setOpen(true);}}>
              <img src={`${it.img}?auto=format&fit=crop&w=1200&q=70`} alt={it.name[lang]} loading="lazy"/>
              <h4>{it.name[lang]}</h4>
              <p className="muted">{it.desc[lang]}</p>
              <div className="price">{it.price}</div>
              <button className="button small">{t.view}</button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <Modal open={open} onClose={()=>setOpen(false)}>
        {current && (
          <div style={{display:'grid',gap:12}}>
            <img src={`${current.img}?auto=format&fit=crop&w=1600&q=80`} style={{width:'100%',borderRadius:'var(--radius)'}} alt="" />
            <div className="modal-head">
              <div>
                <h3 style={{margin:'0 0 6px'}}>{current.name[lang]}</h3>
                <p className="muted" style={{margin:0}}>{current.desc[lang]}</p>
              </div>
              <div className="price">{current.price}</div>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <button className="button" onClick={()=>setOpen(false)}>{t.ok}</button>
            </div>
          </div>
        )}
      </Modal>

      {/* GALLERY */}
      <section id="gallery" className="section container">
        <h2>{t.gallery.title}</h2>
        <div className="gallery">
          {["photo-1559339352-11d035aa65de","photo-1504674900247-0877df9cc836","photo-1498654896293-37aacf113fd9","photo-1528605248644-14dd04022da1"]
            .map((id,i)=>(
              <img key={i} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`} alt="" loading="lazy"/>
          ))}
        </div>
      </section>

      {/* LOCATION & CONTACT */}
      <section id="location" className="section container">
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

      <section id="contact" className="section container">
        <h2>{t.contact.title}</h2>
        <div className="grid two">
          <div className="card">
            <p><strong>{t.contact.whatsapp}:</strong> <a href="https://wa.me/97455555555" target="_blank">+974 5555-5555</a></p>
            <p><strong>{t.contact.instagram}:</strong> <a href="#" target="_blank">@panela.de.barro.qa</a></p>
            <p className="muted">{t.contact.msg}</p>
          </div>
          <div className="card">
            <form onSubmit={e=>e.preventDefault()}>
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

      <footer className="footer">© {new Date().getFullYear()} Panela de Barro — Doha, Qatar</footer>
    </>
  );
}
