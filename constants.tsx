
import { Product, Banner } from './types';

export const BANNERS: Banner[] = [
  { id: 'b1', image: 'https://picsum.photos/seed/b1/1000/400', title: 'New Arrivals' },
  { id: 'b2', image: 'https://picsum.photos/seed/b2/1000/400', title: 'Summer Sale' },
  { id: 'b3', image: 'https://picsum.photos/seed/b3/1000/400', title: 'Special Offers' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic White Sneakers',
    price: 850000,
    discountPrice: 650000,
    image: 'https://picsum.photos/seed/p1/400/400',
    description: 'Comfortable and stylish sneakers for everyday wear. Made with premium materials.',
    category: 'Footwear',
    variants: {
      colors: ['White', 'Light Grey'],
      sizes: ['39', '40', '41', '42']
    }
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Watch',
    price: 1200000,
    discountPrice: 890000,
    image: 'https://picsum.photos/seed/p2/400/400',
    description: 'Elegant watch with a genuine leather strap and minimalist dial design.',
    category: 'Accessories',
    variants: {
      colors: ['Black', 'Brown'],
      sizes: ['One Size']
    }
  },
  {
    id: 'p3',
    name: 'Wireless Noise Canceling Headphones',
    price: 2500000,
    image: 'https://picsum.photos/seed/p3/400/400',
    description: 'Experience pure sound without distractions. Bluetooth 5.0 with 30h battery life.',
    category: 'Electronics',
    variants: {
      colors: ['Midnight Blue', 'Stealth Black'],
      sizes: ['Default']
    }
  },
  {
    id: 'p4',
    name: 'Casual Cotton Hoodie',
    price: 450000,
    discountPrice: 320000,
    image: 'https://picsum.photos/seed/p4/400/400',
    description: 'Soft cotton blend hoodie perfect for chilly evenings.',
    category: 'Apparel',
    variants: {
      colors: ['Navy', 'Grey', 'Black'],
      sizes: ['S', 'M', 'L', 'XL']
    }
  },
  {
    id: 'p5',
    name: 'Smart Fitness Tracker',
    price: 550000,
    image: 'https://picsum.photos/seed/p5/400/400',
    description: 'Monitor your health and track your workouts seamlessly.',
    category: 'Electronics',
    variants: {
      colors: ['Black', 'Rose Gold'],
      sizes: ['Standard']
    }
  },
  {
    id: 'p6',
    name: 'Oxford Button-Down Shirt',
    price: 399000,
    image: 'https://picsum.photos/seed/p6/400/400',
    description: 'A timeless classic for a smart casual look.',
    category: 'Apparel',
    variants: {
      colors: ['Light Blue', 'White'],
      sizes: ['M', 'L', 'XL']
    }
  }
];
