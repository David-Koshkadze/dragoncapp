export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export type CityCount = { [key: string]: number };

export interface CityCountStats {
  type: String;
  value: number;
}
