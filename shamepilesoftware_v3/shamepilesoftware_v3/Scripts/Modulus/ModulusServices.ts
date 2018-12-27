///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../Scripts/d20.ts" />
///<reference path="../../Scripts/typings/crafty/crafty.d.ts" />
module Modulus.Services {

    // A service that generates d20 Rules objects.
    export class D20Service {
        public CharacterFactory(name: string, classType: d20Rules.Entities.CharacterClassType):
            d20Rules.Entities.Character {

            var characterClass: d20Rules.Entities.CharacterClass;
            var character: d20Rules.Entities.Character;
            switch (classType) {
                case d20Rules.Entities.CharacterClassType.Fighter:
                    characterClass = new d20Rules.Entities.Fighter();
                    break;
                case d20Rules.Entities.CharacterClassType.Mage:
                    characterClass = new d20Rules.Entities.Mage();
                    break;
                default:
                    characterClass = new d20Rules.Entities.CharacterClass("unknown", 3);
                    break;
            }
            character = new d20Rules.Entities.Character(name, characterClass, 1);
            return character;
        }

        public MonsterFactory(name: string, monsterType: d20Rules.Entities.MonsterType): d20Rules.Entities.Character {
            return this.CharacterFactory(
                name,
                d20Rules.Entities.CharacterClassType.Fighter);
        }
    }

    // A service for storing player settings like characters,
    // game states, etc.
    export class PlayerSettingsService {
        public static $inject: string[] = [];

        private CHAR_KEY: string = "ModulusCharacter";

        constructor() {
        }

        public saveCharacter(character: d20Rules.Entities.Character) {
            var characterString = angular.toJson(character);
            window.localStorage.setItem(this.CHAR_KEY, characterString);
        }

        public loadCharacter(): d20Rules.Entities.Character {
            var characterString = window.localStorage.getItem(this.CHAR_KEY);
            var character: d20Rules.Entities.Character = characterString ?
                d20Rules.Entities.Character.fromJson(characterString) : undefined;
            return character;
        }
    }

    angular.module("Modulus")
        .service("d20Service", Services.D20Service)
        .service("playerSettings", Services.PlayerSettingsService);
} 