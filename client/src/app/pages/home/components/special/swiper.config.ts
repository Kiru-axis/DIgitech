import { SwiperOptions } from 'swiper/types/swiper-options';
import { A11y, Mousewheel, Pagination, Grid, Navigation } from 'swiper/modules';

export const SpecialSwiperConfig: SwiperOptions = {
  modules: [Pagination, A11y, Mousewheel, Grid, Navigation],
  // autoHeight: true,
  spaceBetween: 20,
  navigation: true,
  pagination: { clickable: true, dynamicBullets: true },

  slidesPerView: 1,

  breakpoints: {
    400: {
      slidesPerView: 'auto',
    },
    800: {
      slidesPerView: 3,
    },
    1000: {
      // slidesPerView: 'auto',
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
  },
};
