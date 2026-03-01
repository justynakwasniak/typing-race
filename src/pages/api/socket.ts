import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "@/types/next";
import type {
  Player,
  ProgressPayload,
  NewRoundPayload,
} from "@/types/socket.model";
import { getRandomSentence } from "@/lib/sentences";

let players: Player[] = [];
let currentSentence: string = getRandomSentence();

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

      socket.emit("init", {
        players,
        sentence: currentSentence,
      });

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

      socket.on("end-round", () => {
        currentSentence = getRandomSentence();

        players = players.map((p) => ({
          ...p,
          progress: "",
          wpm: 0,
          accuracy: 0,
        }));

        io.emit("new-round", { sentence: currentSentence } as NewRoundPayload);
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
