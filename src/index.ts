// Server
import Server from './app';
// Database
import Mongo from './database/database';

Mongo.connect();
Server.start();
