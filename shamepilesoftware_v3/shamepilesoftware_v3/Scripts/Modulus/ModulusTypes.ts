module Modulus.Types {

    export interface ModulusScope extends ng.IScope {
        $route: ng.route.IRoute;
        $routeParams: ng.route.IRouteParamsService;
        $location: ng.ILocationService;
        game: any;
        moduleList: Array<string>;
        gameState: GameState;
        getModules: () => void;
        userCharacter: d20Rules.Entities.Character;
    };

    export interface MenuScope extends ng.IScope {
        $route: ng.route.IRoute;
        $rootScope: ng.IRootScopeService;
        $routeParams: ng.route.IRouteParamsService;
        $location: ng.ILocationService;
        Resources: Resources.Constants;
        startModule: (moduleName: string) => void;
        createCharacter: () => void;
        viewLevels: () => void;
    };
    
    export interface CharacterScope extends ng.IScope {
        Resources: Resources.Constants;
        d20Rules: Services.D20Service;
        character: d20Rules.Entities.Character;
        classTypes: Array<Object>;
        currCharacterName: string;
        currCharacterClass: { obj: Object };
        currCharacterClassNum: number;
        roll: () => void;
        save: () => void;
    }

    export interface GameScope extends ng.IScope {
        d20Service: Modulus.Services.D20Service;
        Resources: Resources.Constants;
        character: d20Rules.Entities.Character;
        enemy: d20Rules.Entities.Character;
        gameOutput: string;
        isGameOver: boolean;
        attack: () => void;
        attackByEnemy: (reduction: number) => void;
        defend: () => void;
        takePotion: () => void;
        returnToMenu: () => void;
    }

    export interface CharacterSelectScope extends ng.IScope {
        Resources: Resources.Constants;
        character: d20Rules.Entities.Character;
        startGame: () => void;
        makeCharacter: () => void;
    }

    export interface LevelScope extends ng.IScope {
        levelsData: Resources.Data;
    }

    export enum GameState {
        Menu, // 0
        Playing, // 1
        CreateCharacter // 2
    };
}
