// A namespace that contains all of the d20 rules.
module d20Rules {
 
    // Contains the namespace for characters and monsters.
    export module Entities {
        export interface ICharacterClass {
            name: string;
            hitDice: number;
        }

        /**
         * Creates an instance of a character class.
         */
        export class CharacterClass implements ICharacterClass {
            private _name;
            private _hitDice;

            constructor(name: string, hitDice: number) {
                this._name = name;
                this._hitDice = hitDice;
            }

            public get name(): string {
                return this._name;
            }
            public get hitDice(): number {
                return this._hitDice;
            }

            public static fromJson(data: any) {
                var characterClass: CharacterClass = new CharacterClass(data._name, data._hitDice);
                return characterClass;
            }
        }

        /**
         * Creates a fighter character.
         */
        export class Fighter extends CharacterClass {
            constructor() {
                super("Fighter", 10);
            }
        }

        /**
         * Creates a mage character.
         */
        export class Mage extends CharacterClass {
            constructor() {
                super("Mage", 4);
            }
        }

        /**
         * A list of character class types.
         */
        export enum CharacterClassType {
            "Fighter",
            "Mage"
        }

        /**
         * A list of monster types.
         */
        export enum MonsterType {
            "Goblin",
            "Skeleton"
        }

        /**
         * Base interface for characters and monsters.
         */
        export interface IEntity {
            name: string;
            str: number;
            dex: number;
            con: number;
            int: number;
            wis: number;
            cha: number;
            characterClass?: CharacterClass;
            monsterType?: MonsterType;
            maxHP: number;
            currentHP: number;
            level?: number;
            takeDamage: (damage: number) => void;
        }

        /**
         * Creates a character.
         */
        export class Character implements IEntity {
            private _name: string;
            private _str: number;
            private _dex: number;
            private _con: number;
            private _int: number;
            private _wis: number;
            private _cha: number;
            private _charClass: CharacterClass;
            private _maxHP: number;
            private _currentHP: number;
            private _level: number;

            constructor(name: string);
            constructor(name: string, charClass: CharacterClass, level: number);
            constructor(name?: string, charClass?: CharacterClass, level?: number) {
                this._name = name || "NPC";
                this._charClass = charClass || new CharacterClass("NPC", 4); // TODO. replace with an NPC class.
                this._level = level || 1;
                this._str = Utilities.getStat(18, 3);
                this._dex = Utilities.getStat(18, 3);
                this._con = Utilities.getStat(18, 3);
                this._int = Utilities.getStat(18, 3);
                this._wis = Utilities.getStat(18, 3);
                this._cha = Utilities.getStat(18, 3);
                this._maxHP = Utilities.getStat(this._level, this._charClass.hitDice);
                this._currentHP = this._maxHP;
            }

            public get name(): string {
                return this._name;
            }
            public get str(): number {
                return this._str;
            }
            public get dex(): number {
                return this._dex;
            }
            public get con(): number {
                return this._con;
            }
            public get int(): number {
                return this._int;
            }
            public get wis(): number {
                return this._wis;
            }
            public get cha(): number {
                return this._cha;
            }
            public get maxHP(): number {
                return this._maxHP;
            }
            public get currentHP(): number {
                return this._currentHP;
            }
            public get characterClass(): CharacterClass {
                return this._charClass;
            }
            public get level(): number {
                return this._level;
            }

            public takeDamage(damage: number) {
                this._currentHP -= damage;
            }

            public heal(restored: number) {
                this._currentHP += restored;
            }

            public static fromJson(data: string): Character {
                var char: Character;
                try {
                    var charData: any = angular.fromJson(data);
                    char = new Character(charData["_name"]);
                    char._cha = charData._cha;
                    char._con = charData._con;
                    char._charClass = CharacterClass.fromJson(charData._charClass);
                    char._dex = charData._dex;
                    char._maxHP = charData._maxHP;
                    char._currentHP = char._maxHP;
                    char._int = charData._int;
                    char._level = charData._level;
                    char._str = charData._str;
                    char._wis = charData._wis;

                } catch (ex) {
                    char = new Character("Random Character");
                }

                return char;
            }
        }
    }
    
    /**
     * A class of helper utilities.
     */
    export class Utilities {
        public static getStat(max: number, min: number, adjustment?: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min + (adjustment || 0);
        }

        public static getHitPoints(level: number, hitDice: number): number {
            return this.RollDice(hitDice, level);
        }

        public static RollDice(diceType: number, numRolls: number): number {
            var accumulator = 0;
            for (var i = 0; i < numRolls; i++) {
                accumulator += Math.floor((Math.random() * diceType) + 1); // floor() will round down to 0.
            }
            return accumulator;
        }
    }

} 