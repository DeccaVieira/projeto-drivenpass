export type Networks = {
  id?: number;
  title: string;
  network: string;
  password: string;
  userId: number;
};

export type Network = Omit<Networks, "id">;