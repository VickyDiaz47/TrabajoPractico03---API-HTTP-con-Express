const express = require("express");
const path = require("node:path");
const { leerJson } = require("./archivos");

async function main() {
  try {
    const rutaDatos = path.join(__dirname, "..", "datos", "instrumentos.json");
    const instrumentos = await leerJson(rutaDatos);

    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(200).json({
        mensaje: "API de instrumentos musicales disponible"
      });
    });

    app.get("/api/instrumentos", (req, res) => {
  const { familia } = req.query;

  if (!familia) {
    return res.status(200).json(instrumentos);
  }

  const instrumentosFiltrados = instrumentos.filter(
    (instrumento) =>
      instrumento.familia.toLowerCase() === familia.toLowerCase()
  );

  res.status(200).json(instrumentosFiltrados);
});

    const PORT = 3000;

    app.get("/api/instrumentos/:id", (req, res) => {
  const id = Number(req.params.id);

  const instrumento = instrumentos.find(
    (instrumento) => instrumento.id === id
  );

  if (!instrumento) {
    return res.status(404).json({
      error: "Instrumento no encontrado"
    });
  }

  res.status(200).json(instrumento);
});

app.post("/api/instrumentos", (req, res) => {
  const { nombre, familia, origen, descripcion, disponible } = req.body;

  if (
    nombre === undefined ||
    familia === undefined ||
    origen === undefined ||
    descripcion === undefined ||
    disponible === undefined
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  const nuevoId = instrumentos[instrumentos.length - 1].id + 1;

  const nuevoInstrumento = {
    id: nuevoId,
    nombre,
    familia,
    origen,
    descripcion,
    disponible
  };

  instrumentos.push(nuevoInstrumento);

  res.status(201).json(nuevoInstrumento);
});

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error de inicio: no se pudieron cargar los instrumentos.");
    console.error(error.message);
  }
}

main();