export interface ImageI {
  file: string;
  extension: string;
  image_id: string;
  favourites: number;
  source: string;
  uploaded_at: string;
  is_nsfw: boolean;
  width: number;
  height: number;
  url: string;
  preview_url: string;
  tags: [{}];
}
