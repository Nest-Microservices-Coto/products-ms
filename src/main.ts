import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { port: envs.port },
    },
  );

  // Configuración de tuberías (pipes) globales para la aplicación NestJS
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true → Elimina automáticamente cualquier propiedad
      // que no tenga decoradores de validación en los DTOs.
      // Esto previene que se inyecten datos maliciosos o no deseados.
      whitelist: true,

      // forbidNonWhitelisted: true → Rechaza peticiones que contengan
      // propiedades no definidas en los DTOs (retorna error 400).
      // Combinado con whitelist, proporciona una validación estricta.
      forbidNonWhitelisted: true,

      // Otras opciones útiles que podrías considerar:
      // transform: true → Transforma automáticamente los datos entrantes
      // a los tipos definidos en los DTOs (ej: string a number)
      // disableErrorMessages: true → Desactiva mensajes de error detallados
      // en producción por seguridad
    }),
  );
  await app.listen();

  logger.log(`Products MicroService running on port ${envs.port}`);
}
bootstrap();
