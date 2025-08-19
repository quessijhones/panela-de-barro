import React, { useMemo, useState } from "react";

const i18n = {
  en: {
    nav: { about: "About", menu: "Menu", gallery: "Gallery", location: "Location", contact: "Contact" },
    hero: { title: "Panela de Barro", subtitle: "Brazilian Heritage Cuisine in Qatar", ctaReserve: "Reserve a Table", ctaMenu: "See the Menu" },
    about: {
      title: "Our Story",
      body: "Rooted in Brazil’s culinary traditions, Panela de Barro celebrates slow cooking, fire, and generous hospitality. Led by Chef Cass, we bring iconic flavors like feijoada, picanha, and galinhada—crafted with premium halal meats and fresh, local ingredients.",
      highlights: ["Live kitchen with wood‑fired stove","Seasonal specials and regional classics","Tropical, zero‑alcohol drinks"],
    },
    menu: {
      title: "Menu",
      subtitle: "Signature dishes inspired by Brazil’s regions. Ask about our chef’s seasonal creations.",
      sections: { mains: "Chef’s Mains", sides: "Sides", desserts: "Desserts", drinks: "Drinks (Non‑Alcoholic)" },
      note: "*Halal, prepared fresh daily."
    },
    gallery: { title: "Gallery" },
    location: {
      title: "Location & Hours",
      addressLabel: "Address",
      hoursLabel: "Hours",
      hours: [{ d: "Mon–Thu", h: "12:00 – 23:00" },{ d: "Fri", h: "13:00 – 23:30" },{ d: "Sat", h: "12:00 – 23:30" },{ d: "Sun", h: "12:00 – 22:00" }],
      mapNote: "Find us in a prime dining area—easy parking and family‑friendly."
    },
    contact: {
      title: "Contact & Bookings",
      phone: "Phone", email: "Email", whatsapp: "WhatsApp",
      form: { name: "Name", phone: "Phone", date: "Date", time: "Time", guests: "Guests", note: "Notes", send: "Send Request", ok: "Thanks! We’ll confirm shortly." }
    },
    footer: { rights: "All rights reserved.", built: "Site crafted with ❤️" },
  },
  pt: {
    nav: { about: "Sobre", menu: "Menu", gallery: "Galeria", location: "Localização", contact: "Contato" },
    hero: { title: "Panela de Barro", subtitle: "Cozinha brasileira de raiz no Qatar", ctaReserve: "Reservar Mesa", ctaMenu: "Ver o Menu" },
    about: {
      title: "Nossa História",
      body: "Enraizados nas tradições do Brasil, celebramos o fogo, o tempo e a hospitalidade. Liderado pelo Chef Cass, trazemos clássicos como feijoada, picanha e galinhada — com carnes halal de alta qualidade e ingredientes frescas.",
      highlights: ["Cozinha ao vivo com fogão a lenha","Especiais sazonais e clássicos regionais","Drinks tropicais sem álcool"],
    },
    menu: {
      title: "Menu",
      subtitle: "Pratos assinados inspirados nas regiões do Brasil. Pergunte pelos sazonais do chef.",
      sections: { mains: "Pratos Principais", sides: "Acompanhamentos", desserts: "Sobremesas", drinks: "Bebidas (Sem Álcool)" },
      note: "*Halal, preparados diariamente."
    },
    gallery: { title: "Galeria" },
    location: {
      title: "Localização & Horários",
      addressLabel: "Endereço",
      hoursLabel: "Horário",
      hours: [{ d: "Seg–Qui", h: "12:00 – 23:00" },{ d: "Sex", h: "13:00 – 23:30" },{ d: "Sáb", h: "12:00 – 23:30" },{ d: "Dom", h: "12:00 – 22:00" }],
      mapNote: "Estamos em uma área gastronômica estratégica — fácil estacionamento e ambiente familiar."
    },
    contact: {
      title: "Contato & Reservas",
      phone: "Telefone", email: "Email", whatsapp: "WhatsApp",
      form: { name: "Nome", phone: "Telefone", date: "Data", time: "Hora", guests: "Pessoas", note: "Observações", send: "Enviar Pedido", ok: "Obrigado! Confirmaremos em breve." }
    },
    footer: { rights: "Todos os direitos reservados.", built: "Site feito com ❤️" },
  },
  ar: {
    nav: { about: "من نحن", menu: "القائمة", gallery: "المعرض", location: "الموقع", contact: "التواصل" },
    hero: { title: "بانِيلا دي بارّو", subtitle: "مذاقات برازيلية أصيلة في قطر", ctaReserve: "احجز طاولة", ctaMenu: "عرض القائمة" },
    about: {
      title: "قصتنا",
      body: "نحتفي بالمطبخ البرازيلي التقليدي: نار هادئة وضيافة كريمة. بقيادة الشيف كاس نقدّم أطباقًا كلاسيكية مثل الفيجوادا والبيكانيا والغاليِنْيادا بلحوم حلال ومكوّنات طازجة.",
      highlights: ["مطبخ حي مع موقد حطب","أطباق موسمية ووصفات تراثية","مشروبات استوائية بدون كحول"],
    },
    menu: {
      title: "القائمة",
      subtitle: "أطباق مميّزة مستوحاة من مناطق البرازيل. اسأل عن أطباق الشيف الموسمية.",
      sections: { mains: "الأطباق الرئيسية", sides: "الأطباق الجانبية", desserts: "الحلويات", drinks: "المشروبات (بدون كحول)" },
      note: "*حلال وتُحضّر يوميًا."
    },
    gallery: { title: "المعرض" },
    location: {
      title: "الموقع وساعات العمل",
      addressLabel: "العنوان",
      hoursLabel: "الساعات",
      hours: [{ d: "الإثنين–الخميس", h: "12:00 – 23:00" },{ d: "الجمعة", h: "13:00 – 23:30" },{ d: "السبت", h: "12:00 – 23:30" },{ d: "الأحد", h: "12:00 – 22:00" }],
      mapNote: "موقع مميّز وسهل الوصول ومناسب للعائلات."
    },
    contact: {
      title: "التواصل والحجوزات",
      phone: "الهاتف", email: "البريد الإلكتروني", whatsapp: "واتساب",
      form: { name: "الاسم", phone: "الهاتف", date: "التاريخ", time: "الوقت", guests: "الضيوف", note: "ملاحظات", send: "إرسال الطلب", ok: "شكرًا! سنؤكد قريبًا." }
    },
    footer: { rights: "جميع الحقوق محفوظة.", built: "صُمم بحب ❤️" },
  },
};

