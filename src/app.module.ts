import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DesignModule } from './design/design.module';
import { PrismaModule } from './prisma/prisma.module';
import { MerchandiseModule } from './merchandise/merchandise.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, UserModule, DesignModule, PrismaModule, MerchandiseModule, ProductModule],

})
export class AppModule { }
