import mongoose from 'mongoose';
import user from './auth.model.js';
import role from './role.model.js';

mongoose.Promise = global.Promise;


const database = {};

database.user = user;
database.role = role;

database.ROLES = ['user', 'admin', 'moderator'];

export default database;