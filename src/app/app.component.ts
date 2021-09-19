import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'codility';
  url: string = 'https://angular-user.herokuapp.com/api/json?page=';

  users = [];
  isLoading: boolean = true;
  pageno: number = 1;
  totalPage: number;

  constructor() {
    this.getUser();
  }

  async getUser(page: number = 1) {
    this.isLoading = true;
    const res = await fetch(`${this.url}${page}`);
    const data = await res.json();
    this.totalPage = Math.floor(data.count / 10 + 1);
    console.log(this.totalPage);

    setTimeout(() => {
      this.users = data.user;
      this.setPage(page);
      this.isLoading = false;
    }, 2000);
  }

  onFirst() {
    this.setPage(1);
    this.getUser(this.pageno);
  }
  onLast() {
    this.setPage(this.totalPage);
    this.getUser(this.pageno);
  }
  onNext() {
    this.setPage(Math.min(this.totalPage, this.pageno + 1));
    this.getUser(this.pageno);
  }
  onPrevious() {
    this.setPage(Math.max(1, this.pageno - 1));
    this.getUser(this.pageno);
  }
  setPage(pageno) {
    this.pageno = pageno;
  }
}
