import { parseArgs, styleText } from "node:util";
import { argv } from "node:process";
import { readFile, writeFile } from "node:fs/promises";

const args = argv.slice(2);

const options = {
  file: { type: "string", short: "f" },
  output: { type: "string", short: "o" },
  help: { type: "boolean", short: "h" }
};

const { values } = parseArgs({ args, options, strict: false });

function mostrarUso() {
  console.log(styleText("blue", "Uso:") + " analizar un archivo de texto");
  console.log("");
  console.log("  node analizar.js --file <ruta> [--output <ruta>]");
  console.log("");
  console.log("Opciones:");
  console.log("  " + styleText("green", "--file, -f") + "    ruta del archivo a analizar (obligatorio)");
  console.log("  " + styleText("green", "--output, -o") + "  ruta del archivo donde guardar el resumen (opcional)");
  console.log("  " + styleText("green", "--help, -h") + "    muestra esta ayuda");
  console.log("");
  console.log("Ejemplos:");
  console.log("  node analizar.js --file texto.txt");
  console.log("  node analizar.js -f texto.txt -o resumen.txt");
}

if (values.help || !values.file) {
  mostrarUso();
  process.exit(0);
}

try {
  const contenido = await readFile(values.file, { encoding: "utf-8" });

  const lineas = contenido.trim().split("\n").length;
  const palabras = contenido.split(/\s+/).filter((p) => p.length > 0).length;
  const caracteres = contenido.length;

  console.log(styleText(["green", "italic"], "Analisis de: ") + values.file);
  console.log(styleText("blue", "Lineas:    ") + lineas);
  console.log(styleText("blue", "Palabras:  ") + palabras);
  console.log(styleText("blue", "Caracteres:") + " " + caracteres);

  if (values.output) {
    const resumen =
      `Resumen del analisis\n` +
      `Archivo: ${values.file}\n` +
      `Lineas: ${lineas}\n` +
      `Palabras: ${palabras}\n` +
      `Caracteres: ${caracteres}\n`;

    await writeFile(values.output, resumen, { encoding: "utf-8" });
    console.log(styleText(["green", "italic"], "Resumen guardado en: ") + values.output);
  }
} catch (error) {
  console.error(styleText("red", "Error: ") + error.message);
  process.exit(1);
}
