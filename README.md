# MongoNotes


Crear una base de datos tipo sharding en el router 01 o el que sea el primario
Crear la coleccion que sea de notas, lo que recibe del front para notas es el usuario, titulo, fecha, nota 


Endpoints 
 * login   | usuario - contraseña  | lo del login debe devolver el token generado por JWT y el id del usuario 
 * registro | nombre - cedula  - Telefono - direcion - ocupacion - usuario - contraseña 
 * nota | usuarioid - titulo - fecha - nota
 * consultar todas las notas de un usuario 
 * Eliminar una nota | id de la nota 
