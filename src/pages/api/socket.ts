import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponseServerIO } from "next";

let players: any[] = [];

export const config = {
  api: { bodyParser: false },
};

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log("Inicjalizacja Socket.IO na serwerze...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: { origin: "*" },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Klient połączony:", socket.id);

      socket.emit("init", players);

      socket.on("join", (name: string) => {
        players.push({ id: socket.id, name, progress: "", wpm: 0, accuracy: 0 });
        io.emit("players-update", players);
      });

      socket.on("progress", (data: any) => {
        players = players.map((p) =>
          p.id === socket.id
            ? { ...p, progress: data.text, wpm: data.wpm, accuracy: data.accuracy }
            : p
        );
        io.emit("players-update", players);
      });

      socket.on("disconnect", () => {
        players = players.filter((p) => p.id !== socket.id);
        io.emit("players-update", players);
      });
    });
  }

  res.end();
}