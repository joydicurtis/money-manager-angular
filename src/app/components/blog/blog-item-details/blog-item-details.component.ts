import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { TestData } from '../../../shared/transaction-types';

@Component({
  selector: 'app-blog-item-details',
  templateUrl: './blog-item-details.component.html',
  styleUrls: ['./blog-item-details.component.scss']
})
export class BlogItemDetailsComponent implements OnInit {
  id!: number;
  testUrl = 'http://localhost:3000/posts/';
  post!: TestData;
  constructor(private route: ActivatedRoute, protected blogService: BlogService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   });

   this.blogService.getPostById(this.testUrl, this.id).subscribe(data => this.post = data);
  }
}
