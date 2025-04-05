// Importación de decoradores necesarios
import { Type } from 'class-transformer'; // Para transformación de tipos
import { IsNumber, IsString, Min } from 'class-validator'; // Validadores de datos

// DTO (Data Transfer Object) para la creación de productos
export class CreateProductDto {
  /**
   * Nombre del producto
   * - Debe ser una cadena de texto (string)
   * - Validación automática con @IsString()
   */
  @IsString()
  public name: string;

  /**
   * Precio del producto
   * - Debe ser un número (@IsNumber)
   * - Máximo 2 decimales (maxDecimalPlaces: 2)
   * - Valor mínimo 0 (@Min(0))
   * - @Type(() => Number) asegura la transformación a número
   *   (útil cuando los datos vienen como string desde peticiones HTTP)
   */
  @IsNumber({
    maxDecimalPlaces: 2, // Solo permite hasta 2 decimales (ej: 19.99)
  })
  @Min(0) // El precio no puede ser negativo
  @Type(() => Number) // Transforma automáticamente a tipo Number
  public price: number;
}
