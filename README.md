# analizar.js

Script Node.js que analiza un archivo de texto y reporta **líneas, palabras y caracteres** con salida coloreada.

## Qué hace

- 📊 Cuenta líneas, palabras y caracteres de un `.txt`
- 🎨 Salida en color con `styleText` (azul info, verde éxito, rojo errores)
- 💾 Opción de guardar un resumen en un archivo nuevo
- 🛡️ Errores de lectura/escritura capturados con `try/catch`

## Cómo se usa

```bash
node analizar.js --file texto.txt            # analiza y muestra en consola
node analizar.js -f texto.txt -o resumen.txt # analiza y guarda resumen
node analizar.js -h                          # muestra ayuda