const menuData = [
  { key: "mains", items: [
    { name: { en: "Vaca Atolada (Ossobuco)", pt: "Vaca Atolada (Ossobuco)", ar: "أوسّوبوكو مع بولينتا" },
      desc: { en: "Braised beef shank served with green‑corn polenta and citrus arugula salad.",
              pt: "Ossobuco braseado servido com polenta de milho verde e salada cítrica de rúcula.",
              ar: "عرق لحم بقر مطهو ببطء مع بولينتا ذرة خضراء وسلطة جرجير حمضية."},
      price: "QAR —" },
    { name: { en: "Feijoada de Costela", pt: "Feijoada de Costela", ar: "فيجوادا بضلع" },
      desc: { en: "Black‑bean stew with beef ribs; served with banana farofa, orange slices, vinaigrette, and seasoned rice.",
              pt: "Feijoada de feijão‑preto com costela; farofa de banana, fatias de laranja, vinagrete e arroz temperado.",
              ar: "يخنة فاصولياء سوداء مع أضلاع بقر؛ مع فاروفا الموز، شرائح البرتقال، فيناجريت وأرز متبّل."},
      price: "QAR —" },
    { name: { en: "Chef’s Picanha", pt: "Picanha do Chef", ar: "بيكانيا الشيف" },
      desc: { en: "Grilled picanha with mushroom risotto, green‑corn polenta, and peppercorn sauce (signature).",
              pt: "Picanha grelhada com risoto de cogumelos, polenta de milho verde e molho de pimenta‑do‑reino (assinatura).",
              ar: "بيكانيا مشوية مع ريزوتو الفطر وبولينتا الذرة الخضراء وصلصة الفلفل (طبق توقيعي)."},
      price: "QAR —" },
  ]},
  { key: "sides", items: [
    { name: { en: "Banana Farofa", pt: "Farofa de Banana", ar: "فاروفا الموز" }, desc: { en: "Toasted cassava flour with banana and herbs.", pt: "Farinha de mandioca tostada com banana e ervas.", ar: "طحين الكسافا المحمّص مع الموز والأعشاب." }, price: "QAR —" },
    { name: { en: "Green‑corn Polenta", pt: "Polenta de Milho Verde", ar: "بولينتا الذرة الخضراء" }, desc: { en: "Creamy.", pt: "Cremosa.", ar: "كريمية." }, price: "QAR —" },
  ]},
];

function FlagSwitcher({ lang, setLang }) {
  const opts = [
    { code: "pt", label: "🇧🇷 PT" },
    { code: "en", label: "🇬🇧 EN" },
    { code: "ar", label: "🇶🇦 AR" },
  ];
  return (
    <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
      {opts.map(o => (
        <button
          key={o.code}
          className={`flagbtn ${lang===o.code?'active':''}`}
          onClick={()=>setLang(o.code)}
          aria-label={`Switch language to ${o.code}`}
        >{o.label}</button>
      ))}
    </div>
  );
}

function Section({ id, children }) {
  return <section id={id} className="section">{children}</section>
}

