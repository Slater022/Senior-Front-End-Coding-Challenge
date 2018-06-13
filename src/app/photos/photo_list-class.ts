import {Photo} from "./photo-class";

export class Photo_List {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: Array<Photo>;
}
