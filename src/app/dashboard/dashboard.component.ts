import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {PhotoService} from "@app/photos/photo.service";
import {Photo_List} from "@app/photos/photo_list-class";
import {environment} from "@env/environment";

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.template.html'
})

export class DashboardComponent implements OnInit {
  is_updating: boolean = false;
  searchValue: string;
  photos_list: Photo_List;
  photo_url_serv: string;
  private photoServ: PhotoService;

  constructor(photoService: PhotoService, public el: ElementRef) {
    this.photoServ = photoService;
    this.photo_url_serv = environment.photo_url;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = document.getElementById("website").offsetHeight - 720;
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > componentPosition && !this.is_updating) {
      this.is_updating = true;
      if (this.searchValue) {
        this.loadMore();
      }
      else {
        this.loadMoreRecent();
      }
    }
  }

  ngOnInit(): void {
    this.updateSite();
  }

  public updateSite(): void {
    if (this.searchValue) {
      this.getPhotos();
    } else {
      this.getPhotosRecent();
    }
  }

  public getPhotos(): void {
    this.photoServ.getSearchResult(this.searchValue).subscribe(data => {
      this.photos_list = data.photos;
    });
  }

  public getPhotosRecent(): void {
    this.photoServ.getInitialResults().subscribe(data => {
      this.photos_list = data.photos;
    });
  }

  public loadMore(): void {
    this.photoServ.getMoreSearchResult(this.searchValue, this.photos_list.page + 1).subscribe(data => {
      this.photos_list.photo = [...this.photos_list.photo, ...data.photos.photo];
      this.photos_list.page = data.photos.page;
      this.endOfUpdate();
    });
  }

  public loadMoreRecent(): void {
    this.photoServ.getInitialResultsMore(this.photos_list.page + 1).subscribe(data => {
      //spread operator \o/
      this.photos_list.photo = [...this.photos_list.photo, ...data.photos.photo];
      this.photos_list.page = data.photos.page;
      this.endOfUpdate();
    });
  }

  public endOfUpdate() {
    this.is_updating = false;
  }

}
