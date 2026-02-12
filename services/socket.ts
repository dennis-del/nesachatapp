import socketIO from "socket.io-client";

export const socket = socketIO("http://13.232.142.213:7090", {
  autoConnect: false,
});