import type { Item } from './ItemCarrito';
import type { Direccion } from './Direccion'; 

export interface Orden {
    id: string; 
    fecha: string;
    clienteId: string;
    clienteNombre: string;
    items: Item[];
    total: number;
    estado: 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
    direccionEnvio: Direccion;
    aplicaDescuentoDuoc: boolean; 
}