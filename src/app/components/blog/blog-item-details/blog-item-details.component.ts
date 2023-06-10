import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpTestService } from 'src/app/services/http-test.service';
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
  constructor(private route: ActivatedRoute, protected httpTestService: HttpTestService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   });

   this.httpTestService.getPostById(this.testUrl, this.id).subscribe(data => this.post = data);
  }
}
