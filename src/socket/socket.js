import { io } from 'socket.io-client';
import { getToken } from '@/utils/handleToken';

const token = getToken();
const baseURL = process.env.VUE_APP_BASE_URL;
const socket = io(baseURL, {
    auth: { token },
});
socket.on('connect', (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

export default socket;
