import { makeAutoObservable } from "mobx";
import HttpImageClient from "./image.http.client";
import { ImageI } from "../../Interfaces/Requests";

export default class QueryStore {
  images: ImageI[] | undefined = undefined;
  tags: string[] = [];
  isSFW = true;
  isGIF = false;
  isLoading = true;
  isError= false;

  constructor(private ImageService: HttpImageClient) {
    makeAutoObservable(this);
  }

  addTag: (tag: string) => void = (tag: string) => {
    if (this.tags.includes(tag)) {
      let index = this.tags.indexOf(tag);
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    } else {
      this.tags = [...this.tags, tag];
    }
  };

  setIsSFW: (value: boolean) => void = (value: boolean) => {
    this.tags = [];
    this.isSFW = value;
  };

  setIsGIF: (value: boolean) => void = (value: boolean) => {
    this.tags = [];
    this.isGIF = value;
  };

  async getRandomImages() {
    this.images = undefined;
    this.isLoading = true;
    this.isError = false;
    try {
      const data = await this.ImageService.random(this.isSFW, this.isGIF, this.tags);
      this.isLoading = false;
      this.images = data.data.images;
    } catch (error) {
      this.isLoading = false;
      this.isError = false;
      
    }
  }

  async expandRandomImages() {
    this.isLoading = true;
    this.isError = false;
    try {
      const data = await this.ImageService.random(this.isSFW, this.isGIF, this.tags);
      this.isLoading = false;
      if (this.images !== undefined) {
        this.images.push(...data.data.images);
      }
    } catch (error) {
      this.isLoading = false;
      this.isError = false;
    }
  }

 
}
