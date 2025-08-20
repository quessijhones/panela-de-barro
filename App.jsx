import React, { useMemo, useState } from "react";

/* ===== i18n (textos) ===== */
const i18n = {
  pt: {
    nav: { about: "Sobre", menu: "Menu", gallery: "Galeria", location: "Localização", contact: "Contato" },
    hero: {
      title: "Panela de Barro",
      subtitle: "Cozinha brasileira de raiz no Qatar",
      ctaReserve: "Reservar Mesa",
      ctaMenu: "Ver o Menu",
    },
    about: {
      title: "Nossa História",
      body:
        "Enraizado nas tradições brasileiras, o Panela de Barro celebra o fogo lento, os sabores da roça e a hospitalidade generosa. Liderados pelo Chef Cass, trazemos clássicos regionais com ingredientes frescos e carnes halal.",
      highlights: ["Cozinha ao vivo com fogo", "Especiais sazonais", "Drinks tropicais sem álcool"],
    },
    menu: {
      title: "Menu",
      subtitle: "Pratos de assinatura inspirados nas regiões do Brasil",
      sections: { mains: "Principais", sides: "Acompanhamentos", desserts: "Sobremesas", drinks: "Bebidas (0% álcool)" },
      note: "Halal, preparado diariamente.",
    },
    gallery: { title: "Galeria" },
    location: { title: "Localização & Horários", addressLabel: "Endereço", hoursLabel: "Horários" },
    contact: { title: "Contato", whatsapp: "WhatsApp", instagram: "Instagram" },
    lang: { pt: "BR PT", en: "GB EN", ar: "QA AR" },
  },
  en: {
    nav: { about: "About", menu: "Menu", gallery: "Gallery", location: "Location", contact: "Contact" },
    hero: {
      title: "Panela de Barro",
      subtitle: "Brazilian Heritage Cuisine in Qatar",
      ctaReserve: "Reserve a Table",
      ctaMenu: "See the Menu",
    },
    about: {
      title: "Our Story",
      body:
        "Rooted in Brazil’s culinary traditions, Panela de Barro celebrates slow cooking, wood-fired flavors and generous hospitality. Led by Chef Cass, we bring iconic regional classics with fresh halal ingredients.",
      highlights: ["Live kitchen with fire", "Seasonal specials", "Tropical zero-alcohol drinks"],
    },
    menu: {
      title: "Menu",
      subtitle: "Signature dishes inspired by Brazil’s regions",
      sections: { mains: "Chef’s Mains", sides: "Sides", desserts: "Desserts", drinks: "Drinks (Non-Alcoholic)" },
      note: "Halal, prepared fresh daily.",
    },
    gallery: { title: "Gallery" },
    location: { title: "Location & Hours", addressLabel: "Address", hoursLabel: "Hours" },
    contact: { title: "Contact", whatsapp: "WhatsApp", instagram: "Instagram" },
    lang: { pt: "BR PT", en: "GB EN", ar: "QA AR" },
  },
  ar: {
    nav: { about: "نبذة", menu: "القائمة", gallery: "المعرض", location: "الموقع", contact: "تواصل" },
    hero: {
      title: "بانيلّا دي بارّو",
      subtitle: "مأكولات برازيلية أصيلة في قطر",
      ctaReserve: "احجز طاولة",
      ctaMenu: "عرض القائمة",
    },
    about: {
      title: "حكايتنا",
      body:
        "مستوحاة من تقاليد المطبخ البرازيلي، نحتفي بالطهي البطيء ونكهات النار والضيافة الكريمة. بقيادة الشيف كاس، نقدم أطباقاً كلاسيكية بمكوّنات طازجة حلال.",
      highlights: ["مطبخ حي على النار", "أطباق موسمية", "مشروبات استوائية بدون كحول"],
    },
    menu: {
      title: "القائمة",
      subtitle: "أطباق مميّزة من مناطق البرازيل",
      sections: { mains: "الأطباق الرئيسية", sides: "مقبلات", desserts: "حلويات", drinks: "مشروبات (بدون كحول)" },
      note: "حلال ويُحضّر يومياً.",
    },
    gallery: { title: "المعرض" },
    location: { title: "العنوان و الساعات", addressLabel: "العنوان", hoursLabel: "الساعات" },
    contact: { title: "تواصل", whatsapp: "واتساب", instagram: "إنستغرام" },
    lang: { pt: "BR PT", en: "GB EN", ar: "QA AR" },
  },
};

