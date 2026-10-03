# Trabajo práctico 03

## Descripción

API HTTP desarrollada con Node.js y Express para gestionar información sobre instrumentos musicales.

Los datos iniciales se cargan desde el archivo `datos/instrumentos.json` cuando se inicia el servidor. Los instrumentos agregados mediante `POST` se mantienen solamente en memoria mientras el servidor está ejecutándose.

## Instalación

Clonar o descargar el proyecto y ubicarse en la carpeta raíz.

Instalar las dependencias con:

```bash
npm install
```

La aplicación utiliza Express como dependencia principal.

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

Para detener el servidor, presionar `Ctrl + C` en la terminal.

Para verificar la sintaxis de los archivos JavaScript:

```bash
npm run check
```

## Endpoints

### GET /

Devuelve un mensaje indicando que la API está disponible.

```text
GET http://localhost:3000/
```

### GET /api/instrumentos

Devuelve todos los instrumentos.

```text
GET http://localhost:3000/api/instrumentos
```

También permite filtrar por familia mediante el parámetro de consulta `familia`:

```text
GET http://localhost:3000/api/instrumentos?familia=cuerda
```

El filtro no distingue entre mayúsculas y minúsculas.

Si la familia solicitada no existe, devuelve un arreglo vacío.

### GET /api/instrumentos/:id

Devuelve un instrumento específico utilizando su ID.

```text
GET http://localhost:3000/api/instrumentos/1
```

El `id` es un parámetro de ruta.

Si el instrumento no existe, la API devuelve un error con estado `404`.

### POST /api/instrumentos

Agrega un nuevo instrumento en memoria.

```text
POST http://localhost:3000/api/instrumentos
```

La solicitud debe utilizar `Content-Type: application/json` y enviar los siguientes campos:

```json
{
  "nombre": "Marimba",
  "familia": "percusión",
  "origen": "Guatemala",
  "descripcion": "Instrumento de percusión formado por láminas de madera.",
  "disponible": false
}
```

El `id` se genera automáticamente a partir del último registro existente.

La aplicación utiliza `express.json()` para poder recibir y procesar cuerpos de solicitudes en formato JSON.

## Códigos de estado

- `200 OK`: solicitud realizada correctamente.
- `201 Created`: instrumento creado correctamente.
- `400 Bad Request`: faltan campos obligatorios en la solicitud.
- `404 Not Found`: no existe un instrumento con el ID solicitado.

## Ejemplos de solicitudes

### Obtener todos los instrumentos

```text
GET /api/instrumentos
```

### Filtrar por familia

```text
GET /api/instrumentos?familia=cuerda
```

### Obtener un instrumento por ID

```text
GET /api/instrumentos/1
```

### Crear un instrumento

```text
POST /api/instrumentos
Content-Type: application/json
```

```json
{
  "nombre": "Ukelele soprano",
  "familia": "cuerda",
  "origen": "Hawái",
  "descripcion": "Instrumento pequeño de cuatro cuerdas utilizado en música popular.",
  "disponible": true
}
```

## Persistencia de los datos

Los instrumentos iniciales se cargan desde `datos/instrumentos.json` al iniciar el servidor.

Los instrumentos creados mediante `POST` se agregan únicamente al arreglo que se encuentra en memoria. La API no modifica el archivo JSON ni utiliza una base de datos.

Por este motivo, los instrumentos creados durante la ejecución desaparecen cuando se detiene y se vuelve a iniciar el servidor.

Durante las pruebas se comprobó que los instrumentos creados con `POST` estaban disponibles mientras el servidor permanecía activo y que, después de reiniciarlo, volvieron a mostrarse únicamente los seis instrumentos originales.