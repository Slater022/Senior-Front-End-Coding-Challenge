import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {Photo_Request_Result} from "./photo_result-class";
import {environment} from "@env/environment";

@Injectable()
export class PhotoService {
  private apiUrl: string;
  private photoUrl: string;
  // Pas besoin de se connecter en oauth à leur système pour avoir accès à leur base d'image pubique :)
  private option: string = "&sort=relevance" +
    "&parse_tags=1" +
    "&content_type=7" +
    "&per_page=50" +
    "&api_key=5b78c0287a8ba98f4bc49165f8de99d7" +
    "&format=json" +
    "&nojsoncallback=1";
  private search: string = "";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.api_url;
    this.photoUrl = environment.photo_url;
    // recup de la photo : server/id_secret_c.jpg   --> server / id + _ + secret
  }

  getInitialResults() {
    return this.http.get<Photo_Request_Result>(`${this.apiUrl}${this.option}+
    &method=flickr.photos.getRecent`);
  }

  getInitialResultsMore(page:number) {
    return this.http.get<Photo_Request_Result>(`${this.apiUrl}${this.option}+
    &method=flickr.photos.getRecent&page=${page}`);
  }

  getSearchResult(search: string): Observable<Photo_Request_Result> {
    return this.http.get<Photo_Request_Result>(`${this.apiUrl}&method=flickr.photos.search${this.option}&text=${search}`);
  }

  getMoreSearchResult(search: string, page: number): Observable<Photo_Request_Result> {
    return this.http.get<Photo_Request_Result>(`${this.apiUrl}&method=flickr.photos.search${this.option}&text=${search}&page=${page}`);
  }


}
