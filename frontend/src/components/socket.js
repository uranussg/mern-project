import io from 'socket.io-client';
import config from '../config';

export const socket = io(config[process.env.NODE_ENV].endpoint);