module Modulus.Resources {
    export class Constants {

        public static Menu: Object = {
            menu: "Menu",
            loadGame: "Load game",
            createCharacter: "Create new character",
            viewLevels: "View game levels"
        }

        public static Game: Object = {
            playingGame: "Playing game",
            attack: "Attack",
            defend: "Defend",
            takePotion: "Take a healing potion",
            returnToMenu: "Return to menu"
        }
        
        public static Character: Object = {
            roll: "Roll",
            keep: "Keep this chararacter"
        }

        public static CharacterSelect: Object = {
            characterName: "Character name:",
            level: "Level",
            selectCharacter: "Select a character",
            playGame: "Start the game",
            maxHP: "Max hit points:",
            noCharacterInMemory: "You don't have any characters created yet. Go build one!"
        }
    }

    export class Data {
        public static Levels: string[] = ["Texttastic (level 1)"]
    }

    angular.module("Modulus")
        .constant("Constants", Constants)
        .constant("Data", Data);
} 