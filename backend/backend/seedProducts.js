const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const products = [
  {
    name: 'God of War Ragnarök',
    description: 'La épica continuación de la saga de Kratos y Atreus. Explorá los nueve reinos y enfrentá a los dioses nórdicos en una aventura imperdible.',
    price: 8999,
    category: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
    date: '2022-11-09'
  },
  {
    name: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'Explorá las tierras de Hyrule y los cielos que la rodean en esta secuela del aclamado Breath of the Wild.',
    price: 9499,
    category: 'Nintendo Switch',
    image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000063714/b7c2b4d69a5378e71e4748640ef52e29a3b6b1a21f46f0c5c4f92cc1b74be0d8',
    date: '2023-05-12'
  },
  {
    name: 'Elden Ring',
    description: 'Un vasto mundo abierto lleno de peligros y maravillas. Creado por FromSoftware y George R. R. Martin.',
    price: 7499,
    category: 'PC',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg',
    date: '2022-02-25'
  },
  {
    name: 'FIFA 24',
    description: 'El simulador de fútbol más popular del mundo con los mejores jugadores y ligas actualizadas.',
    price: 6999,
    category: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202307/0710/3c3ce7f0fd2c3c67f74fa73c05e0ebb25e1f5494e6c89893.png',
    date: '2023-09-29'
  },
  {
    name: 'Cyberpunk 2077',
    description: 'Un RPG de mundo abierto ambientado en Night City, una megalópolis obsesionada con el poder y el glamour.',
    price: 5999,
    category: 'PC',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg',
    date: '2020-12-10'
  },
  {
    name: 'Spider-Man 2',
    description: 'Peter Parker y Miles Morales regresan para enfrentar nuevas amenazas en Nueva York. Exclusivo de PS5.',
    price: 9999,
    category: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8a8e3c7e4b6a0e4e2a8a3e4e6a7a8e9e0a1a2a3a4.png',
    date: '2023-10-20'
  },
  {
    name: 'Halo Infinite',
    description: 'Master Chief regresa en la campaña más ambiciosa de la saga Halo. Multijugador gratuito incluido.',
    price: 4999,
    category: 'Xbox',
    image: 'https://store-images.s-microsoft.com/image/apps.28090.13727851868390641.c9cc5f64-f7ab-4462-9e5b-8cfbf2a1c1b0.b028dc27-18bb-4b66-ba09-c6e9f92aaac8',
    date: '2021-12-08'
  },
  {
    name: 'Minecraft',
    description: 'El juego de construcción y supervivencia más vendido de la historia. Compatible con todas las plataformas.',
    price: 2999,
    category: 'PC',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/capsule_616x353.jpg',
    date: '2011-11-18'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    await Product.deleteMany({});
    console.log('Productos anteriores eliminados');

    await Product.insertMany(products);
    console.log(`✅ ${products.length} productos gamer cargados exitosamente`);

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message);
  }
};

seed();
