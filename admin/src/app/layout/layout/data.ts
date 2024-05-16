import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBlog,
  faBookSkull,
  faCartPlus,
  faHomeAlt,
  faLayerGroup,
  faPalette,
  faTags,
  faUserAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

interface IData {
  icon: IconDefinition;
  label: string;
  routerLink: string;
}

export const NavData: IData[] = [
  { label: 'Dashboard', icon: faHomeAlt, routerLink: '/home' },
  // { label: 'Profile', icon: faUserAlt, routerLink: '/home/profile' },
  { label: 'Users', icon: faUsers, routerLink: '/home/users' },
  { label: 'Products', icon: faCartPlus, routerLink: '/home/products' },
  { label: 'Tags', icon: faTags, routerLink: '/home/tags' },
  { label: 'Brands', icon: faLayerGroup, routerLink: '/home/brands' },
  { label: 'Categories', icon: faLayerGroup, routerLink: '/home/categories' },
  { label: 'Colors', icon: faPalette, routerLink: '/home/colors' },
  { label: 'Coupons', icon: faHomeAlt, routerLink: '/home/coupons' },
  { label: 'Blogs', icon: faBlog, routerLink: '/home/blogs' },
  {
    label: 'BlogCategories',
    icon: faBlog,
    routerLink: '/home/blog-categories',
  },
  { label: 'Orders', icon: faBookSkull, routerLink: '/home/orders' },
  //   { label: 'Orders', icon: faHomeAlt, routerLink: '/' },
  //   { label: 'Orders', icon: faHomeAlt, routerLink: '/' },
];
