import { NameApiService } from "../nameApiService";
import axios from "axios";
import { FirstNameApiClient } from "../nameApiService";

const firstNameMock = {
    get: jest.fn()
}

test('4文字の名前を取得して返す', async () => {
    firstNameMock.get.mockResolvedValue('test');
    const service = new NameApiService(firstNameMock);

    const result = await service.getFirstName();
    expect(result).toBe('test');

    expect(firstNameMock.get).toHaveBeenCalledTimes(1);
});

test('指定文字以上の名前でエラーを返す', async () => {
    firstNameMock.get.mockClear();
    firstNameMock.get.mockResolvedValue('testtest');
    const service = new NameApiService(firstNameMock);

    await expect(service.getFirstName()).rejects.toThrow("firstName is too long!");
    expect(firstNameMock.get).toHaveBeenCalledTimes(1);
});

// apiの呼び出しテストをする
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("APIの名前呼び出しテスト", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { first_name: "Test" }
    });

    const client = new FirstNameApiClient();
    const result = await client.get();

    expect(result).toBe("Test");
    expect(mockedAxios.get).toHaveBeenCalledWith("https://random-data-api.com/api/name/random_name");
});