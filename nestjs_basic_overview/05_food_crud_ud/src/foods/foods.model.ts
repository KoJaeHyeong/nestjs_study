export type FoodType = {
  id: string;
  name: string;
  price: number;
  combine: string[];
};

export const Food: FoodType[] = [
  {
    id: "1",
    name: "pizza",
    price: 10000,
    combine: ["cola", "hot_source"],
  },
  {
    id: "2",
    name: "chicken",
    price: 20000,
    combine: ["cola", "pizza"],
  },
  {
    id: "3",
    name: "hamburger",
    price: 3000,
    combine: ["cola", "chicken", "pizza"],
  },
];
