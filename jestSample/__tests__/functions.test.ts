// todo: ここに単体テストを書いてみましょう！
// 課題2-1-1
import { sumOfArray } from '../functions';

test('配列の中身を足して2にする', () => {
  expect(sumOfArray([1, 1])).toBe(2);
});

test("空配列の場合は例外を投げる", () => {
  expect(() => sumOfArray([])).toThrow(TypeError);
});

// test('文字列のテスト', () => {
//   expect(sumOfArray(['1', '1'])).toBe(2);
// });

// 課題2-1-2
import { asyncSumOfArray } from '../functions';
test('配列の中身を足して2にする',async () => {
  await expect(asyncSumOfArray([1, 1])).resolves.toBe(2);
});

test('空配列の場合は例外を投げる', () => {
  return expect(() => asyncSumOfArray([])).rejects.toThrow(TypeError);
});

// test('文字列のテスト', () => {
//   return expect(asyncSumOfArray(['1', '2', '3'])).resolves.toBe(6);
// });

// 課題2-2-1
import { asyncSumOfArraySometimesZero } from '../functions';

const databaseMock = {
  save: jest.fn()
}

test('保存成功時', async () => {
  const result = await asyncSumOfArraySometimesZero([1, 1], databaseMock);
  expect(result).toBe(2);
});

test('保存失敗時0を返す', async () => {
  databaseMock.save.mockImplementation(() => {
    throw new Error('error');
  })
  const result = await asyncSumOfArraySometimesZero([1, 1], databaseMock);
  expect(result).toBe(0);
});

// 課題2-2-2
import { getFirstNameThrowIfLong } from '../functions';
const nameApiService = {
  getFirstName: jest.fn()
};

test('ファーストネームを返す', async () => {
  const maxNameLength = 10;
  nameApiService.getFirstName.mockResolvedValue('test');
  const result = await getFirstNameThrowIfLong(maxNameLength, nameApiService);
  expect(result).toBe('test');
});

test('エラーメッセージを返す', async () => {
  const maxNameLength = 3;
  nameApiService.getFirstName.mockResolvedValue('test');
  await expect(getFirstNameThrowIfLong(maxNameLength, nameApiService)).rejects.toThrow("first_name too long");
});
