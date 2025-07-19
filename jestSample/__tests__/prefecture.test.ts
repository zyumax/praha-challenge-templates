import axios from "axios";
import {
  getPrefecture,
  getRegionGroup,
  getRegionMessage,
  ZipCloudResponse,
} from "../jest4/jest4_1/prefecture";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const buildResponse = (
  data: ZipCloudResponse["results"] | null,
  status: number = 200
) => ({
  data: { status, message: null, results: data } as ZipCloudResponse,
  statusText: "OK",
  headers: {},
  config: {},
  status: 200,
});

describe("getPrefecture", () => {
  afterEach(() => jest.resetAllMocks());

  describe("正常系", () => {
    it("郵便番号に対応する都道府県名を返す", async () => {
      // -- mock --
      mockedAxios.get.mockResolvedValueOnce(
        buildResponse([{ address1: "東京都" }])
      );

      // -- call --
      const res = await getPrefecture("1000001");

      // -- expect --
      expect(res).toBe("東京都");
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://zipcloud.ibsnet.co.jp/api/search?zipcode=1000001"
      );
    });
  });

  describe("異常系", () => {
    it("status が 200 以外ならエラー", async () => {
      // -- mock --
      mockedAxios.get.mockResolvedValueOnce(buildResponse(null, 400));

      // -- call & expect --
      await expect(getPrefecture("0000000")).rejects.toThrow(
        "住所が見つかりませんでした。"
      );
    });

    it("results が null ならエラー", async () => {
      // -- mock --
      mockedAxios.get.mockResolvedValueOnce(buildResponse(null));

      // -- call & expect --
      await expect(getPrefecture("0000000")).rejects.toThrow(
        "住所が見つかりませんでした。"
      );
    });
  });
});

describe("getRegionGroup", () => {
  describe("正常系", () => {
    it("都道府県を地方にマッピングして返す", () => {
      // -- call --
      const region = getRegionGroup("大阪府");

      // -- expect --
      expect(region).toBe("KINKI");
    });
  });

  describe("異常系", () => {
    it("該当する地方が無ければエラー", () => {
      // -- call & expect --
      expect(() => getRegionGroup("存在しない県")).toThrow(
        "都道府県「存在しない県」に対応する地方が見つかりません。"
      );
    });
  });
});

describe("getRegionMessage", () => {
  afterEach(() => jest.resetAllMocks());

  describe("正常系", () => {
    it("郵便番号から地方メッセージを返す", async () => {
      // -- mock --
      mockedAxios.get.mockResolvedValueOnce(
        buildResponse([{ address1: "神奈川県" }])
      );

      // -- call --
      const msg = await getRegionMessage("5300001");

      // -- expect --
      expect(msg).toBe("神奈川県 は KANTO です");
    });
  });

  describe("異常系", () => {
    it("getPrefecture が失敗したらエラーを返す", async () => {
      // -- mock --
      mockedAxios.get.mockResolvedValueOnce(buildResponse(null, 400));

      // -- call & expect --
      await expect(getRegionMessage("0000000")).rejects.toThrow(
        "住所が見つかりませんでした。"
      );
    });
  });
});
