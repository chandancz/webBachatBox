export type User = {
  id: string;
  name: string;
  email: string;
  age: number | null;
  password: string | null;
};

export type GetUsersDataResponse = {
  getUsersData: {
    data: User[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
};