/* ===== Menu (resumo — pode ampliar depois) ===== */
const menuData = [
  {
    key: "mains",
    items: [
      {
        name: { en: "Chef’s Picanha", pt: "Picanha do Chef", ar: "بيكانيا الشيف" },
        desc: {
          en: "Grilled picanha, mushroom risotto, green-corn polenta & pepper sauce.",
          pt: "Picanha grelhada, risoto de cogumelos, polenta de milho verde e molho de pimenta.",
          ar: "بيكانيا مشوية مع ريزوتو الفطر وبولينتا وصلصة الفلفل.",
        },
        price: "QAR 165",
      },
      {
        name: { en: "Feijoada de Costela", pt: "Feijoada de Costela", ar: "فيجوادا بضلع" },
        desc: {
          en: "Black-bean stew with beef ribs; orange, farofa & rice.",
          pt: "Feijão-preto com costela; laranja, farofa e arroz.",
          ar: "يخنة فاصولياء سوداء مع أضلاع بقر مع الإضافات التقليدية.",
        },
        price: "QAR 160",
      },
      {
        name: { en: "Vaca Atolada (Ossobuco)", pt: "Vaca Atolada (Ossobuco)", ar: "أوسّوبوكو" },
        desc: {
          en: "Braised ossobuco with creamy green-corn polenta & arugula.",
          pt: "Ossobuco braseado com polenta de milho verde e rúcula cítrica.",
          ar: "عظم العجل المطهو ببطء مع بولينتا الذرة الخضراء.",
        },
        price: "QAR 160",
      },
    ],
  },
  {
    key: "sides",
    items: [
      { name: { en: "Fried Cassava", pt: "Mandioca Frita", ar: "كسافا مقلية" }, desc: { en: "Crispy sticks.", pt: "Palitos crocantes.", ar: "عيدان مقرمشة." }, price: "QAR 24" },
      { name: { en: "Garlic Bread", pt: "Pão de Alho", ar: "خبز بالثوم" }, desc: { en: "Herbed garlic cream.", pt: "Creme de alho e ervas.", ar: "كريمة الثوم والأعشاب." }, price: "QAR 18" },
      { name: { en: "Pão de Queijo", pt: "Pão de Queijo", ar: "خبز الجبن" }, desc: { en: "Cheese bread.", pt: "Tradicional pão de queijo.", ar: "خبز جبن برازيلي." }, price: "QAR 22" },
    ],
  },
  {
    key: "desserts",
    items: [
      { name: { en: "Encanto de Coco", pt: "Encanto de Coco", ar: "بودينغ جوز الهند" }, desc: { en: "Silky coconut flan.", pt: "Pudim de coco aveludado.", ar: "بودينغ جوز الهند الناعم." }, price: "QAR 42" },
      { name: { en: "Mandioca Real", pt: "Mandioca Real", ar: "كعكة الكسافا" }, desc: { en: "Cassava cake + dulce de leche.", pt: "Bolo de mandioca com doce de leite.", ar: "كعكة الكسافا مع دولسي دي ليتشي." }, price: "QAR 58" },
    ],
  },
  {
    key: "drinks",
    items: [
      { name: { en: "Caipilé Clássico", pt: "Caipilé Clássico (0% álcool)", ar: "كايبيرينها بدون كحول" }, desc: { en: "Classic non-alcoholic caipirinha.", pt: "Clássica sem álcool.", ar: "بدون كحول." }, price: "QAR 32" },
      { name: { en: "Frescor da Amazônia", pt: "Frescor da Amazônia", ar: "انتعاش الأمازون" }, desc: { en: "Pineapple, mint & lime.", pt: "Abacaxi, hortelã e limão.", ar: "أناناس ونعناع وليمون." }, price: "QAR 28" },
    ],
  },
];

/* ===== Componentes ===== */
const Anchor = ({ id, children }) => (
  <section id={id} className="section container">{children}</section>
);

