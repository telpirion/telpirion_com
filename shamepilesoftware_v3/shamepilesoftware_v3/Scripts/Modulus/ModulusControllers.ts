module Modulus.Controllers {

    // The top-level ViewModel.
    class ModulusController {
        public static $inject: string[] = ["$scope", "$rootScope", '$route', '$routeParams', '$location', "playerSettings"];

        constructor(
            $scope: Modulus.Types.ModulusScope,
            $rootScope: ng.IRootScopeService,
            $route: ng.route.IRoute,
            $routeParams: ng.route.IRouteParamsService,
            $location: ng.ILocationService,
            playerSettings: Services.PlayerSettingsService
            ) {

            $scope.userCharacter = playerSettings.loadCharacter() || undefined;
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
        }
    }

    // The ViewModel for the menu page.
    class MenuController {
        public static $inject: string[] = ["$scope", "$rootScope", "Constants", "$location", "$route", "$routeParams"];

        constructor(
            $scope: Modulus.Types.MenuScope,
            $rootScope: ng.IRootScopeService,
            Constants: Resources.Constants,
            $location: ng.ILocationService,
            $route: ng.route.IRoute,
            $routeParams: ng.route.IRouteParamsService
        ) {
            $scope.Resources = Constants;

            $scope.startModule = () => {
                $location.path("/characterSelect");
            };

            $scope.createCharacter = () => {
                $location.path("/Character");
            }

            $scope.viewLevels = () => {
                $location.path("/Levels");
            }
        }
    }

    // The ViewModel for the character page.
    class CharacterController {
        public static $inject: string[] = [
            "$scope",
            "$rootScope",
            "d20Service",
            "Constants",
            "$route",
            "$routeParams",
            "$location",
            "playerSettings"];

        private _playerSettings: Services.PlayerSettingsService;
        private _$rootScope: ng.IRootScopeService;

        constructor(
            $scope: Types.CharacterScope,
            $rootScope: ng.IRootScopeService,
            d20Service: Services.D20Service,
            Constants: Resources.Constants,
            $route: ng.route.IRoute,
            $routeParams: ng.route.IRouteParamsService,
            $location: ng.ILocationService,
            playerSettings: Services.PlayerSettingsService
            ) {
            $scope.d20Rules = d20Service;
            $scope.Resources = Constants;
            $scope.currCharacterName = "";
            this._playerSettings = playerSettings;
            this._$rootScope = $rootScope;

            $scope.classTypes = (() => {
                var classes: Array<Object> = new Array<Object>();
                for (var i in d20Rules.Entities.CharacterClassType) {
                    if ((<any>d20Rules.Entities.CharacterClassType).hasOwnProperty(i)) {
                        if (!isNaN(i)) {
                            classes.push({ text: (<any>d20Rules.Entities.CharacterClassType)[i], id: i });
                        }
                    }
                }
                return classes;
            })();

            $scope.currCharacterClass = { obj: $scope.classTypes[0] };

            $scope.roll = () => {
                var name: string = $scope.currCharacterName;
                var charClass: any = $scope.currCharacterClass;
                var charClassVal: number = Number(charClass.obj.id);
                $scope.character = $scope.d20Rules.CharacterFactory(name, charClassVal);
            }

            // Save the user's current character.
            $scope.save = () => {
                this.saveCharacter($scope.character);
                $location.path("/Game");
            }
        }

        // Save the character to local storage.
        private saveCharacter(character: d20Rules.Entities.Character) {
            this._playerSettings.saveCharacter(character);
            //this._$rootScope["userCharacter"] = character; // Getting the character back out of the root scope is _hard_.
        }
    }

    // The ViewModel for the character select screen.
    class CharacterSelectController {
        public static $injext: string[] = ["$scope", "$rootScope", "Constants", "$route", "$routeParams", "$location", "playerSettings"];

        constructor(
            $scope: Types.CharacterSelectScope,
            $rootScope: ng.IRootScopeService,
            Constants: Resources.Constants,
            $route: ng.route.IRouteService,
            $routeParams: ng.route.IRouteParamsService,
            $location: ng.ILocationService,
            playerSettings: Services.PlayerSettingsService
            ) {
            $scope.Resources = Constants;
            $scope.character = playerSettings.loadCharacter();
            $scope.startGame = () => {
                $location.path("/Game");
            };
            $scope.makeCharacter = () => {
                $location.path("/Character");
            }
        }
    }

    /**
     * The ViewModel for the game page.
     */
    class GameController {
        public static $inject: string[] = [
            "$scope",
            "$rootScope",
            "d20Service",
            "Constants",
            "$route",
            "$routeParams",
            "$location",
            "playerSettings"];

        constructor(
            $scope: Modulus.Types.GameScope,
            $rootScope: ng.IRootScopeService,
            d20Service: Modulus.Services.D20Service,
            Constants: Resources.Constants,
            $route: ng.route.IRouteService,
            $routeParams: ng.route.IRouteParamsService,
            $location: ng.ILocationService,
            playerSettings: Services.PlayerSettingsService
        ) {

            $scope.Resources = Constants;
            $scope.d20Service = d20Service;
            $scope.gameOutput = "";

            $scope.character = playerSettings.loadCharacter() || undefined;
            $scope.enemy = d20Service.MonsterFactory("Goblin", d20Rules.Entities.MonsterType.Goblin);

            $scope.gameOutput += $scope.character.name + " enters the arena.\n";
            $scope.gameOutput += $scope.enemy.name + " enters the arena.\n";

            $scope.attack = (): void => {
                var damage = d20Rules.Utilities.RollDice(6, 1);
                $scope.gameOutput += $scope.character.name + " attacks for " + damage.toString() + ".\n";
                $scope.enemy.takeDamage(damage);
                $scope.gameOutput += $scope.enemy.name + " has " + $scope.enemy.currentHP.toString() + " hit points left.\n";
                
                if ($scope.enemy.currentHP <= 0) {
                    onGameEnd(true);
                } else {
                    $scope.attackByEnemy(1);
                }
            };

            $scope.attackByEnemy = (reduction: number): void => {
                var damage = Math.floor(d20Rules.Utilities.RollDice(3, 1) * reduction);
                $scope.gameOutput += $scope.enemy.name + " attacks for " + damage.toString() + ".\n";
                $scope.character.takeDamage(damage);
                $scope.gameOutput += $scope.character.name + " has " + $scope.character.currentHP.toString() + " hit points left.\n";
                ($scope.character.currentHP <= 0) && onGameEnd(false);
            }

            $scope.takePotion = (): void => {
                var health = d20Rules.Utilities.RollDice(8, 1);
                $scope.character.heal(health);
                $scope.gameOutput += $scope.character.name + " took a potion and regained " + health.toString() + " hit points.\n";
                $scope.attackByEnemy(1);
            }

            $scope.defend = (): void => {
                $scope.gameOutput += $scope.character.name + " defends.\n";
                $scope.attackByEnemy(0.5);
            }

            $scope.returnToMenu = (): void => {
                $location.path("/Menu");
            }

            function onGameEnd(isVictorious: boolean): void {
                $scope.isGameOver = true;
                var outcome = isVictorious ?
                    { victor: $scope.character.name, playerOutcome: "won!" } :
                    { victor: $scope.enemy.name, playerOutcome: "lost." };

                $scope.gameOutput += outcome.victor + " is victorious. You " + outcome.playerOutcome;
            }
        }
    }

    /**
     * The viewmodel for the 'levels' page.()
     */
    class LevelsController {
        public static $inject: string[] = ["$scope", "$rootScope", "Data"];

        constructor(
            $scope: Types.LevelScope,
            $rootScope: ng.IRootScopeService,
            Data: Resources.Data
        ) {
            $scope.levelsData = Data;
        }
    }

    angular.module("Modulus")
        .controller("modulusController", ModulusController)
        .controller("menuController", MenuController)
        .controller("characterController", CharacterController)
        .controller("gameController", GameController)
        .controller("characterSelectController", CharacterSelectController)
        .controller("levelsController", LevelsController);
} 