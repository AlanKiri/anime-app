import axios from "axios";

const $api = axios.create({
  baseURL: "https://api.waifu.im/",
});

export default $api;
