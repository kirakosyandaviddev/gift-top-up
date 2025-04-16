type PriceHistory = {
  prev: number;
  current: number;
  updatedAt: string;
};

export type Price = {
  id: string;
  photoUrl: string;
  animationUrl: string;
  title: string;
  price: number;
  historyPrice: PriceHistory[];
  createdAt: string;
  updatedAt: string;
};
