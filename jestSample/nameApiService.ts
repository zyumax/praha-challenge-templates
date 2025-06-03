import axios from "axios";

interface ApiClient {
  get(): Promise<string>;
}

type NameResponse = {
  first_name: string;
};

export class FirstNameApiClient implements ApiClient {
  public async get(): Promise<string> {
    const url = "https://random-data-api.com/api/name/random_name";
    const response = await axios.get<NameResponse>(url);
    return response.data.first_name;
  }
}

export class NameApiService {

  private MAX_LENGTH = 4;
  private apiClient: ApiClient;

  public constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  public async getFirstName(): Promise<string> {
    const firstName = await this.apiClient.get();

    if (firstName.length > this.MAX_LENGTH) {
      throw new Error("firstName is too long!");
    }

    return firstName;
  }
}


// 変更前データ
// export class NameApiService {
//   private MAX_LENGTH = 4;
//   public constructor() {}

//   public async getFirstName(): Promise<string> {
//     const { data } = await axios.get(
//       "https://random-data-api.com/api/name/random_name"
//     );
//     const firstName = data.first_name as string;

//     if (firstName.length > this.MAX_LENGTH) {
//       throw new Error("firstName is too long!");
//     }

//     return firstName;
//   }
// }