import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogQueryType, IBlog, IBlogCategory } from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = environment.server_url + '/blogs';

  cat_url = environment.server_url + '/blog-categories';

  constructor(private http: HttpClient) {}

  getAllBlogs(query?: BlogQueryType): Observable<IBlog[]> {
    const obj = {
      cat: '',
      page: '',
      limit: '',
    };

    if (query) {
      obj.cat = String(query.cat);
      obj.page = String(query.page);
      obj.limit = String(query.limit);
    }

    let params = new HttpParams({ fromObject: obj });

    return this.http.get<IBlog[]>(this.url, { params });
  }

  getSingleBlog(blogId: string): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.url}/${blogId}`);
  }

  getAllBlogCategories(): Observable<IBlogCategory[]> {
    return this.http.get<IBlogCategory[]>(this.cat_url);
  }

  createBlog() {}
}
