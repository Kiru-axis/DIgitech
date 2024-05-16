import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BlogQueryType,
  IBlog,
  IBlogCategory,
  ICreateBlog,
  ICreateCommonProductSup,
} from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = environment.server_url + '/blogs';

  cat_url = environment.server_url + '/blog-categories';

  constructor(private http: HttpClient) {}

  // BLOGS
  getAllBlogs(query?: BlogQueryType): Observable<IBlog[]> {
    const obj = {
      cat: '',
    };

    if (query) {
      obj.cat = query.cat;
    }

    let params = new HttpParams({ fromObject: obj });

    return this.http.get<IBlog[]>(this.url, { params });
  }

  getSingleBlog(blogId: string): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.url}/${blogId}`);
  }

  deleteBlog(blogId: string): Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/${blogId}`);
  }

  createBlog(dto: ICreateBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.url, dto);
  }

  // BLOG CATEGORIES
  getAllBlogCategories(): Observable<IBlogCategory[]> {
    return this.http.get<IBlogCategory[]>(this.cat_url);
  }

  deleteBlogCategory(catId: string): Observable<IBlogCategory> {
    return this.http.delete<IBlogCategory>(`${this.cat_url}/${catId}`);
  }

  createBlogCategory(dto: ICreateCommonProductSup): Observable<IBlogCategory> {
    return this.http.post<IBlogCategory>(this.cat_url, dto);
  }
}
