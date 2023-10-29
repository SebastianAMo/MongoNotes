# Backend

Primero, vamos a instalar el backend. Abre un terminal y navega hasta la carpeta `backend`:

```bash
cd Backend
```

A continuación, crea un entorno virtual con Python:

```bash
py -m venv env
```

Activa el entorno virtual:

Windows

```bash
./env/Scripts/activate
```

linux

```bash
source env/bin/activate
```

Instala las dependencias necesarias para el proyecto (asegúrate de tener un archivo requirements.txt):

```bash
pip install -r requirements.txt
```

Finalmente, inicia el servidor Flask (asegúrate de tener un archivo app.py o main.py):

```bash
python app.py
```
