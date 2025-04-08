export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  categoryId: string;
  categoryName: string;
  inStock: boolean;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  warranty: string;
  brand: string;
  color: string;
  size?: string;
  weight?: string;
  dimensions?: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones from top brands with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productCount: 25
  },
  {
    id: '2',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Powerful laptops for work, gaming, and creativity',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productCount: 18
  },
  {
    id: '3',
    name: 'Audio',
    slug: 'audio',
    description: 'Premium audio equipment and accessories',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productCount: 32
  },
  {
    id: '4',
    name: 'Smart Home',
    slug: 'smart-home',
    description: 'Smart home devices and automation solutions',
    image: 'https://images.unsplash.com/photo-1558002038-1055e3fdf0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productCount: 15
  },
  {
    id: '5',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential accessories for your devices',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productCount: 45
  },
  {
    id: '6',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Gaming consoles, accessories, and peripherals',
    image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    productCount: 20
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    slug: 'iphone-14-pro-max',
    description: 'The most advanced iPhone with A16 Bionic chip, Dynamic Island, and 48MP camera',
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1678652172431-1880a5c1e86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1678652172431-1880a5c1e86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1678652172431-1880a5c1e86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1678652172431-1880a5c1e86a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    categoryId: '1',
    categoryName: 'Smartphones',
    inStock: true,
    features: [
      '6.7-inch Super Retina XDR display',
      'A16 Bionic chip',
      '48MP camera system',
      'Dynamic Island',
      'Always-On display'
    ],
    specifications: {
      'Display': '6.7-inch Super Retina XDR display',
      'Processor': 'A16 Bionic chip',
      'Storage': '256GB',
      'Camera': '48MP + 12MP + 12MP',
      'Battery': '4323mAh',
      'OS': 'iOS 16'
    },
    warranty: '1 year manufacturer warranty',
    brand: 'Apple',
    color: 'Space Black',
    weight: '240g',
    dimensions: '160.7 x 77.6 x 7.85 mm'
  },
  {
    id: '2',
    name: 'MacBook Pro M2',
    slug: 'macbook-pro-m2',
    description: 'Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency further than ever',
    price: 199999,
    originalPrice: 209999,
    discount: 5,
    rating: 4.9,
    reviewCount: 85,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    categoryId: '2',
    categoryName: 'Laptops',
    inStock: true,
    features: [
      'M2 Pro or M2 Max chip',
      '16-inch Liquid Retina XDR display',
      'Up to 96GB unified memory',
      'Up to 8TB SSD storage',
      'Up to 22 hours battery life'
    ],
    specifications: {
      'Display': '16-inch Liquid Retina XDR display',
      'Processor': 'M2 Pro chip',
      'Memory': '16GB unified memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 22 hours',
      'OS': 'macOS Ventura'
    },
    warranty: '1 year manufacturer warranty',
    brand: 'Apple',
    color: 'Space Gray',
    weight: '2.1kg',
    dimensions: '35.57 x 24.81 x 1.68 cm'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancellation with exceptional sound quality and comfort',
    price: 29990,
    originalPrice: 32990,
    discount: 9,
    rating: 4.9,
    reviewCount: 150,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    categoryId: '3',
    categoryName: 'Audio',
    inStock: true,
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Multi-point connection',
      'Touch controls',
      'Built-in microphone'
    ],
    specifications: {
      'Driver': '30mm dynamic driver',
      'Frequency Response': '4Hz-40kHz',
      'Battery Life': 'Up to 30 hours',
      'Charging Time': '3.5 hours',
      'Weight': '250g',
      'Bluetooth': '5.2'
    },
    warranty: '1 year manufacturer warranty',
    brand: 'Sony',
    color: 'Black',
    weight: '250g'
  },
  {
    id: '4',
    name: 'Google Nest Hub',
    slug: 'google-nest-hub',
    description: 'Smart display with Google Assistant for your smart home',
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    rating: 4.7,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1558002038-1055e3fdf0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055e3fdf0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1558002038-1055e3fdf0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1558002038-1055e3fdf0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    categoryId: '4',
    categoryName: 'Smart Home',
    inStock: true,
    features: [
      '7-inch touchscreen display',
      'Google Assistant built-in',
      'Hands-free control',
      'Streaming entertainment',
      'Smart home control'
    ],
    specifications: {
      'Display': '7-inch touchscreen',
      'Processor': 'ARM Cortex-A35',
      'Memory': '1GB RAM',
      'Storage': '1GB',
      'Connectivity': 'Wi-Fi, Bluetooth',
      'Power': '15W power adapter'
    },
    warranty: '1 year manufacturer warranty',
    brand: 'Google',
    color: 'Chalk',
    weight: '480g',
    dimensions: '18.8 x 11.7 x 7.2 cm'
  },
  {
    id: '5',
    name: 'Apple Watch Series 8',
    slug: 'apple-watch-series-8',
    description: 'Advanced health features, always-on Retina display, and up to 18 hours of battery life',
    price: 45900,
    originalPrice: 49900,
    discount: 8,
    rating: 4.6,
    reviewCount: 75,
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    categoryId: '5',
    categoryName: 'Accessories',
    inStock: true,
    features: [
      'Always-on Retina display',
      'Advanced health features',
      'Crash Detection',
      'Temperature sensing',
      'Water resistant 50m'
    ],
    specifications: {
      'Display': 'Always-on Retina LTPO OLED',
      'Processor': 'S8 SiP',
      'Storage': '32GB',
      'Battery': 'Up to 18 hours',
      'Water Resistance': '50m',
      'OS': 'watchOS 9'
    },
    warranty: '1 year manufacturer warranty',
    brand: 'Apple',
    color: 'Midnight',
    size: '45mm'
  },
  {
    id: '6',
    name: 'PlayStation 5',
    slug: 'playstation-5',
    description: 'Next-gen gaming console with ultra-high speed SSD and 3D audio',
    price: 49990,
    originalPrice: 54990,
    discount: 9,
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    images: [
      'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    categoryId: '6',
    categoryName: 'Gaming',
    inStock: true,
    features: [
      'Ultra-high speed SSD',
      '3D audio',
      '4K gaming',
      'DualSense wireless controller',
      'Backward compatibility'
    ],
    specifications: {
      'CPU': 'AMD Zen 2',
      'GPU': 'AMD RDNA 2',
      'Memory': '16GB GDDR6',
      'Storage': '825GB SSD',
      'Resolution': 'Up to 8K',
      'Frame Rate': 'Up to 120fps'
    },
    warranty: '1 year manufacturer warranty',
    brand: 'Sony',
    color: 'White',
    weight: '4.5kg',
    dimensions: '39 x 10.4 x 26 cm'
  }
];

export const shopDetails = {
  name: 'CSC CENTER SHIV MOBILE',
  address: 'KARCHOND khadkipada DNH&DD Silvassa-396230',
  phone: '9737485262',
  email: 'shivmobile780@gmail.com',
  location: {
    address: 'KARCHOND khadkipada DNH&DD Silvassa-396230',
    googleMapsUrl: 'https://maps.app.goo.gl/B7YkiDgia7Kiqvxk9',
    coordinates: {
      lat: 20.2736,
      lng: 73.0192
    }
  },
  businessHours: {
    weekdays: '10:00 AM - 8:00 PM',
    sunday: '11:00 AM - 6:00 PM'
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/shivmobile',
    facebook: 'https://www.facebook.com/shivmobile',
    whatsapp: 'https://wa.me/919737485262'
  }
}; 