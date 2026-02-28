import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponseServerIO } from "next";

type Player = {
  id: string;
  name: string;
  progress: string;
  wpm: number;
  accuracy: number;
};

let players: Player[] = [];
export const config = {
  api: { bodyParser: false },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO on the server...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: { origin: "*" },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Connected client:", socket.id);

      socket.emit("init", players);

      socket.on("join", (name: string) => {
        const existing = players.find((p) => p.id === socket.id);
        if (!existing) {
          players.push({
            id: socket.id,
            name,
            progress: "",
            wpm: 0,
            accuracy: 0,
          });
        }

        io.emit("players-update", players);
      });

      type ProgressPayload = {
        name: string;
        text: string;
        wpm: number;
        accuracy: number;
      };

      socket.on("progress", (data: ProgressPayload) => {
        players = players.map((p) =>
          p.id === socket.id
            ? {
                ...p,
                progress: data.text,
                wpm: data.wpm,
                accuracy: data.accuracy,
              }
            : p,
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
