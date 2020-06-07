import * as dnd from 'dnd5e';

export type AbilityScore = {
    name: dnd.AbilityScoreName;
    value: number;
    modifier: number;
}

export type Skill = {
    name: dnd.SkillName;
    modifier: number
}

export type Save = {
    name: dnd.AbilityScoreName
    modifier: number;
}

export type HitPoints = {
    current: number;
    max: number;
}

export interface Character {
    userId: string;
    name: string;
    abilities: AbilityScore[];
    saves: Save[];
    skills: Skill[];
    hp: HitPoints;
    ac: number;
    speed: number;
    passivePerception: number;
    initiative: number;
}
