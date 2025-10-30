export const products = [
  // T-Shirts
  {
    id: 1,
    name: "Classic Cotton Tee",
    category: "T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop&bg=white"
    ],
    colors: ["Black", "White", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium cotton t-shirt with a relaxed fit. Perfect for everyday wear with a modern, minimalist design.",
    isNew: true,
    isTrending: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Vintage Graphic Tee",
    category: "T-Shirt",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop&bg=white",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white"
    ],
    colors: ["Black", "White", "Red"],
    sizes: ["S", "M", "L", "XL"],
    description: "Retro-inspired graphic t-shirt with vintage vibes. Made from soft, breathable cotton blend.",
    isNew: false,
    isTrending: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Oversized Comfort Tee",
    category: "T-Shirt",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop&bg=white",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white"
    ],
    colors: ["White", "Gray", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Comfortable oversized t-shirt with a relaxed fit. Perfect for layering or wearing alone.",
    isNew: true,
    isTrending: false,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 13,
    name: "Classic White Tee",
    category: "T-Shirt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop&bg=white"
    ],
    colors: ["White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Essential white t-shirt with premium cotton construction. Clean, minimalist design perfect for any wardrobe. The ultimate basic that never goes out of style.",
    isNew: true,
    isTrending: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 14,
    name: "Oversized White Tee",
    category: "T-Shirt",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop&bg=white",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop&bg=white",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&bg=white"
    ],
    colors: ["White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Modern oversized white t-shirt with a relaxed, contemporary fit. Perfect for layering or wearing alone. Made from soft, breathable cotton.",
    isNew: true,
    isTrending: false,
    rating: 4.8,
    reviews: 89
  },

  // Hoodies
  {
    id: 4,
    name: "Premium Zip Hoodie",
    category: "Hoodie",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f0a31?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "Gray", "Navy", "Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "High-quality zip-up hoodie with premium fleece lining. Perfect for cool weather and casual outings.",
    isNew: true,
    isTrending: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 5,
    name: "Pullover Hoodie",
    category: "Hoodie",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "White", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic pullover hoodie with kangaroo pocket. Made from soft, warm fleece material.",
    isNew: false,
    isTrending: true,
    rating: 4.5,
    reviews: 98
  },
  {
    id: 6,
    name: "Cropped Hoodie",
    category: "Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f0a31?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f37f0a31?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
    ],
    colors: ["Pink", "Lavender", "Cream"],
    sizes: ["S", "M", "L"],
    description: "Trendy cropped hoodie perfect for layering. Features a relaxed fit and modern silhouette.",
    isNew: true,
    isTrending: false,
    rating: 4.6,
    reviews: 73
  },

  // Trousers
  {
    id: 7,
    name: "Classic Denim Jeans",
    category: "Trousers",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=600&fit=crop"
    ],
    colors: ["Blue", "Black", "Light Blue"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description: "Premium denim jeans with a classic straight fit. Made from 100% cotton for comfort and durability.",
    isNew: false,
    isTrending: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: 8,
    name: "Wide Leg Trousers",
    category: "Trousers",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "Navy", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    description: "Trendy wide-leg trousers with a relaxed fit. Perfect for both casual and semi-formal occasions.",
    isNew: true,
    isTrending: true,
    rating: 4.8,
    reviews: 87
  },
  {
    id: 9,
    name: "Cargo Pants",
    category: "Trousers",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"
    ],
    colors: ["Olive", "Black", "Khaki"],
    sizes: ["S", "M", "L", "XL"],
    description: "Functional cargo pants with multiple pockets. Made from durable cotton blend for everyday wear.",
    isNew: false,
    isTrending: false,
    rating: 4.4,
    reviews: 45
  },

  // Shoes
  {
    id: 15,
    name: "Korean Style Sneakers",
    category: "Shoes",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop"
    ],
    colors: ["White", "Black", "Navy", "Pink"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    description: "Trendy Korean-style sneakers with modern design and comfortable fit. Perfect for street fashion and casual wear.",
    isNew: true,
    isTrending: true,
    rating: 4.8,
    reviews: 142
  },
  {
    id: 16,
    name: "Chunky Platform Sneakers",
    category: "Shoes",
    price: 95.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"
    ],
    colors: ["White", "Black", "Cream"],
    sizes: ["6", "7", "8", "9", "10"],
    description: "Popular chunky platform sneakers inspired by Korean street fashion. Features bold design and comfortable platform sole.",
    isNew: true,
    isTrending: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 17,
    name: "Minimalist White Sneakers",
    category: "Shoes",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"
    ],
    colors: ["White", "Off-White"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    description: "Clean and minimalist white sneakers perfect for Korean fashion aesthetics. Versatile design that goes with any outfit.",
    isNew: false,
    isTrending: true,
    rating: 4.9,
    reviews: 167
  },
  {
    id: 18,
    name: "Korean Canvas Shoes",
    category: "Shoes",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop"
    ],
    colors: ["White", "Black", "Navy", "Red"],
    sizes: ["6", "7", "8", "9", "10"],
    description: "Classic canvas shoes with Korean street style influence. Lightweight and comfortable for everyday wear.",
    isNew: true,
    isTrending: false,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 19,
    name: "Korean Style Boots",
    category: "Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "Brown", "Tan"],
    sizes: ["6", "7", "8", "9", "10"],
    description: "Stylish Korean-inspired boots perfect for autumn and winter fashion. Features modern design with comfortable fit.",
    isNew: false,
    isTrending: true,
    rating: 4.8,
    reviews: 76
  },
  {
    id: 20,
    name: "Korean Slip-On Sneakers",
    category: "Shoes",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop"
    ],
    colors: ["White", "Black", "Gray", "Pink"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    description: "Convenient slip-on sneakers with Korean fashion styling. Easy to wear and perfect for busy lifestyle.",
    isNew: true,
    isTrending: false,
    rating: 4.5,
    reviews: 54
  },

  // Accessories
  {
    id: 10,
    name: "Designer Cap",
    category: "Accessories",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "White", "Navy", "Red"],
    sizes: ["One Size"],
    description: "Premium baseball cap with embroidered logo. Adjustable fit for all head sizes.",
    isNew: true,
    isTrending: true,
    rating: 4.6,
    reviews: 92
  },
  {
    id: 11,
    name: "Canvas Tote Bag",
    category: "Accessories",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"
    ],
    colors: ["Natural", "Black", "Navy"],
    sizes: ["One Size"],
    description: "Eco-friendly canvas tote bag perfect for daily use. Spacious and durable design.",
    isNew: false,
    isTrending: false,
    rating: 4.5,
    reviews: 67
  },
  {
    id: 12,
    name: "Leather Wallet",
    category: "Accessories",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"
    ],
    colors: ["Brown", "Black", "Tan"],
    sizes: ["One Size"],
    description: "Genuine leather wallet with multiple card slots. Classic design that never goes out of style.",
    isNew: true,
    isTrending: false,
    rating: 4.7,
    reviews: 134
  },
  {
    id: 21,
    name: "Korean Style Hair Clips",
    category: "Accessories",
    price: 19.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"
    ],
    colors: ["Pink", "White", "Black", "Purple"],
    sizes: ["One Size"],
    description: "Cute Korean-style hair clips perfect for adding a touch of K-fashion to any outfit. Set of 6 clips.",
    isNew: true,
    isTrending: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 22,
    name: "Korean Fashion Scarf",
    category: "Accessories",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"
    ],
    colors: ["Cream", "Pink", "Navy", "Black"],
    sizes: ["One Size"],
    description: "Elegant Korean-style scarf made from premium silk blend. Perfect for layering and adding sophistication to any look.",
    isNew: false,
    isTrending: true,
    rating: 4.6,
    reviews: 76
  },
  {
    id: 23,
    name: "Korean Style Phone Case",
    category: "Accessories",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"
    ],
    colors: ["Clear", "Pink", "Black", "Purple"],
    sizes: ["iPhone 14", "iPhone 15", "Samsung Galaxy"],
    description: "Trendy Korean-style phone case with cute designs. Protective and stylish for your mobile device.",
    isNew: true,
    isTrending: false,
    rating: 4.4,
    reviews: 45
  },
  {
    id: 24,
    name: "Korean Fashion Sunglasses",
    category: "Accessories",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "Brown", "Pink", "Clear"],
    sizes: ["One Size"],
    description: "Stylish Korean-inspired sunglasses with UV protection. Perfect for completing your K-fashion look.",
    isNew: true,
    isTrending: true,
    rating: 4.7,
    reviews: 112
  },
  {
    id: 25,
    name: "Korean Style Jewelry Set",
    category: "Accessories",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop"
    ],
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["One Size"],
    description: "Delicate Korean-style jewelry set including earrings and necklace. Minimalist design perfect for everyday wear.",
    isNew: false,
    isTrending: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 26,
    name: "Korean Fashion Belt",
    category: "Accessories",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=600&fit=crop"
    ],
    colors: ["Black", "Brown", "White"],
    sizes: ["S", "M", "L"],
    description: "Versatile Korean-style belt perfect for cinching dresses or adding definition to oversized tops.",
    isNew: true,
    isTrending: false,
    rating: 4.5,
    reviews: 67
  }
];

export const categories = [
  { name: "All", value: "all" },
  { name: "T-Shirt", value: "T-Shirt" },
  { name: "Hoodie", value: "Hoodie" },
  { name: "Trousers", value: "Trousers" },
  { name: "Shoes", value: "Shoes" },
  { name: "Accessories", value: "Accessories" }
];

export const getProductsByCategory = (category) => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isTrending);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};
