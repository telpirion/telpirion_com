///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../Scripts/d20.ts" />
///<reference path="../../Scripts/typings/crafty/crafty.d.ts" />
var Modulus;
(function (Modulus) {
    var Services;
    (function (Services) {
        // A service that generates d20 Rules objects.
        var D20Service = (function () {
            function D20Service() {
            }
            D20Service.prototype.CharacterFactory = function (name, classType) {
                var characterClass;
                var character;
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
            };
            D20Service.prototype.MonsterFactory = function (name, monsterType) {
                return this.CharacterFactory(name, d20Rules.Entities.CharacterClassType.Fighter);
            };
            return D20Service;
        })();
        Services.D20Service = D20Service;
        // A service for storing player settings like characters,
        // game states, etc.
        var PlayerSettingsService = (function () {
            function PlayerSettingsService() {
                this.CHAR_KEY = "ModulusCharacter";
            }
            PlayerSettingsService.prototype.saveCharacter = function (character) {
                var characterString = angular.toJson(character);
                window.localStorage.setItem(this.CHAR_KEY, characterString);
            };
            PlayerSettingsService.prototype.loadCharacter = function () {
                var characterString = window.localStorage.getItem(this.CHAR_KEY);
                var character = characterString ?
                    d20Rules.Entities.Character.fromJson(characterString) : undefined;
                return character;
            };
            PlayerSettingsService.$inject = [];
            return PlayerSettingsService;
        })();
        Services.PlayerSettingsService = PlayerSettingsService;
        angular.module("Modulus")
            .service("d20Service", Services.D20Service)
            .service("playerSettings", Services.PlayerSettingsService);
    })(Services = Modulus.Services || (Modulus.Services = {}));
})(Modulus || (Modulus = {}));
//# sourceMappingURL=ModulusServices.js.map