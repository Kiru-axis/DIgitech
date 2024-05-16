import { SwiperOptions } from 'swiper/types/swiper-options';
import { A11y, Mousewheel, Pagination, Navigation } from 'swiper/modules';

export const BlogSwiperConfig: SwiperOptions = {
  modules: [Pagination, A11y, Mousewheel, Navigation],
  autoHeight: true,
  spaceBetween: 20,
  pagination: { clickable: true, dynamicBullets: true },
  navigation: true,
  slidesPerView: 1,
  breakpoints: {
    400: {
      slidesPerView: 'auto',
    },
    600: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    },
  },
};

//  new Swiper('.swiper', {
//    modules: [Navigation, Pagination, Autoplay],
//    speed: 4000,
//    effect: 'flip',
//    spaceBetween: 0,
//    navigation: false,
//    autoplay: {
//      delay: 3500,
//      disableOnInteraction: true,
//    },
//    slidesPerView: 1,
//    pagination: { clickable: true },
//    scrollbar: { draggable: true },
//  });
