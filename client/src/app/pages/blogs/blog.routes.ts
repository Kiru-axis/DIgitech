import { Route } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';

export const blog_routes: Route[] = [
  { path: '', component: BlogsComponent },
  {
    path: ':id',
    loadComponent: () =>
      import('./blog/blog.component').then((c) => c.BlogComponent),
  },
];

// export const blog_routes: Route[] = [
//   {
//     path: '',
//     redirectTo: 'blogs',
//     pathMatch: 'full',
//   },
//   { path: 'blogs', component: BlogsComponent },
//   {
//     path: ':id',
//     loadComponent: () =>
//       import('./blog/blog.component').then((c) => c.BlogComponent),
//   },
// ];
