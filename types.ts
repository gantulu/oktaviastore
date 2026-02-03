
export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  category: string;
  variants: {
    colors: string[];
    sizes: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
}
