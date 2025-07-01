import { REGION_GROUPS, RegionGroup } from './region';
import axios from "axios";

type ZipCloudResponse = {
  status: number;
  message: string | null;
  results: {
    address1: string;
  }[];
};

// APIで都道府県を取得する
async function getPrefecture(postalCode: string): Promise<string> {
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`;
  const response = await axios.get<ZipCloudResponse>(url);
  if (response.data.status !== 200 || !response.data.results?.[0]) {
    throw new Error("住所が見つかりませんでした。");
  }

  return response.data.results[0].address1;
}

// 都道府県から地方を取得する
function getRegionGroup(prefecture: string): RegionGroup {
  const foundRegion = (Object.entries(REGION_GROUPS) as [RegionGroup, readonly string[]][])
    .find(([region, prefectures]) => prefectures.includes(prefecture));

  if (!foundRegion) {
    throw new Error(`都道府県「${prefecture}」に対応する地方が見つかりません。`);
  }

  return foundRegion[0];
}

// 地方情報のメッセージを返す
async function getRegionMessage(postalCode: string): Promise<string> {
  const prefecture = await getPrefecture(postalCode);
  const region = getRegionGroup(prefecture);
  
  return `${prefecture} は ${region} です`;
}

// 使用例
getRegionMessage("1000001");
