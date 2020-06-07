import { Character } from '../models/character';
import jsonfile from 'jsonfile';

export interface ICharacterDb {
    getOne: (id: string) => Promise<Character | null>;
    //getAll: () => Promise<IUser[]>;
    //add: (user: IUser) => Promise<void>;
    //update: (user: IUser) => Promise<void>;
    //delete: (id: number) => Promise<void>;
}

export class FileCharacterDb implements ICharacterDb {
    constructor(private dbFilePath: string) {
    }

    private openDb() : Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    };

    async getOne (id: string) : Promise<Character | null> {
        try {
            const db = await this.openDb();
            for (const character of db.characters) {
                //console.log(character);
                if (character.name === id) {
                    return character;
                }
            }
            return null;
        } catch (err) {
            throw err;
        }
    }
}
