export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  variants?: {
    sizes?: string[];
    colors?: string[];
  };
  category: string;
  subcategory?: string;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  translations: {
    en: { name: string; description: string };
    fr: { name: string; description: string };
    ar: { name: string; description: string };
  };
}

export const categories = [
  {
    id: "clothing",
    name: "Clothing",
    subcategories: ["jerseys", "hoodies", "t-shirts", "caps"],
  },
  {
    id: "accessories",
    name: "Accessories",
    subcategories: ["mousepads", "keychains", "bottles", "bags"],
  },
  {
    id: "gaming",
    name: "Gaming Gear",
    subcategories: ["mice", "keyboards", "headsets", "monitors"],
  },
  {
    id: "collectibles",
    name: "Collectibles",
    subcategories: ["figures", "posters", "pins", "cards"],
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "JSK Team Jersey 2024",
    description:
      "Official JSK Esports team jersey with premium fabric and team logo",
    price: 79.99,
    originalPrice: 99.99,
    stock: 25,
    images: ["/placeholder-wqdvx.png"],
    variants: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Green", "White"],
    },
    category: "clothing",
    subcategory: "jerseys",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ["official", "team", "jersey", "premium"],
    translations: {
      en: {
        name: "JSK Team Jersey 2024",
        description:
          "Official JSK Esports team jersey with premium fabric and team logo",
      },
      fr: {
        name: "Maillot Équipe JSK 2024",
        description:
          "Maillot officiel de l'équipe JSK Esports avec tissu premium et logo d'équipe",
      },
      ar: {
        name: "قميص فريق JSK 2024",
        description: "قميص فريق JSK Esports الرسمي بقماش فاخر وشعار الفريق",
      },
    },
  },
  {
    id: "2",
    name: "JSK Gaming Mouse Pad",
    description: "Large gaming mouse pad with JSK logo and smooth surface",
    price: 29.99,
    stock: 50,
    images: ["/jsk-gaming-mousepad-black-green-logo.jpg"],
    category: "accessories",
    subcategory: "mousepads",
    isFeatured: false,
    isNew: true,
    isOnSale: false,
    rating: 4.6,
    reviewCount: 89,
    tags: ["gaming", "mousepad", "logo"],
    translations: {
      en: {
        name: "JSK Gaming Mouse Pad",
        description: "Large gaming mouse pad with JSK logo and smooth surface",
      },
      fr: {
        name: "Tapis de Souris Gaming JSK",
        description:
          "Grand tapis de souris gaming avec logo JSK et surface lisse",
      },
      ar: {
        name: "لوحة ماوس الألعاب JSK",
        description: "لوحة ماوس ألعاب كبيرة مع شعار JSK وسطح أملس",
      },
    },
  },
  {
    id: "3",
    name: "JSK Elite Hoodie",
    description: "Premium hoodie with embroidered JSK logo and comfortable fit",
    price: 89.99,
    stock: 30,
    images: ["/jsk-esports-hoodie-black-green-embroidered-logo.jpg"],
    variants: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Green", "Gray"],
    },
    category: "clothing",
    subcategory: "hoodies",
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    rating: 4.9,
    reviewCount: 156,
    tags: ["hoodie", "premium", "embroidered", "comfortable"],
    translations: {
      en: {
        name: "JSK Elite Hoodie",
        description:
          "Premium hoodie with embroidered JSK logo and comfortable fit",
      },
      fr: {
        name: "Sweat à Capuche JSK Elite",
        description:
          "Sweat à capuche premium avec logo JSK brodé et coupe confortable",
      },
      ar: {
        name: "هودي JSK النخبة",
        description: "هودي فاخر مع شعار JSK مطرز وقصة مريحة",
      },
    },
  },
  {
    id: "4",
    name: "JSK Gaming Headset",
    description:
      "Professional gaming headset with 7.1 surround sound and JSK branding",
    price: 149.99,
    stock: 15,
    images: ["/jsk-gaming-headset-black-green-professional.jpg"],
    variants: {
      colors: ["Black", "Green"],
    },
    category: "gaming",
    subcategory: "headsets",
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    rating: 4.7,
    reviewCount: 67,
    tags: ["headset", "gaming", "7.1", "professional"],
    translations: {
      en: {
        name: "JSK Gaming Headset",
        description:
          "Professional gaming headset with 7.1 surround sound and JSK branding",
      },
      fr: {
        name: "Casque Gaming JSK",
        description:
          "Casque gaming professionnel avec son surround 7.1 et marquage JSK",
      },
      ar: {
        name: "سماعة ألعاب JSK",
        description:
          "سماعة ألعاب احترافية مع صوت محيطي 7.1 وعلامة JSK التجارية",
      },
    },
  },
  {
    id: "5",
    name: "JSK Water Bottle",
    description:
      "Insulated water bottle with JSK logo, perfect for gaming sessions",
    price: 19.99,
    stock: 75,
    images: ["/jsk-water-bottle-black-green-logo-insulated.jpg"],
    variants: {
      colors: ["Black", "Green", "White"],
    },
    category: "accessories",
    subcategory: "bottles",
    isFeatured: false,
    isNew: false,
    isOnSale: false,
    rating: 4.4,
    reviewCount: 43,
    tags: ["bottle", "insulated", "hydration"],
    translations: {
      en: {
        name: "JSK Water Bottle",
        description:
          "Insulated water bottle with JSK logo, perfect for gaming sessions",
      },
      fr: {
        name: "Bouteille d'Eau JSK",
        description:
          "Bouteille d'eau isolée avec logo JSK, parfaite pour les sessions gaming",
      },
      ar: {
        name: "زجاجة ماء JSK",
        description: "زجاجة ماء معزولة مع شعار JSK، مثالية لجلسات الألعاب",
      },
    },
  },
  {
    id: "6",
    name: "JSK Championship Cap",
    description: "Adjustable cap celebrating JSK's championship victories",
    price: 34.99,
    stock: 40,
    images: ["/jsk-championship-cap-black-green-adjustable.jpg"],
    variants: {
      colors: ["Black", "Green"],
    },
    category: "clothing",
    subcategory: "caps",
    isFeatured: false,
    isNew: false,
    isOnSale: false,
    rating: 4.5,
    reviewCount: 78,
    tags: ["cap", "championship", "adjustable"],
    translations: {
      en: {
        name: "JSK Championship Cap",
        description: "Adjustable cap celebrating JSK's championship victories",
      },
      fr: {
        name: "Casquette Championnat JSK",
        description:
          "Casquette ajustable célébrant les victoires de championnat de JSK",
      },
      ar: {
        name: "قبعة بطولة JSK",
        description: "قبعة قابلة للتعديل تحتفل بانتصارات بطولة JSK",
      },
    },
  },
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

export const priceRanges = [
  { min: 0, max: 25, label: "Under $25" },
  { min: 25, max: 50, label: "$25 - $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: Number.POSITIVE_INFINITY, label: "Over $200" },
];
