import type { Producto } from '../Interfaces/Producto';
import audifonos from '../IMG/Audifonos.png';
import catan from '../IMG/juegoCatan.png';
import carcassonne from '../IMG/juegoCarcassonne.png';
import silla from '../IMG/silla_gamer.png';
import polera from '../IMG/polera.png';
import mandoXbox from '../IMG/mandoXbox.png';
import mouse from '../IMG/mouse.png';
import mousepad from '../IMG/mousepad.png';
import pc from '../IMG/pc.png';
import ps5 from '../IMG/ps5.png';


const initialProducts = [
  {
    codigo: 'JM001',
    categoria: 'Juegos de Mesa',
    nombre: 'Catan',
    precio: 29990,
    descripcion: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.',
    imagen: catan
  },
  {
    codigo: 'AU001',
    categoria: 'Audifonos',
    nombre: 'Auriculares Gamer HyperX Cloud II',
    precio: 79990,
    descripcion : 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.',
    imagen: audifonos
  },
  {
    codigo: 'JM002',
    categoria: 'Juegos de Mesa',
    nombre: 'Carcassonne',
    precio: 24990,
    descripcion : 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.',
    imagen: carcassonne
  },
  {
    codigo: 'AC001',
    categoria: 'Accesorios',
    nombre: 'Controlador Inalámbrico Xbox Series X',
    precio: 59990,
    descripcion: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.',
    imagen: mandoXbox
  },
  {
    codigo: 'CO001',
    categoria: 'Consolas',
    nombre: 'PlayStation 5',
    precio: 549990,
    descripcion: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.',
    imagen: ps5
  },
  {
    codigo: 'CG001',
    categoria: 'Computadores Gamers',
    nombre: 'PC Gamer ASUS ROG Strix',
    precio: 1299990,
    descripcion: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.',
    imagen: pc
  },
  {
    codigo: 'SG001',
    categoria: 'Sillas Gamers',
    nombre: 'Silla Gamer Secretlab Titan',
    precio: 349990,
    descripcion: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.',
    imagen: silla
  },
  {
    codigo: 'PP001',
    categoria: 'Poleras Personalizadas',
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    descripcion: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.',
    imagen: polera
  },
  {
    codigo: 'MO001',
    categoria: 'Mouse',
    nombre: "Mouse Gamer Logitech G502 HERO",
    precio: 49990,
    descripcion: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.',
    imagen: mouse
  },
  {
    codigo: 'MO002',
    categoria: 'Mousepad',
    nombre: "Mousepad Razer Goliathus Extended",
    precio: 29990,
    descripcion: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.',
    imagen: mousepad
  }
];

let PRODUCTOS: Producto[] = [];

try {
    const storedProducts = localStorage.getItem('levelup_productos');
    if (storedProducts) {
        PRODUCTOS = JSON.parse(storedProducts);
    } else {
        PRODUCTOS = initialProducts;
        localStorage.setItem('levelup_productos', JSON.stringify(PRODUCTOS));
    }
} catch (error) {
    console.error("Error al acceder a localStorage para productos:", error);
    PRODUCTOS = initialProducts;
}

const persistProducts = () => {
    localStorage.setItem('levelup_productos', JSON.stringify(PRODUCTOS));
};

export const createProduct = (newProduct: Producto): Producto => {
    if (!newProduct.codigo) {
        newProduct.codigo = `TEMP${Date.now()}`;
    }
    
    PRODUCTOS.push(newProduct);
    persistProducts();
    return newProduct;
};

export const getAllProducts = (): Producto[] => {
    return PRODUCTOS;
};

export const getProductByCode = (codigo: string): Producto | undefined => {
    return PRODUCTOS.find(p => p.codigo === codigo);
};


export const updateProduct = (updatedProduct: Producto): Producto | null => {
    const index = PRODUCTOS.findIndex(p => p.codigo === updatedProduct.codigo);
    
    if (index !== -1) {
        PRODUCTOS[index] = updatedProduct;
        persistProducts();
        return updatedProduct;
    }
    return null;
};

export const deleteProduct = (codigo: string): boolean => {
    const initialLength = PRODUCTOS.length;
    PRODUCTOS = PRODUCTOS.filter(p => p.codigo !== codigo);
    
    if (PRODUCTOS.length < initialLength) {
        persistProducts();
        return true;
    }
    return false;
};