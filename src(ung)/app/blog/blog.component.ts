import { AppService } from './../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [AppService]
})
export class BlogComponent implements OnInit {

  posts = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getBlogPosts().subscribe(posts =>{
      console.log("Posts get from json via service:", posts);
      this.posts = posts;
    }, err =>{
      console.log(err);
    });
  } 
}
