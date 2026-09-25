const http = require("node:http");
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const files = {
  "/": ["index.html", "text/html"],
  "/index.html": ["index.html", "text/html"],
  "/styles.css": ["styles.css", "text/css"],
  "/script.js": ["script.js", "text/javascript"],
};
http
  .createServer(async (req, res) => {
    const file = files[new URL(req.url, "http://localhost").pathname];
    if (!file || !["GET", "HEAD"].includes(req.method)) {
      res.writeHead(404);
      res.end();
      return;
    }
    try {
      const content = await readFile(
        resolve(process.env.SERVE_DIST ? "dist" : ".", file[0]),
      );
      res.writeHead(200, {
        "Content-Type": `${file[1]}; charset=utf-8`,
        "X-Content-Type-Options": "nosniff",
      });
      res.end(req.method === "HEAD" ? undefined : content);
    } catch {
      res.writeHead(500);
      res.end("No se pudo cargar el recurso.");
    }
  })
  .listen(42871, "127.0.0.1", () =>
    console.log("Servidor: http://127.0.0.1:42871"),
  );
