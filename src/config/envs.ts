// Importa la librería dotenv para cargar variables de entorno desde un archivo .env
import 'dotenv/config';

// Importa la librería Joi para validación de esquemas
import * as joi from 'joi';

// Definimos una interfaz que representa la estructura esperada de las variables de entorno
interface EnvVars {
  PORT: number; // El puerto debe ser un número
  DATABASE_URL: string;
}

// Creamos un esquema de validación usando Joi
const envSchema = joi
  .object({
    // Validamos que PORT sea un número y sea obligatorio (required)
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
  })
  // Permitimos que existan otras variables de entorno no definidas en el esquema
  .unknown(true);

// Validamos las variables de entorno (process.env) contra el esquema definido
const { error, value } = envSchema.validate(process.env);

// Si hay un error en la validación, lanzamos una excepción
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Asignamos las variables validadas a un objeto con el tipo EnvVars
const envVars: EnvVars = value;

// Exportamos un objeto con las variables de entorno ya validadas y tipadas
export const envs = {
  port: envVars.PORT, // Exportamos el puerto como "port" (podría ser diferente del nombre en .env)
  DATABASE_URL: envVars.DATABASE_URL,
};
