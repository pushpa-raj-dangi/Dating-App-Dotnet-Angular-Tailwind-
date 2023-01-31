import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent implements OnInit {
  apiUrl = environment.API_URL;

  constructor(public http: HttpClient) {}

  ngOnInit() {}

  public get404Error() {
    this.http.get(this.apiUrl + 'test/not-found').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public get401Error() {
    this.http.get(this.apiUrl + 'test/auth').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public get500Error() {
    this.http.get(this.apiUrl + 'test/server-error').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public get400ValidationError() {
    this.http.post(this.apiUrl + 'test/server-error', {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
