import type { Producto } from './Producto';

export interface Item {
  producto: Producto;
  cantidad: number;
}