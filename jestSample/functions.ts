import { DatabaseMock } from "./util";

export const sumOfArray = (numbers: number[]): number => {
  // 初期値に0を追加
  return numbers.reduce((a: number, b: number): number => a + b, 0);
  // return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  database: DatabaseMock
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};


interface INameApiService {
  getFirstName: () => string;
}

export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiService: INameApiService
): Promise<string> => {
  const firstName = await nameApiService.getFirstName();
  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
