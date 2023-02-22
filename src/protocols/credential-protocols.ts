export type Credentials = {
  id?: number;
  title: string;
  url: string;
  username: string;
  password: string;
  userId: number;
};

export type Credential = Omit<Credentials, "id">;

export type Credent = {
  id?: number;
  userId: number;
};
