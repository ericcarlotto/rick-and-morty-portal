import 'reflect-metadata';
import { createApp } from './create-app';
import { listenPort } from './listen-port';

void createApp({ env: process.env }).then((app) => app.listen(listenPort(process.env)));
