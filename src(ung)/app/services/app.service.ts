import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AppService {
  apiUrl: string = "http://localhost:4200/assets/api";
  headers: Headers = new Headers({'content-type':'application/json'});
  constructor(private http: Http) { }
  getBlogPosts(): Observable<any>{
    let url = this.apiUrl + '/blog.json';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
