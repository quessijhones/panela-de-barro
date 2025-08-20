// menuData.js
export const images = {
  picanha: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  feijoada:"https://images.unsplash.com/photo-1544025162-d76694265947",
  moqueca: "https://images.unsplash.com/photo-1526318472351-c75fcf070305",
  burger:  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  mandioca:"https://images.unsplash.com/photo-1505575972945-270b16fda6fb",
  farofa:  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  arroz:   "https://images.unsplash.com/photo-1551183053-bf91a1d81141?crop=entropy&cs=tinysrgb&fit=crop&w=1200&q=80",
  pudim:   "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb"
};

export const categories = ["mains","sides","desserts","drinks"];

export const menu = {
  mains: [
    { slug:"picanha", price:"QAR 165",
      name:{pt:"Picanha do Chef", en:"Chef’s Picanha", ar:"بيكانيا الشيف"},
      desc:{pt:"Picanha grelhada com risoto de cogumelos e polenta de milho verde.",
            en:"Grilled picanha with mushroom risotto & green-corn polenta.",
            ar:"بيكانيا مشوية مع ريزوتو الفطر وبولينتا."},
      img:images.picanha
    },
    { slug:"feijoada", price:"QAR 160",
      name:{pt:"Feijoada de Costela", en:"Beef Rib Feijoada", ar:"فيجوادا بأضلاع"},
      desc:{pt:"Feijão-preto com costela, farofa de banana, laranja, vinagrete & arroz.",
            en:"Black-bean stew with beef ribs, banana farofa, orange & rice.",
            ar:"يخنة فاصولياء سوداء مع أضلاع بقر وإضافات تقليدية."},
      img:images.feijoada
    },
    { slug:"moqueca", price:"QAR 178",
      name:{pt:"Moqueca Baiana", en:"Bahian Moqueca", ar:"مُوكِيكا"},
      desc:{pt:"Peixe com leite de coco e dendê; acompanha arroz e farofa.",
            en:"Fish stew with coconut milk & dendê; served with rice & farofa.",
            ar:"يخنة سمك مع حليب جوز الهند وزيت الدندي."},
      img:images.moqueca
    },
    { slug:"burger-picanha", price:"QAR 89",
      name:{pt:"Hambúrguer de Picanha", en:"Picanha Burger", ar:"برغر بيكانيا"},
      desc:{pt:"Molho de cogumelos, pimenta-verde, queijo, bacon e batata rústica.",
            en:"Mushroom & green-peppercorn sauce, cheese, bacon & rustic fries.",
            ar:"صلصة الفطر والفلفل الأخضر مع الجبن والبطاطا."},
      img:images.burger
    }
  ],
  sides: [
    { slug:"mandioca", price:"QAR 24",
      name:{pt:"Mandioca Frita", en:"Fried Cassava", ar:"كسافا مقلية"},
      desc:{pt:"Palitos dourados e crocantes.", en:"Golden, crispy cassava sticks.", ar:"عيدان مقرمشة."},
      img:images.mandioca
    },
    { slug:"farofa", price:"QAR 18",
      name:{pt:"Farofa de Banana", en:"Banana Farofa", ar:"فاروڤا بالموز"},
      desc:{pt:"Clássica farofa amanteigada com banana.", en:"Buttery farofa with banana.", ar:"فاروڤا بالزبدة والموز."},
      img:images.farofa
    }
  ],
  desserts: [
    { slug:"pudim", price:"QAR 42",
      name:{pt:"Encanto de Coco", en:"Encanto de Coco", ar:"حلوى جوز الهند"},
      desc:{pt:"Pudim de coco aveludado com caramelo leve.",
            en:"Silky coconut flan with light caramel.",
            ar:"بودينغ جوز الهند مع كراميل."},
      img:images.pudim
    }
  ],
  drinks: []
};
