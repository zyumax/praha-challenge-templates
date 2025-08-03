import axios from 'axios';
import {
  getPrefecture,
  getRegionGroup,
  getRegionMessage
} from '../jest4/jest4_1/prefecture'

describe('getPrefecture', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('正常系', () => {
    test('1件のデータを取得し、都道府県名を返す', async () => {
      // Arrange
      const response = {
        data: {
          results: [
            {
              address1: '高知県',
            }
          ],
          status: 200
        }
      };
      mockedAxios.get.mockResolvedValue(response);

      // Act
      const prefecture = await getPrefecture('7830060');

      // Assert
      expect(prefecture).toBe('高知県');
      expect(mockedAxios.get).toHaveBeenCalledWith('https://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060');
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    test('異なる都道府県のデータが取得された場合、最初の都道府県名を返す', async () => {
      // Arrange
      const response = {
        data: {
          results: [
            {
              address1: '愛知県',
            },
            {
              address1: '三重県',
            }
          ],
          status: 200
        }
      };
      mockedAxios.get.mockResolvedValue(response);

      // Act
      const prefecture = await getPrefecture('4980000');

      // Assert
      expect(prefecture).toBe('愛知県');
      expect(mockedAxios.get).toHaveBeenCalledWith('https://zipcloud.ibsnet.co.jp/api/search?zipcode=4980000');
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    test('ハイフン付きの郵便番号でもデータを取得できる', async () => {
      // Arrange
      const response = {
        data: {
          results: [
            {
              address1: '高知県',
            }
          ],
          status: 200
        }
      };
      mockedAxios.get.mockResolvedValue(response);

      // Act
      const prefecture = await getPrefecture('783-0060');

      // Assert
      expect(prefecture).toBe('高知県');
      expect(mockedAxios.get).toHaveBeenCalledWith('https://zipcloud.ibsnet.co.jp/api/search?zipcode=783-0060');
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('異常系', () => {
    test('該当するデータが存在しない', async () => {
      // Arrange
      const response = {
        data: {
          results: null,
          status: 200
        }
      };
      mockedAxios.get.mockResolvedValue(response);

      // Act, Assert
      await expect(getPrefecture('0000000')).rejects.toThrow(
        '住所が見つかりませんでした。'
      );
    });

    test('郵便番号の形式が正しくない', async () => {
      // Arrange
      const response = {
        data: {
          results: null,
          status: 400
        }
      };
      mockedAxios.get.mockResolvedValue(response);

      // Act, Assert
      await expect(getPrefecture('12345678')).rejects.toThrow( // 7桁でない番号
        '住所が見つかりませんでした。'
      );
    });

    test('API内部のエラー', async () => {
      // Arrange
      const response = {
        data: {
          results: null,
          status: 500
        }
      };
      mockedAxios.get.mockResolvedValue(response);

      // Act, Assert
      await expect(getPrefecture('7830060')).rejects.toThrow(
        '住所が見つかりませんでした。'
      );
    });
  });
});

describe('getRegionGroup', () => {
  describe('正常系', () => {
    test('都道府県に対応する地方を返す', () => {
      expect(getRegionGroup('東京都')).toBe('KANTO');
    });
  });

  describe('異常系', () => {
    test('対応する都道府県が存在しない場合、例外が発生する', () => {
      expect(() => getRegionGroup('存在しない都道府県')).toThrow(
        '都道府県「存在しない都道府県」に対応する地方が見つかりません。'
      );
    });
  });
});
