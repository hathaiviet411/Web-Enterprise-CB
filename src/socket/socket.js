import { io } from "socket.io-client";
import { getToken } from "@/utils/handleToken";

const token = getToken();
const baseURL = process.env.VUE_APP_SOCKET_URL;
const socket = io(baseURL, {
  auth: { token },
});
socket.on("connection", (socket) => {
  // console.log(socket.id);
});

export default socket;
