import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdouctModule } from './prodouct/prodouct.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';



@Module({
  imports: [ProdouctModule, AuthModule,
  ConfigModule.forRoot({ isGlobal: true, }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: +configService.get<number>('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DATABASE'),
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    inject: [ConfigService],
  }),
  UserModule,
  AuthModule,
  CartModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
 