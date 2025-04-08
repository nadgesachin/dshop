export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  stock?: number;
}

export interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}
