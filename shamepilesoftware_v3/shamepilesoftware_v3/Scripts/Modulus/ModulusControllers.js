var Modulus;
(function (Modulus) {
    var Controllers;
    (function (Controllers) {
        // The top-level ViewModel.
        var ModulusController = (function () {
            function ModulusController($scope, $rootScope, $route, $routeParams, $location, playerSettings) {
                $scope.userCharacter = playerSettings.loadCharacter() || undefined;
                $scope.$route = $route;
                $scope.$location = $location;
                $scope.$routeParams = $routeParams;
            }
            ModulusController.$inject = ["$scope", "$rootScope", '$route', '$routeParams', '$location', "playerSettings"];
            return ModulusController;
        })();
        // The ViewModel for the menu page.
        var MenuController = (function () {
            function MenuController($scope, $rootScope, Constants, $location, $route, $routeParams) {
                $scope.Resources = Constants;
                $scope.startModule = function () {
                    $location.path("/characterSelect");
                };
                $scope.createCharacter = function () {
                    $location.path("/Character");
                };
                $scope.viewLevels = function () {
                    $location.path("/Levels");
                };
            }
            MenuController.$inject = ["$scope", "$rootScope", "Constants", "$location", "$route", "$routeParams"];
            return MenuController;
        })();
        // The ViewModel for the character page.
        var CharacterController = (function () {
            function CharacterController($scope, $rootScope, d20Service, Constants, $route, $routeParams, $location, playerSettings) {
                var _this = this;
                $scope.d20Rules = d20Service;
                $scope.Resources = Constants;
                $scope.currCharacterName = "";
                this._playerSettings = playerSettings;
                this._$rootScope = $rootScope;
                $scope.classTypes = (function () {
                    var classes = new Array();
                    for (var i in d20Rules.Entities.CharacterClassType) {
                        if (d20Rules.Entities.CharacterClassType.hasOwnProperty(i)) {
                            if (!isNaN(i)) {
                                classes.push({ text: d20Rules.Entities.CharacterClassType[i], id: i });
                            }
                        }
                    }
                    return classes;
                })();
                $scope.currCharacterClass = { obj: $scope.classTypes[0] };
                $scope.roll = function () {
                    var name = $scope.currCharacterName;
                    var charClass = $scope.currCharacterClass;
                    var charClassVal = Number(charClass.obj.id);
                    $scope.character = $scope.d20Rules.CharacterFactory(name, charClassVal);
                };
                // Save the user's current character.
                $scope.save = function () {
                    _this.saveCharacter($scope.character);
                    $location.path("/Game");
                };
            }
            // Save the character to local storage.
            CharacterController.prototype.saveCharacter = function (character) {
                this._playerSettings.saveCharacter(character);
                //this._$rootScope["userCharacter"] = character; // Getting the character back out of the root scope is _hard_.
            };
            CharacterController.$inject = [
                "$scope",
                "$rootScope",
                "d20Service",
                "Constants",
                "$route",
                "$routeParams",
                "$location",
                "playerSettings"];
            return CharacterController;
        })();
        // The ViewModel for the character select screen.
        var CharacterSelectController = (function () {
            function CharacterSelectController($scope, $rootScope, Constants, $route, $routeParams, $location, playerSettings) {
                $scope.Resources = Constants;
                $scope.character = playerSettings.loadCharacter();
                $scope.startGame = function () {
                    $location.path("/Game");
                };
                $scope.makeCharacter = function () {
                    $location.path("/Character");
                };
            }
            CharacterSelectController.$injext = ["$scope", "$rootScope", "Constants", "$route", "$routeParams", "$location", "playerSettings"];
            return CharacterSelectController;
        })();
        /**
         * The ViewModel for the game page.
         */
        var GameController = (function () {
            function GameController($scope, $rootScope, d20Service, Constants, $route, $routeParams, $location, playerSettings) {
                $scope.Resources = Constants;
                $scope.d20Service = d20Service;
                $scope.gameOutput = "";
                $scope.character = playerSettings.loadCharacter() || undefined;
                $scope.enemy = d20Service.MonsterFactory("Goblin", d20Rules.Entities.MonsterType.Goblin);
                $scope.gameOutput += $scope.character.name + " enters the arena.\n";
                $scope.gameOutput += $scope.enemy.name + " enters the arena.\n";
                $scope.attack = function () {
                    var damage = d20Rules.Utilities.RollDice(6, 1);
                    $scope.gameOutput += $scope.character.name + " attacks for " + damage.toString() + ".\n";
                    $scope.enemy.takeDamage(damage);
                    $scope.gameOutput += $scope.enemy.name + " has " + $scope.enemy.currentHP.toString() + " hit points left.\n";
                    if ($scope.enemy.currentHP <= 0) {
                        onGameEnd(true);
                    }
                    else {
                        $scope.attackByEnemy(1);
                    }
                };
                $scope.attackByEnemy = function (reduction) {
                    var damage = Math.floor(d20Rules.Utilities.RollDice(3, 1) * reduction);
                    $scope.gameOutput += $scope.enemy.name + " attacks for " + damage.toString() + ".\n";
                    $scope.character.takeDamage(damage);
                    $scope.gameOutput += $scope.character.name + " has " + $scope.character.currentHP.toString() + " hit points left.\n";
                    ($scope.character.currentHP <= 0) && onGameEnd(false);
                };
                $scope.takePotion = function () {
                    var health = d20Rules.Utilities.RollDice(8, 1);
                    $scope.character.heal(health);
                    $scope.gameOutput += $scope.character.name + " took a potion and regained " + health.toString() + " hit points.\n";
                    $scope.attackByEnemy(1);
                };
                $scope.defend = function () {
                    $scope.gameOutput += $scope.character.name + " defends.\n";
                    $scope.attackByEnemy(0.5);
                };
                $scope.returnToMenu = function () {
                    $location.path("/Menu");
                };
                function onGameEnd(isVictorious) {
                    $scope.isGameOver = true;
                    var outcome = isVictorious ?
                        { victor: $scope.character.name, playerOutcome: "won!" } :
                        { victor: $scope.enemy.name, playerOutcome: "lost." };
                    $scope.gameOutput += outcome.victor + " is victorious. You " + outcome.playerOutcome;
                }
            }
            GameController.$inject = [
                "$scope",
                "$rootScope",
                "d20Service",
                "Constants",
                "$route",
                "$routeParams",
                "$location",
                "playerSettings"];
            return GameController;
        })();
        /**
         * The viewmodel for the 'levels' page.()
         */
        var LevelsController = (function () {
            function LevelsController($scope, $rootScope, Data) {
                $scope.levelsData = Data;
            }
            LevelsController.$inject = ["$scope", "$rootScope", "Data"];
            return LevelsController;
        })();
        angular.module("Modulus")
            .controller("modulusController", ModulusController)
            .controller("menuController", MenuController)
            .controller("characterController", CharacterController)
            .controller("gameController", GameController)
            .controller("characterSelectController", CharacterSelectController)
            .controller("levelsController", LevelsController);
    })(Controllers = Modulus.Controllers || (Modulus.Controllers = {}));
})(Modulus || (Modulus = {}));
//# sourceMappingURL=ModulusControllers.js.map