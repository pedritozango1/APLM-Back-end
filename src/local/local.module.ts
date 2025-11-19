import { Module } from '@nestjs/common';
import { LocalService } from './service/local.service';
import { LocalController } from './controller/local.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Local, LocalSchema } from './schema/local.schema';
import { LocalGPSSchema } from './schema/local-gps.schema';
import { LocalWifiSchema } from './schema/local-wifi.schema';
import { LocalRepository } from './repository/local.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Local.name,
        useFactory: () => {
          const schema = LocalSchema;
          schema.discriminator('GPS', LocalGPSSchema);
          schema.discriminator('WIFI', LocalWifiSchema);
          return schema;
        },
      },
    ]),
  ],
  providers: [LocalService,LocalRepository],
  exports: [LocalService,LocalRepository],
  controllers: [LocalController]
})
export class LocalModule {}