export default function App() {
  const [lang, setLang] = useState("pt");
  const t = useMemo(()=> i18n[lang], [lang]);

  return (
    <main>
      <div className="nav">
        <div className="container nav-inner">
          <a href="#home" style={{fontWeight:800}}>Panela de Barro</a>
          <div style={{display:'flex', gap:16, alignItems:'center'}}>
            <a href="#about">{t.nav.about}</a>
            <a href="#menu">{t.nav.menu}</a>
            <a href="#gallery">{t.nav.gallery}</a>
            <a href="#location">{t.nav.location}</a>
            <a href="#contact">{t.nav.contact}</a>
            <a href="#contact" className="btn" style={{padding:'8px 12px'}}>{t.hero.ctaReserve}</a>
          </div>
        </div>
      </div>

      <header id="home" className="hero">
        <div className="container hero-grid">
          <div>
            <h1 style={{fontSize:48, margin:'0 0 12px 0'}}>{t.hero.title}</h1>
            <p style={{opacity:.8}}>{t.hero.subtitle}</p>
            <div style={{display:'flex', gap:10, marginTop:16, alignItems:'center'}}>
              <a href="#contact" className="btn">{t.hero.ctaReserve}</a>
              <a href="#menu" className="btn secondary">{t.hero.ctaMenu}</a>
              <FlagSwitcher lang={lang} setLang={setLang} />
            </div>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1887&auto=format&fit=crop" alt="Rustic cooking" style={{width:'100%', borderRadius:12}}/>
            <div style={{fontSize:12, marginTop:8}}>Chef’s signature: Picanha with mushroom risotto</div>
          </div>
        </div>
      </header>

      <Section id="about">
        <div className="container two" style={{alignItems:'center'}}>
          <div>
            <h2 style={{fontSize:32}}>{t.about.title}</h2>
            <p style={{opacity:.8, lineHeight:1.6, marginTop:8}}>{t.about.body}</p>
            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:12}}>
              {t.about.highlights.map(h => <span key={h} className="badge">{h}</span>)}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=1964&auto=format&fit=crop" alt="Wood‑fired" style={{width:'100%', borderRadius:16, border:'1px solid rgba(0,0,0,.1)'}}/>
        </div>
      </Section>

      <Section id="menu">
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', gap:16, flexWrap:'wrap'}}>
            <div>
              <h2 style={{fontSize:32}}>{t.menu.title}</h2>
              <p style={{opacity:.7}}>{t.menu.subtitle}</p>
            </div>
            <div className="badge">{t.menu.note}</div>
          </div>
          {menuData.map(sec => (
            <div key={sec.key} style={{marginTop:20}}>
              <h3 style={{fontSize:24, marginBottom:8}}>{t.menu.sections[sec.key]}</h3>
              <div className="menu-items">
                {sec.items.map(item => (
                  <div key={item.name.en} className="card">
                    <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
                      <div>
                        <div style={{fontWeight:600, fontSize:18}}>{item.name[lang]}</div>
                        <div style={{opacity:.8, fontSize:14, marginTop:4, lineHeight:1.5}}>{item.desc[lang]}</div>
                      </div>
                      <span className="price">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gallery">
        <div className="container">
          <h2 style={{fontSize:32, marginBottom:12}}>{t.gallery.title}</h2>
          <div className="gallery">
            {["photo-1526318472351-c75fcf070305","photo-1496412705862-e0088f16f791","photo-1565299624946-b28f40a0ae38","photo-1565299507177-b0ac66763828","photo-1504674900247-0877df9cc836","photo-1550547660-d9450f859349"].map(id => (
              <img key={id} src={`https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`} alt="Dish or ambiance" />
            ))}
          </div>
        </div>
      </Section>

      <Section id="location">
        <div className="container two">
          <div>
            <h2 style={{fontSize:32}}>{t.location.title}</h2>
            <div className="card">
              <iframe title="Map" style={{width:'100%', height:360, border:0}}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.365!2d51.531!3d25.286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sqa!4v1690000000000"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <p style={{opacity:.7, fontSize:14, marginTop:6}}>{t.location.mapNote}</p>
          </div>
          <div className="grid">
            <div className="card">
              <h3>{t.location.addressLabel}</h3>
              <p style={{opacity:.8, marginTop:6}}>Doha, Qatar — (update exact address)</p>
            </div>
            <div className="card">
              <h3>{t.location.hoursLabel}</h3>
              <ul style={{listStyle:'none', padding:0, margin:0}}>
                {t.location.hours.map(h => (
                  <li key={h.d} style={{display:'flex', justifyContent:'space-between', fontSize:14, padding:'6px 0'}}>
                    <span style={{opacity:.7}}>{h.d}</span>
                    <span style={{fontWeight:600}}>{h.h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="container two">
          <div>
            <h2 style={{fontSize:32}}>{t.contact.title}</h2>
            <div className="grid card" style={{gap:8}}>
              <div><strong>{t.contact.phone}:</strong> +974 0000 0000</div>
              <div><strong>{t.contact.email}:</strong> quessijhones@gmail.com</div>
              <div><strong>{t.contact.whatsapp}:</strong> <a href="https://wa.me/97400000000?text=Olá! Quero reservar no Panela de Barro.">wa.me/97400000000</a></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1887&auto=format&fit=crop" alt="Dining room" style={{width:'100%', borderRadius:16, border:'1px solid rgba(0,0,0,.1)'}}/>
        </div>
      </Section>

      <div className="footer">
        <div className="container" style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
          <div>© {new Date().getFullYear()} Panela de Barro. {t.footer.rights}</div>
          <div style={{opacity:.7}}>{t.footer.built}</div>
        </div>
      </div>
    </main>
  )
}