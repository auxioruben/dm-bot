import { Character } from '../models/character'
import * as dnd from 'dnd5e'

type RollDef = {
    numDice: number;
    sides: number;
    modifier: number;
}

type RollResult = {
    rolls: number[];
    modifier: number[];
    result: number;
}

export function parse(dice: string) {
    const re = /(\d+)?d(\d+)(\+(\d+))?/;
    let parseResult = re.exec(dice);
    if (parseResult) {
        return {
            numDice: Number(parseResult[1] ?? 1),
            sides: Number(parseResult[2]),
            modifier: Number(parseResult[4] ?? 0)
        };
    }
    throw new Error(`Invalid roll request: ${dice}`);
}

export function roll(rollDef : RollDef) {
    let rolls: number[] = [];
    for (let i = 0; i < rollDef.numDice; i++) {
        rolls.push(rollDie(rollDef.sides));
    }
    return {
        rolls: rolls,
        modifier: rollDef.modifier,
        result: rolls.reduce((b,c) => b + c, rollDef.modifier)
    };
}

function rolld20(modifier: number) {
    return roll({
        numDice: 1,
        sides: 20,
        modifier: modifier
    });
}

export function rollAbility(char: Character, abilityName: dnd.AbilityScoreName) {
    const modifier = char.abilities.find((a) => a.name == abilityName)?.modifier;
    if (modifier !== undefined) {
        return rolld20(modifier)
    }
    throw new Error(`Ability ${abilityName} is not defined for character ${char.name}`);
}

export function rollSave(char: Character, abilityName: dnd.AbilityScoreName) {
    const modifier = char.saves.find((a) => a.name == abilityName)?.modifier;
    if (modifier !== undefined){
        return rolld20(modifier);
    }
    throw new Error(`Save ${abilityName} is not defined for character ${char.name}`);
}


export function rollSkill(char: Character, skillName: dnd.SkillName) {
    const modifier = char.skills.find((s) => s.name == skillName)?.modifier;
    if (modifier !== undefined) {
        return rolld20(modifier);
    }
    throw new Error(`Skill ${skillName} is not defined for character ${char.name}`);
}

export function rollInitiative(char: Character) {
    const modifier = char.initiative;
    return rolld20(modifier);
}

function rollDie(nSides: number) {
    return Math.floor(Math.random() * (nSides - 1)) + 1;
}

