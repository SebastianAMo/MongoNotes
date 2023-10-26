import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from pymongo import MongoClient

from bson import ObjectId  # Importar ObjectId desde bson


#LOGIN 
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager, decode_token
from datetime import datetime, timedelta, timezone




app = Flask(__name__)

# Lista negra de tokens revocados
BLACKLIST = set()


try:
    # Conexión a MongoDB
    client = MongoClient('mongodb://127.0.0.1:27117,127.0.0.1:27118')
    db = client['MyDatabase']
    collection = db['Notes']
    print('Conexión a MongoDB exitosa')
except Exception as e:
    print(e)

try:
    # Nueva conexión a MongoDB del contenedor
    new_client = MongoClient('mongodb://localhost:27017/')
    new_db = new_client['login']
    new_collection = new_db['usuarios']
    print('Conexión a MongoDB del contenedor exitosa')
except Exception as e:
    print(e)

#CONFIGURATIONS LOGIN
app.config["JWT_SECRET_KEY"] = "tes2"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=50)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "*"}})


#LOGIN  
    
@app.before_request
def check_blacklist():
    if request.path == "/token":  # Permitir que las solicitudes a /token pasen
        return None

    token = request.headers.get("Authorization")
    if token:
        token = token.split(" ")[1]  # Eliminar el prefijo 'Bearer'
        jti = decode_token(token)["jti"]
        if jti in BLACKLIST:
            return jsonify({"msg": "Token has been revoked"}), 401

    return None

    
@app.route('/token', methods=["POST"])
def create_token():
    data = request.get_json()
    usuario = data.get("usuario", None)
    contraseña = data.get("contraseña", None)
    
    # Buscar el usuario en la colección 'usuarios'
    user = new_collection.find_one({'usuario': usuario, 'contraseña': contraseña})
    
    if user:
        # Si las credenciales son válidas, generar y devolver un token JWT y el id del usuario
        access_token = create_access_token(identity=str(user['_id']))
        response = {"access_token": access_token, "user_id": str(user['_id']),"nombre": user['nombre']}
        return response
    else:
        return {"msg": "Credenciales incorrectas"}, 401

# Fecha de revocación
REVOCATION_DATE = datetime.now()

# Función para verificar si un token ha sido revocado
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    token_issue_time = datetime.utcfromtimestamp(jwt_payload['iat'])
    return token_issue_time < REVOCATION_DATE

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # jti es el identificador único del token JWT
    BLACKLIST.add(jti)
    return jsonify({"msg": "logout successful"}), 200


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # Validación de datos (opcional, pero recomendado)
    required_fields = ['nombre', 'cedula', 'Telefono', 'direccion', 'ocupacion', 'usuario', 'contraseña']
    if not all(field in data for field in required_fields):
        return jsonify(message="Campos requeridos faltantes"), 400
    
    new_collection.insert_one(data)
    return jsonify(message="Usuario registrado"), 201


#CRUD notas  

@app.route('/add_note', methods=['POST'])
@jwt_required()
def add_note():
    data = request.get_json()
    print(data)
    required_fields = ['usuarioid', 'titulo', 'fecha', 'nota']
    if not all(field in data for field in required_fields):
        return jsonify(message="Campos requeridos faltantes"), 400

    collection.insert_one(data)
    return jsonify(message="Nota agregada"), 201


@app.route('/get_notes/<user_id>', methods=['GET'])
@jwt_required()

def get_notes(user_id):
    notas = list(collection.find({'usuarioid': user_id}))
    for nota in notas:
        nota['_id'] = str(nota['_id'])  # Convertir ObjectId a str
    return jsonify(notas=notas)


@app.route('/delete_note/<note_id>', methods=['DELETE'])
def delete_note(note_id):
    try:
        collection.delete_one({'_id': ObjectId(note_id)})
        return jsonify(message="Nota eliminada"), 200
    except Exception as e:
        return jsonify(message="Error al eliminar nota", error=str(e)), 400

if __name__ == '__main__':
    app.run(debug=True)