db = db.getSiblingDB('login');  // selecciona la base de datos 'login', o la crea si no existe
db.createCollection('usuarios');  // crea la colección 'usuarios'
