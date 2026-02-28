// lib/socket.ts
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const initSocket = () => {
  if (!socket) {
    console.log("Inicjalizacja klienta Socket.IO...");
    socket = io("http://localhost:3000", {
      path: "/api/socket",
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("Połączono socket id:", socket.id));
    socket.on("disconnect", () => console.log("Socket rozłączony"));
    socket.on("connect_error", (err) => console.log("Błąd połączenia:", err));
  }

  return socket;
};