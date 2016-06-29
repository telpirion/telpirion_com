var Modulus;
(function (Modulus) {
    var Resources;
    (function (Resources) {
        var Constants = (function () {
            function Constants() {
            }
            Constants.Menu = {
                menu: "Menu",
                loadGame: "Load game",
                createCharacter: "Create new character",
                viewLevels: "View game levels"
            };
            Constants.Game = {
                playingGame: "Playing game",
                attack: "Attack",
                defend: "Defend",
                takePotion: "Take a healing potion",
                returnToMenu: "Return to menu"
            };
            Constants.Character = {
                roll: "Roll",
                keep: "Keep this chararacter"
            };
            Constants.CharacterSelect = {
                characterName: "Character name:",
                level: "Level",
                selectCharacter: "Select a character",
                playGame: "Start the game",
                maxHP: "Max hit points:",
                noCharacterInMemory: "You don't have any characters created yet. Go build one!"
            };
            return Constants;
        })();
        Resources.Constants = Constants;
        var Data = (function () {
            function Data() {
            }
            Data.Levels = ["Texttastic (level 1)"];
            return Data;
        })();
        Resources.Data = Data;
        angular.module("Modulus")
            .constant("Constants", Constants)
            .constant("Data", Data);
    })(Resources = Modulus.Resources || (Modulus.Resources = {}));
})(Modulus || (Modulus = {}));
//# sourceMappingURL=ModulusResources.js.map