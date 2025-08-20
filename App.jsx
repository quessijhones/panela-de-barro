import React, { useState } from "react";
import "./styles.css";
import logo from "./logo.png"; // Logo do Panela de Barro

const translations = {
  en: {
    heroTitle: "Panela de Barro",
    heroSubtitle: "Brazilian Heritage Cuisine in Qatar",
    menu: "Menu",
    gallery: "Gallery",
    about: "About Us",
    contact: "Contact",
    viewDetails: "View Details",
    price: "Price",
    description: "Description",
    bookTable: "Reserve a Table",
    lang: "Language"
  },
  pt: {
    heroTitle: "Panela de Barro",
    heroSubtitle: "Culinária Brasileira Tradicional no Catar",
    menu: "Cardápio",
    gallery: "Galeria",
    about: "Sobre Nós",
    contact: "Contato",
    viewDetails: "Ver Detalhes",
    price: "Preço",
    description: "Descrição",
    bookTable: "Reservar Mesa",
    lang: "Idioma"
  },
  ar: {
    heroTitle: "بانيلّا دي بارّو",
    heroSubtitle: "المطبخ البرازيلي التقليدي في قطر",
    menu: "القائمة",
    gallery: "معرض الصور",
    about: "معلومات عنا",
    contact: "اتصال",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    description: "الوصف",
    bookTable: "احجز طاولة",
    lang: "اللغة"
  }
};

const dishes = [
  {
    id: 1,
    name: "Picanha Grelhada",
    description: "Picanha grelhada servida com risoto de cogumelos, polenta e molho de pimenta do reino.",
    price: "120 QAR",
    image: "https://source.unsplash.com/600x400/?steak,brazilian"
  },
  {
    id: 2,
    name: "Feijoada de Costela",
    description: "Tradicional feijoada brasileira servida com farofa de banana, arroz e laranja.",
    price: "95 QAR",
    image: "https://source.unsplash.com/600x400/?feijoada,brazilian"
  },
  {
    id: 3,
    name: "Moqueca Baiana",
    description: "Peixe cozido com leite de coco, azeite de dendê e temperos frescos.",
    price: "110 QAR",
    image: "https://source.unsplash.com/600x400/?fish,stew,brazilian"
  }
];

export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <div className="app">
      {/* Top Bar */}
      <header>
        <img src={logo} alt="Panela de Barro Logo" className="logo" />
        <nav>
          <a href="#menu">{t.menu}</a>
          <a href="#gallery">{t.gallery}</a>
          <a href="#about">{t.about}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">EN</option>
          <option value="pt">PT</option>
          <option value="ar">AR</option>
        </select>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
        <button>{t.bookTable}</button>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <h2>{t.menu}</h2>
        <div className="menu-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="menu-card" onClick={() => setSelectedDish(dish)}>
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.price}</p>
              <button>{t.viewDetails}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedDish && (
        <div className="modal" onClick={() => setSelectedDish(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedDish.image} alt={selectedDish.name} />
            <h3>{selectedDish.name}</h3>
            <p><strong>{t.price}:</strong> {selectedDish.price}</p>
            <p><strong>{t.description}:</strong> {selectedDish.description}</p>
            <button onClick={() => setSelectedDish(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Gallery */}
      <section id="gallery" className="gallery">
        <h2>{t.gallery}</h2>
        <div className="gallery-grid">
          <img src="https://source.unsplash.com/600x400/?restaurant,brazilian" alt="Restaurant" />
          <img src="https://source.unsplash.com/600x400/?brazilianfood" alt="Brazilian Food" />
          <img src="https://source.unsplash.com/600x400/?chef,kitchen" alt="Chef" />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>{t.contact}: info@paneladebarroqatar.com | +974 0000 0000</p>
        <div className="socials">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
        </div>
      </footer>
    </div>
  );
}