function Header({ t, lang, setLang }) {
  return (
    <div className="nav">
      <div className="container nav-inner">
        <a href="#hero" style={{ fontWeight: 800 }}>Panela de Barro</a>
        <nav style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href="#about">{t.nav.about}</a>
          <a href="#menu">{t.nav.menu}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#location">{t.nav.location}</a>
          <a href="#contact">{t.nav.contact}</a>
          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            {["pt","en","ar"].map(code => (
              <button
                key={code}
                className={`flagbtn ${lang===code?"active":""}`}
                onClick={()=>setLang(code)}
                aria-label={`Switch to ${code}`}
              >
                {i18n[code].lang[code]}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

function Hero({ t }) {
  return (
    <section id="hero" className="hero">
      <div>
        <h1>{t.hero.title}</h1>
        <p style={{ margin:"10px 0 22px", fontSize: "1.1rem" }}>{t.hero.subtitle}</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a className="button" href="#contact">{t.hero.ctaReserve}</a>
          <a className="button" style={{ background:"#fff", color:"var(--clay-600)", border:"1px solid var(--clay-300)" }} href="#menu">{t.hero.ctaMenu}</a>
        </div>
      </div>
    </section>
  );
}

function Menu({ t, lang }) {
  return (
    <Anchor id="menu">
      <h2 style={{ fontFamily:"Playfair Display,serif" }}>{t.menu.title}</h2>
      <p style={{ color:"var(--muted)", marginBottom:18 }}>{t.menu.subtitle}</p>

      {/* Principais */}
      <div className="menu-section">
        <h3>{t.menu.sections.mains}</h3>
        <div className="menu-grid">
          {menuData.find(s=>s.key==="mains").items.map(item => (
            <div className="menu-card" key={item.name.en}>
              <h4>{item.name[lang]}</h4>
              <p>{item.desc[lang]}</p>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Acompanhamentos */}
      <div className="menu-section">
        <h3>{t.menu.sections.sides}</h3>
        <div className="menu-grid">
          {menuData.find(s=>s.key==="sides").items.map(item => (
            <div className="menu-card" key={item.name.en}>
              <h4>{item.name[lang]}</h4>
              <p>{item.desc[lang]}</p>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sobremesas */}
      <div className="menu-section">
        <h3>{t.menu.sections.desserts}</h3>
        <div className="menu-grid">
          {menuData.find(s=>s.key==="desserts").items.map(item => (
            <div className="menu-card" key={item.name.en}>
              <h4>{item.name[lang]}</h4>
              <p>{item.desc[lang]}</p>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bebidas */}
      <div className="menu-section">
        <h3>{t.menu.sections.drinks}</h3>
        <div className="menu-grid">
          {menuData.find(s=>s.key==="drinks").items.map(item => (
            <div className="menu-card" key={item.name.en}>
              <h4>{item.name[lang]}</h4>
              <p>{item.desc[lang]}</p>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ marginTop:16, color:"var(--muted)" }}>{t.menu.note}</p>
    </Anchor>
  );
}

function Gallery({ t }) {
  const imgs = [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    "https://images.unsplash.com/photo-1564758866811-9a0b0d96d58b",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1559339352-31b19d1bd5c7",
  ];
  return (
    <Anchor id="gallery">
      <h2 style={{ fontFamily:"Playfair Display,serif" }}>{t.gallery.title}</h2>
      <div className="gallery">
        {imgs.map((src,i)=>(<img key={i} src={`${src}?auto=format&fit=crop&w=900&q=60`} alt="Panela de Barro" loading="lazy" />))}
      </div>
    </Anchor>
  );
}

function Location({ t }) {
  return (
    <Anchor id="location">
      <h2 style={{ fontFamily:"Playfair Display,serif" }}>{t.location.title}</h2>
      <div className="grid two" style={{ alignItems:"start" }}>
        <div className="card">
          <h3>{t.location.addressLabel}</h3>
          <p>Doha, Qatar<br/>Al Waab / Aspire Zone</p>
          <h3 style={{ marginTop:14 }}>{t.location.hoursLabel}</h3>
          <p>Mon–Sun: 12:00–23:00</p>
        </div>
        <div className="card">
          <iframe
            title="map"
            width="100%" height="280" style={{ border:0, borderRadius:"16px" }}
            loading="lazy" allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.0!2d51.45!3d25.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z"
          />
        </div>
      </div>
    </Anchor>
  );
}

function Contact({ t }) {
  return (
    <Anchor id="contact">
      <h2 style={{ fontFamily:"Playfair Display,serif" }}>{t.contact.title}</h2>
      <div className="grid two">
        <div className="card">
          <p><strong>{t.contact.whatsapp}:</strong> +974 5555-5555</p>
          <p><strong>{t.contact.instagram}:</strong> @panela.de.barro.qa</p>
          <div style={{ marginTop:12, display:"flex", gap:12 }}>
            <a className="button" href="https://wa.me/97455555555" target="_blank">WhatsApp</a>
            <a className="button" style={{ background:"#fff", color:"var(--clay-600)", border:"1px solid var(--clay-300)" }} href="https://instagram.com" target="_blank">Instagram</a>
          </div>
        </div>
        <div className="card">
          <p>Para eventos, aniversários e grupos, fale conosco. Preparamos menus especiais.</p>
        </div>
      </div>
    </Anchor>
  );
}

export default function App(){
  const [lang, setLang] = useState("pt");
  const t = useMemo(()=> i18n[lang], [lang]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <Anchor id="about">
        <h2 style={{ fontFamily:"Playfair Display,serif" }}>{t.about.title}</h2>
        <p style={{ maxWidth:820 }}>{t.about.body}</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:12 }}>
          {t.about.highlights.map((h)=> <span key={h} className="badge">{h}</span>)}
        </div>
      </Anchor>
      <Menu t={t} lang={lang} />
      <Gallery t={t} />
      <Location t={t} />
      <Contact t={t} />
      <footer className="footer">© {new Date().getFullYear()} Panela de Barro — Doha, Qatar</footer>
    </>
  );
}
