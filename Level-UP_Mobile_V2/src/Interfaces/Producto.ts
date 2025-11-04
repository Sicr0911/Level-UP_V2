export interface Producto {
  codigo: string;
  categoria: string; 
  nombre: string;
  precio: number; 
  descripcion: string;
  fabricante?: string;
}