import { ImageI } from "./../../Interfaces/Requests";
import { AxiosResponse } from "axios";
import $api from "./api";

export default class HttpImageClient {
  async random(isSfw: boolean, isGif: boolean, tags: string[]) {
    let requestString = `/random/?many=true&is_nsfw=${isSfw ? false : true}&gif=${isGif ? true : false}&`;
    for (let i = 0; i < tags.length; i++) {
      requestString += `selected_tags=${tags[i]}&`;
    }
    const data = await $api.get<any>(requestString);
    return data;
  }
}
