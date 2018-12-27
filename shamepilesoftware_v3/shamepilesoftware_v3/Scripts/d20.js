var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// A namespace that contains all of the d20 rules.
var d20Rules;
(function (d20Rules) {
    // Contains the namespace for characters and monsters.
    var Entities;
    (function (Entities) {
        /**
         * Creates an instance of a character class.
         */
        var CharacterClass = (function () {
            function CharacterClass(name, hitDice) {
                this._name = name;
                this._hitDice = hitDice;
            }
            Object.defineProperty(CharacterClass.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CharacterClass.prototype, "hitDice", {
                get: function () {
                    return this._hitDice;
                },
                enumerable: true,
                configurable: true
            });
            CharacterClass.fromJson = function (data) {
                var characterClass = new CharacterClass(data._name, data._hitDice);
                return characterClass;
            };
            return CharacterClass;
        })();
        Entities.CharacterClass = CharacterClass;
        /**
         * Creates a fighter character.
         */
        var Fighter = (function (_super) {
            __extends(Fighter, _super);
            function Fighter() {
                _super.call(this, "Fighter", 10);
            }
            return Fighter;
        })(CharacterClass);
        Entities.Fighter = Fighter;
        /**
         * Creates a mage character.
         */
        var Mage = (function (_super) {
            __extends(Mage, _super);
            function Mage() {
                _super.call(this, "Mage", 4);
            }
            return Mage;
        })(CharacterClass);
        Entities.Mage = Mage;
        /**
         * A list of character class types.
         */
        (function (CharacterClassType) {
            CharacterClassType[CharacterClassType["Fighter"] = 0] = "Fighter";
            CharacterClassType[CharacterClassType["Mage"] = 1] = "Mage";
        })(Entities.CharacterClassType || (Entities.CharacterClassType = {}));
        var CharacterClassType = Entities.CharacterClassType;
        /**
         * A list of monster types.
         */
        (function (MonsterType) {
            MonsterType[MonsterType["Goblin"] = 0] = "Goblin";
            MonsterType[MonsterType["Skeleton"] = 1] = "Skeleton";
        })(Entities.MonsterType || (Entities.MonsterType = {}));
        var MonsterType = Entities.MonsterType;
        /**
         * Creates a character.
         */
        var Character = (function () {
            function Character(name, charClass, level) {
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
            Object.defineProperty(Character.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "str", {
                get: function () {
                    return this._str;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "dex", {
                get: function () {
                    return this._dex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "con", {
                get: function () {
                    return this._con;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "int", {
                get: function () {
                    return this._int;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "wis", {
                get: function () {
                    return this._wis;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "cha", {
                get: function () {
                    return this._cha;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "maxHP", {
                get: function () {
                    return this._maxHP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "currentHP", {
                get: function () {
                    return this._currentHP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "characterClass", {
                get: function () {
                    return this._charClass;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Character.prototype, "level", {
                get: function () {
                    return this._level;
                },
                enumerable: true,
                configurable: true
            });
            Character.prototype.takeDamage = function (damage) {
                this._currentHP -= damage;
            };
            Character.prototype.heal = function (restored) {
                this._currentHP += restored;
            };
            Character.fromJson = function (data) {
                var char;
                try {
                    var charData = angular.fromJson(data);
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
                }
                catch (ex) {
                    char = new Character("Random Character");
                }
                return char;
            };
            return Character;
        })();
        Entities.Character = Character;
    })(Entities = d20Rules.Entities || (d20Rules.Entities = {}));
    /**
     * A class of helper utilities.
     */
    var Utilities = (function () {
        function Utilities() {
        }
        Utilities.getStat = function (max, min, adjustment) {
            return Math.floor(Math.random() * (max - min + 1)) + min + (adjustment || 0);
        };
        Utilities.getHitPoints = function (level, hitDice) {
            return this.RollDice(hitDice, level);
        };
        Utilities.RollDice = function (diceType, numRolls) {
            var accumulator = 0;
            for (var i = 0; i < numRolls; i++) {
                accumulator += Math.floor((Math.random() * diceType) + 1); // floor() will round down to 0.
            }
            return accumulator;
        };
        return Utilities;
    })();
    d20Rules.Utilities = Utilities;
})(d20Rules || (d20Rules = {}));
//# sourceMappingURL=d20.js.map