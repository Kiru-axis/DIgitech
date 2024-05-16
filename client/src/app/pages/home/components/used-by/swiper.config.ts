import { SwiperOptions } from 'swiper/types/swiper-options';
import { A11y, Mousewheel, Navigation, Pagination, Grid } from 'swiper/modules';

export const UsedBySwiperConfig: SwiperOptions = {
  modules: [Pagination, A11y, Mousewheel, Grid],
  spaceBetween: 20,
  pagination: { clickable: true, dynamicBullets: true },
  autoplay: { delay: 1000 },
  loop: true,

  slidesPerView: 1,
  breakpoints: {
    400: {
      slidesPerView: 'auto',
    },
    600: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 5,
    },
  },
};
