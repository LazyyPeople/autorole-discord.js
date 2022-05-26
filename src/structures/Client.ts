import { ClientOptions, Client } from 'discord.js';
import db from '../database/index';

export class Bot extends Client {
    public constructor(options: ClientOptions) {
        super(options);
    }
    public db = db;
}
