import type { Producto } from '../Interfaces/Producto';

export const PRODUCTOS: Producto[] = [
  {
    codigo: 'JM001',
    categoria: 'Juegos de Mesa',
    nombre: 'Catan',
    precio: 29990,
    descripcion: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.'
  },

  {
    codigo: 'JM002',
    categoria: 'Juegos de Mesa',
    nombre: 'Carcassonne',
    precio: 24990,
    descripcion : 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.'
  },

  {
    codigo: 'AC001',
    categoria: 'Accesorios',
    nombre: 'Controlador Inalámbrico Xbox Series X',
    precio: 59990,
    descripcion: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.'
  },

  {
    codigo: 'CO001',
    categoria: 'Consolas',
    nombre: 'PlayStation 5',
    precio: 549990,
    descripcion: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.'
  },

  {
    codigo: 'CG001',
    categoria: 'Computadores Gamers',
    nombre: 'PC Gamer ASUS ROG Strix',
    precio: 1299990,
    descripcion: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.'
  },

  {
    codigo: 'SG001',
    categoria: 'Sillas Gamers',
    nombre: 'Silla Gamer Secretlab Titan',
    precio: 349990,
    descripcion: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.'
  },
  
  {
    codigo: 'PP001',
    categoria: 'Poleras Personalizadas',
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    descripcion: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.'
  }
];