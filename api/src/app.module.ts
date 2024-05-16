import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaFilter } from './common/filters/prisma.filter';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/role.guard';

import { AuthModule } from './auth/auth.module';
import { BlogCategoriesModule } from './blogs/blog-categories/blog-categories.module';
import { BlogsModule } from './blogs/blogs/blogs.module';
import { CartsModule } from './customer/carts/carts.module';
import { ComparesModule } from './customer/compares/compares.module';
import { WishlistsModule } from './customer/wishlists/wishlists.module';
import { PrismaModule } from './prisma/prisma.module';
import { BrandsModule } from './product/brands/brands.module';
import { CategoriesModule } from './product/categories/categories.module';
import { ProductsModule } from './product/products/products.module';
import { ReviewsModule } from './product/reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { OrdersModule } from './customer/orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { ColorsModule } from './product/colors/colors.module';
import { TagsModule } from './product/tags/tags.module';
import { CloudinaryModule } from './common/modules/cloudinary/cloudinary.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    // core & third party modules
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register(),

    // custom modules
    PrismaModule,
    AuthModule,
    MailerModule,
    CloudinaryModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    ReviewsModule,
    UsersModule,
    CartsModule,
    WishlistsModule,
    ComparesModule,
    BlogsModule,
    BlogCategoriesModule,
    EnquiriesModule,
    OrdersModule,
    CouponsModule,
    ColorsModule,
    TagsModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: PrismaFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
