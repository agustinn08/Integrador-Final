const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado a MongoDB');

  // Limpiar usuarios existentes con esos emails
  await User.deleteMany({ email: { $in: ['admin@admin.com', 'cliente@cliente.com'] } });

  const users = [
    {
      fullname: 'Administrador',
      email: 'admin@admin.com',
      password: await bcrypt.hash('1234', 10),
      role: 'admin',
      country: 'AR',
      birthdate: '1990-01-01'
    },
    {
      fullname: 'Cliente Test',
      email: 'cliente@cliente.com',
      password: await bcrypt.hash('1234', 10),
      role: 'client',
      country: 'AR',
      birthdate: '1995-05-15'
    }
  ];

  await User.insertMany(users);
  console.log('✅ Usuarios creados:');
  console.log('  admin@admin.com / 1234 (admin)');
  console.log('  cliente@cliente.com / 1234 (client)');

  await mongoose.disconnect();
};

seed().catch(console.error);
