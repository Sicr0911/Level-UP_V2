export interface Producto {
    id: number;
    name: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
    stock: number;
    stockCritico?: number;
}