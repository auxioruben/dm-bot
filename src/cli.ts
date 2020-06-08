import * as RollService from './services/roll-service'
import { FileCharacterDb } from './db/character'
import readline from 'readline';
import * as dnd from 'dnd5e';
import { Character } from './models/character';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'dm-bot> '
});

const db = new FileCharacterDb('src/db/character.data.json');

console.log('Welcome!');


rl.prompt();

rl.on('line', async (line) => {
    const input = line.replace(/\s+/g, ' ').trim();
    const tokens = input.split(' ');
    try {
        let command = tokens.shift() as string;
        if (command !== '') {
            console.log(await dispatch(command, tokens));
        }
    } catch (err) {
        console.error(err.message);
    }
    rl.prompt();
}).on('close', () => {
    console.log('Farewell adventurer!');
    process.exit(0);
});

let currentChar: Character | null;
async function dispatch(command: string, args: string[]) : Promise<any> {
    switch (command) {
        case 'roll':
            return RollService.roll(RollService.parse(args[0]));
        case 'load':
            currentChar = await db.getOne(args[0]);
            if (currentChar) {
                return currentChar;
            }
            throw new Error(`Character with name ${args[0]} not found`);
        case 'show':
            if (currentChar) {
                return currentChar;
            }
            throw new Error('No character loaded');
        case 'check':
            if (currentChar) {
                return RollService.rollAbility(currentChar, args[0].toUpperCase() as dnd.AbilityScoreName);
            }
            throw new Error('No character loaded')
        case 'save':
            if (currentChar) {
                return RollService.rollSave(currentChar, args[0].toUpperCase() as dnd.AbilityScoreName);
            }
            throw new Error('No character loaded')
        case 'skill':
            if (currentChar) {
                // TODO: Proper casing?
                const skillName = args.join(' ') as dnd.SkillName;
                return RollService.rollSkill(currentChar, skillName);
            }
            throw new Error('No character loaded')
        case 'init':
            if (currentChar) {
                return RollService.rollInitiative(currentChar);
            }
            throw new Error('No character loaded');
        default:
            return "I don't recognize that command";
    }
}
