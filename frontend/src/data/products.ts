
export interface Product {
    _id?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    features: string[];
    specifications: Record<string, string>;
    images: {
      public_id: string;
      url: string;
    }[];
    createdAt?: string;
  }

export const productsData: Product[] = [
  {
    _id: "1",
    name: "iPhone 14 Pro Max",
    description: "Apple's flagship smartphone with A16 Bionic chip and 48MP camera.",
    category: "smartphones",
    price: 1299,
    stock: 12,
    features: ["5G", "Face ID", "Super Retina XDR", "Triple Camera"],
    specifications: {
      Brand: "Apple",
      Processor: "A16 Bionic",
      Display: "6.7-inch OLED",
      RAM: "6GB",
      Storage: "256GB",
      Battery: "4323mAh",
      OS: "iOS 16"
    },
    images: [
      {
        public_id: "iphone14pro_max_1",
        url: "https://example.com/images/iphone14pro-max-1.jpg"
      },
      {
        public_id: "iphone14pro_max_2",
        url: "https://example.com/images/iphone14pro-max-2.jpg"
      }
    ],
    createdAt: "2024-10-10"
  },
  {
    _id: "2",
    name: "Samsung Galaxy S23 Ultra",
    description: "Flagship Android with 200MP camera, S Pen, and Snapdragon 8 Gen 2.",
    category: "smartphones",
    price: 1199,
    stock: 8,
    features: ["S Pen", "200MP Camera", "Dynamic AMOLED 2X", "Water Resistant"],
    specifications: {
      Brand: "Samsung",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.8-inch QHD+ AMOLED",
      RAM: "12GB",
      Storage: "512GB",
      Battery: "5000mAh",
      OS: "Android 13"
    },
    images: [
      {
        public_id: "galaxys23_ultra_1",
        url: "https://example.com/images/galaxys23-ultra-1.jpg"
      }
    ],
    createdAt: "2024-10-12"
  },
  {
    _id: "3",
    name: "Google Pixel 8 Pro",
    description: "Clean Android experience with Google Tensor G3 chip and pro camera features.",
    category: "smartphones",
    price: 999,
    stock: 15,
    features: ["Google Tensor G3", "Camera Bar", "Pure Android"],
    specifications: {
      Brand: "Google",
      Processor: "Tensor G3",
      Display: "6.7-inch LTPO OLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "5050mAh",
      OS: "Android 14"
    },
    images: [
      {
        public_id: "pixel8_pro_1",
        url: "https://example.com/images/pixel8-pro-1.jpg"
      }
    ],
    createdAt: "2024-11-01"
  },
  {
    _id: "4",
    name: "OnePlus 12",
    description: "Flagship killer with Snapdragon 8 Gen 3, fast charging, and clean UI.",
    category: "smartphones",
    price: 799,
    stock: 20,
    features: ["Snapdragon 8 Gen 3", "120Hz AMOLED", "SuperVOOC Charging"],
    specifications: {
      Brand: "OnePlus",
      Processor: "Snapdragon 8 Gen 3",
      Display: "6.82-inch AMOLED",
      RAM: "16GB",
      Storage: "512GB",
      Battery: "5400mAh",
      OS: "Android 14 (OxygenOS)"
    },
    images: [
      {
        public_id: "oneplus12_1",
        url: "https://example.com/images/oneplus12-1.jpg"
      }
    ],
    createdAt: "2025-01-05"
  },
  {
    _id: "5",
    name: "Xiaomi 13 Pro",
    description: "Affordable flagship with Leica cameras and ceramic body.",
    category: "smartphones",
    price: 749,
    stock: 18,
    features: ["Leica Cameras", "120W Charging", "Wireless Charging"],
    specifications: {
      Brand: "Xiaomi",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.73-inch AMOLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "4820mAh",
      OS: "MIUI 14 (Android 13)"
    },
    images: [
      {
        public_id: "xiaomi13pro_1",
        url: "https://example.com/images/xiaomi13pro-1.jpg"
      }
    ],
    createdAt: "2024-12-15"
  },
  {
    _id: "6",
    name: "Nothing Phone (2)",
    description: "Innovative design with Glyph interface and Snapdragon 8+ Gen 1.",
    category: "smartphones",
    price: 699,
    stock: 25,
    features: ["Glyph Interface", "Unique Design", "120Hz AMOLED"],
    specifications: {
      Brand: "Nothing",
      Processor: "Snapdragon 8+ Gen 1",
      Display: "6.7-inch OLED",
      RAM: "8GB",
      Storage: "256GB",
      Battery: "4700mAh",
      OS: "Nothing OS 2.0 (Android 13)"
    },
    images: [
      {
        public_id: "nothingphone2_1",
        url: "https://example.com/images/nothingphone2-1.jpg"
      }
    ],
    createdAt: "2024-08-30"
  },
  {
    _id: "7",
    name: "Motorola Edge 40 Pro",
    description: "Flagship Motorola phone with 165Hz OLED and Snapdragon 8 Gen 2.",
    category: "smartphones",
    price: 849,
    stock: 10,
    features: ["165Hz Display", "Snapdragon 8 Gen 2", "TurboPower Charging"],
    specifications: {
      Brand: "Motorola",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.67-inch OLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "4600mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "motorola_edge40pro", url: "https://example.com/images/edge40pro.jpg" }],
    createdAt: "2025-01-18"
  },
  {
    _id: "8",
    name: "ASUS ROG Phone 7 Ultimate",
    description: "Gaming beast with AeroActive cooler and high refresh display.",
    category: "smartphones",
    price: 1099,
    stock: 5,
    features: ["Gaming Trigger", "6000mAh Battery", "165Hz AMOLED"],
    specifications: {
      Brand: "ASUS",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.78-inch AMOLED",
      RAM: "16GB",
      Storage: "512GB",
      Battery: "6000mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "rogphone7", url: "https://example.com/images/rogphone7.jpg" }],
    createdAt: "2025-01-19"
  },
  {
    _id: "9",
    name: "Realme GT 5 Pro",
    description: "Affordable flagship killer with blazing-fast performance.",
    category: "smartphones",
    price: 599,
    stock: 22,
    features: ["144Hz AMOLED", "SuperDart Charge", "Snapdragon 8 Gen 3"],
    specifications: {
      Brand: "Realme",
      Processor: "Snapdragon 8 Gen 3",
      Display: "6.74-inch AMOLED",
      RAM: "16GB",
      Storage: "512GB",
      Battery: "5400mAh",
      OS: "Realme UI 5 (Android 14)"
    },
    images: [{ public_id: "realmegt5pro", url: "https://example.com/images/gt5pro.jpg" }],
    createdAt: "2025-01-20"
  },
  {
    _id: "10",
    name: "Vivo X100 Pro",
    description: "Photography-focused phone with Zeiss optics.",
    category: "smartphones",
    price: 899,
    stock: 13,
    features: ["Zeiss Camera", "Ultra Night Mode", "4K Video"],
    specifications: {
      Brand: "Vivo",
      Processor: "Dimensity 9300",
      Display: "6.78-inch AMOLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "Funtouch OS 14 (Android 14)"
    },
    images: [{ public_id: "vivox100pro", url: "https://example.com/images/x100pro.jpg" }],
    createdAt: "2025-01-21"
  },
  {
    _id: "11",
    name: "iPhone SE 2022",
    description: "Compact iPhone with A15 Bionic chip and Touch ID.",
    category: "smartphones",
    price: 429,
    stock: 30,
    features: ["Compact", "Touch ID", "A15 Bionic"],
    specifications: {
      Brand: "Apple",
      Processor: "A15 Bionic",
      Display: "4.7-inch Retina HD",
      RAM: "4GB",
      Storage: "128GB",
      Battery: "2018mAh",
      OS: "iOS 16"
    },
    images: [{ public_id: "iphonese2022", url: "https://example.com/images/iphonese2022.jpg" }],
    createdAt: "2025-01-22"
  },
  {
    _id: "12",
    name: "Sony Xperia 1 V",
    description: "High-end Sony phone with 4K OLED display and Pro Camera app.",
    category: "smartphones",
    price: 1199,
    stock: 4,
    features: ["4K Display", "Cinematography Pro", "Triple Camera"],
    specifications: {
      Brand: "Sony",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.5-inch 4K OLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "xperia1v", url: "https://example.com/images/xperia1v.jpg" }],
    createdAt: "2025-01-23"
  },
  {
    _id: "13",
    name: "Honor Magic5 Pro",
    description: "Flagship phone with advanced AI photography and curved display.",
    category: "smartphones",
    price: 949,
    stock: 11,
    features: ["AI Camera", "Curved Screen", "120Hz OLED"],
    specifications: {
      Brand: "Honor",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.81-inch OLED",
      RAM: "12GB",
      Storage: "512GB",
      Battery: "5100mAh",
      OS: "Magic UI 7.1 (Android 13)"
    },
    images: [{ public_id: "honormagic5pro", url: "https://example.com/images/magic5pro.jpg" }],
    createdAt: "2025-01-24"
  },
  {
    _id: "14",
    name: "Infinix Zero Ultra",
    description: "Budget flagship with 180W fast charging and 200MP camera.",
    category: "smartphones",
    price: 499,
    stock: 28,
    features: ["180W Charging", "200MP Camera", "Curved Display"],
    specifications: {
      Brand: "Infinix",
      Processor: "MediaTek Dimensity 920",
      Display: "6.8-inch AMOLED",
      RAM: "8GB",
      Storage: "256GB",
      Battery: "4500mAh",
      OS: "XOS 12 (Android 12)"
    },
    images: [{ public_id: "infinixzeroultra", url: "https://example.com/images/zeroultra.jpg" }],
    createdAt: "2025-01-25"
  },
  {
    _id: "15",
    name: "Tecno Phantom V Fold",
    description: "Affordable foldable smartphone with large outer display.",
    category: "smartphones",
    price: 999,
    stock: 9,
    features: ["Foldable Display", "Large Battery", "Dual Screen"],
    specifications: {
      Brand: "Tecno",
      Processor: "Dimensity 9000+",
      Display: "7.85-inch Foldable AMOLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "HiOS 13 Fold (Android 13)"
    },
    images: [{ public_id: "phantomvfold", url: "https://example.com/images/phantomvfold.jpg" }],
    createdAt: "2025-01-26"
  },
  {
    _id: "16",
    name: "iQOO 12",
    description: "Performance-centric phone with Snapdragon 8 Gen 3 and 144Hz display.",
    category: "smartphones",
    price: 699,
    stock: 17,
    features: ["144Hz AMOLED", "Snapdragon 8 Gen 3", "Gaming Features"],
    specifications: {
      Brand: "iQOO",
      Processor: "Snapdragon 8 Gen 3",
      Display: "6.78-inch AMOLED",
      RAM: "16GB",
      Storage: "512GB",
      Battery: "5000mAh",
      OS: "Funtouch OS 14 (Android 14)"
    },
    images: [{ public_id: "iqoo12", url: "https://example.com/images/iqoo12.jpg" }],
    createdAt: "2025-01-27"
  },
  {
    _id: "17",
    name: "Lava Agni 2",
    description: "Mid-range Indian smartphone with 120Hz curved AMOLED display.",
    category: "smartphones",
    price: 249,
    stock: 50,
    features: ["120Hz AMOLED", "Glass Back", "Stock Android"],
    specifications: {
      Brand: "Lava",
      Processor: "Dimensity 7050",
      Display: "6.5-inch AMOLED",
      RAM: "8GB",
      Storage: "128GB",
      Battery: "4700mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "lavaagni2", url: "https://example.com/images/lavaagni2.jpg" }],
    createdAt: "2025-01-28"
  },
  {
    _id: "18",
    name: "Redmi Note 13 Pro+",
    description: "Feature-packed midrange phone with 200MP camera and fast charging.",
    category: "smartphones",
    price: 379,
    stock: 40,
    features: ["200MP Camera", "Curved Display", "120W Fast Charging"],
    specifications: {
      Brand: "Redmi",
      Processor: "Dimensity 7200 Ultra",
      Display: "6.67-inch AMOLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "MIUI 14 (Android 13)"
    },
    images: [{ public_id: "note13proplus", url: "https://example.com/images/note13proplus.jpg" }],
    createdAt: "2025-01-29"
  },
  {
    _id: "19",
    name: "Poco F6 Pro",
    description: "Affordable gaming phone with top-tier specs.",
    category: "smartphones",
    price: 499,
    stock: 27,
    features: ["Snapdragon 8 Gen 2", "120Hz AMOLED", "Gaming Mode"],
    specifications: {
      Brand: "Poco",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.67-inch AMOLED",
      RAM: "12GB",
      Storage: "512GB",
      Battery: "5000mAh",
      OS: "MIUI 14 (Android 13)"
    },
    images: [{ public_id: "pocof6pro", url: "https://example.com/images/pocof6pro.jpg" }],
    createdAt: "2025-01-30"
  },
  {
    _id: "20",
    name: "Meizu 21",
    description: "Elegant design with flagship specs and Flyme OS.",
    category: "smartphones",
    price: 599,
    stock: 14,
    features: ["Flat Display", "Flyme OS", "Clean UI"],
    specifications: {
      Brand: "Meizu",
      Processor: "Snapdragon 8 Gen 3",
      Display: "6.55-inch AMOLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "4800mAh",
      OS: "Flyme 10 (Android 13)"
    },
    images: [{ public_id: "meizu21", url: "https://example.com/images/meizu21.jpg" }],
    createdAt: "2025-01-31"
  },
  {
    _id: "21",
    name: "ZTE Nubia Z50 Ultra",
    description: "Gaming-focused phone with under-display selfie cam.",
    category: "smartphones",
    price: 699,
    stock: 16,
    features: ["No Notch", "Gaming Mode", "Under-Display Camera"],
    specifications: {
      Brand: "ZTE",
      Processor: "Snapdragon 8 Gen 2",
      Display: "6.8-inch AMOLED",
      RAM: "12GB",
      Storage: "512GB",
      Battery: "5000mAh",
      OS: "MyOS 13 (Android 13)"
    },
    images: [{ public_id: "nubiaz50ultra", url: "https://example.com/images/z50ultra.jpg" }],
    createdAt: "2025-02-01"
  },
  {
    _id: "22",
    name: "Fairphone 5",
    description: "Ethical smartphone with modular parts and long support.",
    category: "smartphones",
    price: 699,
    stock: 10,
    features: ["Modular Design", "5 Years Updates", "Eco-Friendly"],
    specifications: {
      Brand: "Fairphone",
      Processor: "Snapdragon 782G",
      Display: "6.46-inch OLED",
      RAM: "8GB",
      Storage: "256GB",
      Battery: "4200mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "fairphone5", url: "https://example.com/images/fairphone5.jpg" }],
    createdAt: "2025-02-02"
  },
  {
    _id: "23",
    name: "Lenovo Legion Duel 2",
    description: "Extreme gaming phone with dual fans and pop-up camera.",
    category: "smartphones",
    price: 799,
    stock: 6,
    features: ["Gaming Design", "Pop-Up Camera", "144Hz Display"],
    specifications: {
      Brand: "Lenovo",
      Processor: "Snapdragon 888",
      Display: "6.92-inch AMOLED",
      RAM: "16GB",
      Storage: "512GB",
      Battery: "5500mAh",
      OS: "Legion OS (Android 12)"
    },
    images: [{ public_id: "legionduel2", url: "https://example.com/images/legionduel2.jpg" }],
    createdAt: "2025-02-03"
  },
  {
    _id: "24",
    name: "TCL 40 NXTPAPER 5G",
    description: "Budget 5G phone with paper-like screen experience.",
    category: "smartphones",
    price: 249,
    stock: 21,
    features: ["NXTPAPER Display", "5G", "Eye Care"],
    specifications: {
      Brand: "TCL",
      Processor: "Dimensity 6020",
      Display: "6.6-inch LCD",
      RAM: "6GB",
      Storage: "256GB",
      Battery: "5010mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "nxpaper5g", url: "https://example.com/images/nxpaper5g.jpg" }],
    createdAt: "2025-02-04"
  },
  {
    _id: "25",
    name: "HTC U23 Pro",
    description: "HTC's comeback smartphone with great display and audio.",
    category: "smartphones",
    price: 499,
    stock: 12,
    features: ["Hi-Res Audio", "90Hz OLED", "5G"],
    specifications: {
      Brand: "HTC",
      Processor: "Snapdragon 7 Gen 1",
      Display: "6.7-inch OLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "4600mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "htcu23pro", url: "https://example.com/images/htcu23pro.jpg" }],
    createdAt: "2025-02-05"
  },
  {
    _id: "26",
    name: "Micromax IN Note 3",
    description: "Budget Indian smartphone with clean Android and fast charging.",
    category: "smartphones",
    price: 189,
    stock: 34,
    features: ["Stock Android", "Fast Charging", "FHD+ Display"],
    specifications: {
      Brand: "Micromax",
      Processor: "Helio G85",
      Display: "6.5-inch LCD",
      RAM: "6GB",
      Storage: "128GB",
      Battery: "5000mAh",
      OS: "Android 12"
    },
    images: [{ public_id: "micromaxnote3", url: "https://example.com/images/inote3.jpg" }],
    createdAt: "2025-02-06"
  },
  {
    _id: "26",
    name: "Lava Agni 2 5G",
    description: "Indian brand offering a clean UI and smooth performance.",
    category: "smartphones",
    price: 249,
    stock: 34,
    features: ["Pure Android", "120Hz AMOLED", "Dimensity 7050"],
    specifications: {
      Brand: "Lava",
      Processor: "Dimensity 7050",
      Display: "6.5-inch AMOLED",
      RAM: "8GB",
      Storage: "128GB",
      Battery: "4700mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "lavaagni2", url: "https://example.com/images/lavaagni2.jpg" }],
    createdAt: "2025-01-27"
  },
  {
    _id: "27",
    name: "Micromax IN Note 2",
    description: "Budget smartphone from an Indian OEM with AMOLED display.",
    category: "smartphones",
    price: 179,
    stock: 40,
    features: ["Stock Android", "AMOLED", "Fast Charging"],
    specifications: {
      Brand: "Micromax",
      Processor: "MediaTek Helio G95",
      Display: "6.43-inch AMOLED",
      RAM: "6GB",
      Storage: "64GB",
      Battery: "5000mAh",
      OS: "Android 11"
    },
    images: [{ public_id: "micromaxinnote2", url: "https://example.com/images/innote2.jpg" }],
    createdAt: "2025-01-28"
  },
  {
    _id: "28",
    name: "HTC U23 Pro",
    description: "Comeback flagship from HTC with clean UI and high-res camera.",
    category: "smartphones",
    price: 649,
    stock: 14,
    features: ["108MP Camera", "120Hz OLED", "IP67 Rated"],
    specifications: {
      Brand: "HTC",
      Processor: "Snapdragon 7 Gen 1",
      Display: "6.7-inch OLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "4600mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "htcu23pro", url: "https://example.com/images/htcu23pro.jpg" }],
    createdAt: "2025-01-29"
  },
  {
    _id: "29",
    name: "Fairphone 5",
    description: "Ethical smartphone with modular design and long software support.",
    category: "smartphones",
    price: 799,
    stock: 6,
    features: ["Repairable", "Modular", "Eco-Friendly"],
    specifications: {
      Brand: "Fairphone",
      Processor: "Qualcomm QCM6490",
      Display: "6.46-inch OLED",
      RAM: "8GB",
      Storage: "256GB",
      Battery: "4200mAh",
      OS: "Android 13 (7-year support)"
    },
    images: [{ public_id: "fairphone5", url: "https://example.com/images/fairphone5.jpg" }],
    createdAt: "2025-01-30"
  },
  {
    _id: "30",
    name: "Redmi Note 13 Pro+",
    description: "Premium midrange device with curved AMOLED and 200MP camera.",
    category: "smartphones",
    price: 349,
    stock: 25,
    features: ["Curved Display", "200MP Camera", "67W Fast Charging"],
    specifications: {
      Brand: "Xiaomi",
      Processor: "Dimensity 7200 Ultra",
      Display: "6.67-inch AMOLED",
      RAM: "8GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "MIUI 14 (Android 13)"
    },
    images: [{ public_id: "redminote13proplus", url: "https://example.com/images/redminote13proplus.jpg" }],
    createdAt: "2025-01-31"
  },
  {
    _id: "31",
    name: "Infinix GT 10 Pro",
    description: "Gaming-centric budget phone with a unique design.",
    category: "smartphones",
    price: 229,
    stock: 37,
    features: ["Cyberpunk Design", "Gaming Mode", "120Hz AMOLED"],
    specifications: {
      Brand: "Infinix",
      Processor: "Dimensity 8050",
      Display: "6.67-inch AMOLED",
      RAM: "8GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "XOS 13 (Android 13)"
    },
    images: [{ public_id: "infinixgt10pro", url: "https://example.com/images/gt10pro.jpg" }],
    createdAt: "2025-02-01"
  },
  {
    _id: "32",
    name: "Itel P55 5G",
    description: "Entry-level 5G smartphone from Itel for first-time users.",
    category: "smartphones",
    price: 149,
    stock: 45,
    features: ["5G", "Stock Android", "Affordable"],
    specifications: {
      Brand: "Itel",
      Processor: "Dimensity 6080",
      Display: "6.6-inch LCD",
      RAM: "6GB",
      Storage: "128GB",
      Battery: "5000mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "itelp55", url: "https://example.com/images/itelp55.jpg" }],
    createdAt: "2025-02-02"
  },
  {
    _id: "33",
    name: "Nokia X30 5G",
    description: "Sustainable phone with aluminum frame and AMOLED screen.",
    category: "smartphones",
    price: 499,
    stock: 18,
    features: ["Eco-Friendly Build", "Pure Android", "OIS Camera"],
    specifications: {
      Brand: "Nokia",
      Processor: "Snapdragon 695",
      Display: "6.43-inch AMOLED",
      RAM: "8GB",
      Storage: "128GB",
      Battery: "4200mAh",
      OS: "Android 12 (3 years update)"
    },
    images: [{ public_id: "nokiax30", url: "https://example.com/images/nokiax30.jpg" }],
    createdAt: "2025-02-03"
  },
  {
    _id: "34",
    name: "POCO X6 Pro",
    description: "Balanced smartphone for gamers and casual users alike.",
    category: "smartphones",
    price: 329,
    stock: 29,
    features: ["Dimensity 8300 Ultra", "120Hz AMOLED", "Turbo Charging"],
    specifications: {
      Brand: "POCO",
      Processor: "Dimensity 8300 Ultra",
      Display: "6.67-inch AMOLED",
      RAM: "12GB",
      Storage: "256GB",
      Battery: "5000mAh",
      OS: "HyperOS (Android 14)"
    },
    images: [{ public_id: "pocox6pro", url: "https://example.com/images/pocox6pro.jpg" }],
    createdAt: "2025-02-04"
  },
  {
    _id: "35",
    name: "Samsung Galaxy A55 5G",
    description: "Mid-range device with flagship build quality and AMOLED display.",
    category: "smartphones",
    price: 449,
    stock: 21,
    features: ["Gorilla Glass Victus", "Exynos 1480", "One UI 6"],
    specifications: {
      Brand: "Samsung",
      Processor: "Exynos 1480",
      Display: "6.6-inch AMOLED",
      RAM: "8GB",
      Storage: "128GB",
      Battery: "5000mAh",
      OS: "Android 14"
    },
    images: [{ public_id: "galaxya55", url: "https://example.com/images/galaxya55.jpg" }],
    createdAt: "2025-02-05"
  },
  {
    _id: "36",
    name: "Google Pixel 6a",
    description: "Compact and powerful with excellent photography performance.",
    category: "smartphones",
    price: 349,
    stock: 26,
    features: ["Tensor Chip", "Pixel Camera", "Compact Design"],
    specifications: {
      Brand: "Google",
      Processor: "Google Tensor",
      Display: "6.1-inch OLED",
      RAM: "6GB",
      Storage: "128GB",
      Battery: "4410mAh",
      OS: "Android 13"
    },
    images: [{ public_id: "pixel6a", url: "https://example.com/images/pixel6a.jpg" }],
    createdAt: "2025-02-06"
  },
  {
    _id: "26",
    name: "Sony WH-1000XM5",
    description: "Premium over-ear headphones with industry-leading noise cancellation.",
    category: "headphones",
    price: 399,
    stock: 20,
    features: ["Active Noise Cancellation", "Bluetooth 5.2", "30-hour Battery Life"],
    specifications: {
      Brand: "Sony",
      Type: "Over-Ear",
      Connectivity: "Wireless",
      BatteryLife: "30 hours",
      NoiseCancellation: "Yes",
      Weight: "250g",
      Color: "Black"
    },
    images: [
      {
        public_id: "sony_wh1000xm5",
        url: "https://example.com/images/sony_wh1000xm5.jpg"
      }
    ],
    createdAt: "2025-04-01"
  },
  {
    _id: "27",
    name: "Bose QuietComfort Ultra Earbuds",
    description: "High-fidelity wireless earbuds with world-class noise cancellation.",
    category: "wireless-earbuds",
    price: 299,
    stock: 15,
    features: ["Spatialized Audio", "Bluetooth Multipoint", "Personalized Sound"],
    specifications: {
      Brand: "Bose",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "24 hours",
      NoiseCancellation: "Yes",
      Weight: "60g",
      Color: "White"
    },
    images: [
      {
        public_id: "bose_qc_ultra",
        url: "https://example.com/images/bose_qc_ultra.jpg"
      }
    ],
    createdAt: "2025-04-02"
  },
  {
    _id: "28",
    name: "Apple AirPods Pro (2nd Gen)",
    description: "Advanced wireless earbuds with adaptive transparency and spatial audio.",
    category: "wireless-earbuds",
    price: 249,
    stock: 30,
    features: ["Adaptive Transparency", "Spatial Audio", "MagSafe Charging Case"],
    specifications: {
      Brand: "Apple",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "30 hours",
      NoiseCancellation: "Yes",
      Weight: "50g",
      Color: "White"
    },
    images: [
      {
        public_id: "apple_airpods_pro_2",
        url: "https://example.com/images/apple_airpods_pro_2.jpg"
      }
    ],
    createdAt: "2025-04-03"
  },
  {
    _id: "29",
    name: "Samsung Galaxy Buds2 Pro",
    description: "Compact earbuds offering immersive sound and intelligent ANC.",
    category: "wireless-earbuds",
    price: 229,
    stock: 25,
    features: ["Intelligent ANC", "Hi-Fi Sound", "Comfort Fit"],
    specifications: {
      Brand: "Samsung",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "18 hours",
      NoiseCancellation: "Yes",
      Weight: "45g",
      Color: "Graphite"
    },
    images: [
      {
        public_id: "samsung_buds2_pro",
        url: "https://example.com/images/samsung_buds2_pro.jpg"
      }
    ],
    createdAt: "2025-04-04"
  },
  {
    _id: "30",
    name: "Jabra Elite 7 Pro",
    description: "Versatile earbuds with adjustable ANC and superior call quality.",
    category: "wireless-earbuds",
    price: 199,
    stock: 18,
    features: ["Adjustable ANC", "MultiSensor Voice", "IP57 Rated"],
    specifications: {
      Brand: "Jabra",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "30 hours",
      NoiseCancellation: "Yes",
      Weight: "52g",
      Color: "Titanium Black"
    },
    images: [
      {
        public_id: "jabra_elite_7_pro",
        url: "https://example.com/images/jabra_elite_7_pro.jpg"
      }
    ],
    createdAt: "2025-04-05"
  },
  {
    _id: "31",
    name: "Anker Soundcore Liberty 4 NC",
    description: "Affordable earbuds with hybrid ANC and customizable sound profiles.",
    category: "wireless-earbuds",
    price: 99,
    stock: 40,
    features: ["Hybrid ANC", "HearID Personalized Sound", "Wireless Charging"],
    specifications: {
      Brand: "Anker",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "32 hours",
      NoiseCancellation: "Yes",
      Weight: "55g",
      Color: "Navy Blue"
    },
    images: [
      {
        public_id: "anker_liberty_4_nc",
        url: "https://example.com/images/anker_liberty_4_nc.jpg"
      }
    ],
    createdAt: "2025-04-06"
  },
  {
    _id: "32",
    name: "Sennheiser Momentum True Wireless 4",
    description: "Premium earbuds delivering exceptional sound quality and comfort.",
    category: "wireless-earbuds",
    price: 279,
    stock: 12,
    features: ["Audiophile Sound", "Transparent Hearing", "Smart Control App"],
    specifications: {
      Brand: "Sennheiser",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "28 hours",
      NoiseCancellation: "Yes",
      Weight: "58g",
      Color: "Black"
    },
    images: [
      {
        public_id: "sennheiser_momentum_tw4",
        url: "https://example.com/images/sennheiser_momentum_tw4.jpg"
      }
    ],
    createdAt: "2025-04-07"
  },
  {
    _id: "33",
    name: "Beats Studio Buds+",
    description: "Stylish earbuds with balanced sound and seamless Apple integration.",
    category: "wireless-earbuds",
    price: 169,
    stock: 22,
    features: ["Active Noise Cancellation", "Transparency Mode", "One-Touch Pairing"],
    specifications: {
      Brand: "Beats",
      Type: "In-Ear",
      Connectivity: "Wireless",
      BatteryLife: "36 hours",
      NoiseCancellation: "Yes",
      Weight: "54g",
      Color: "Transparent"
    },
    images: [
      {
        public_id: "beats_studio_buds_plus",
        url: "https://example.com/images/beats_studio_buds_plus.jpg"
      }
    ],
    createdAt: "2025-04-08"
  },    
];
