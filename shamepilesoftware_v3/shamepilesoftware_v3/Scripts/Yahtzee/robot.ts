module AI {
    export class Robot {
        private _dice: Array<{ val: number; held: boolean }>;
        private _totalScore: number;
        private _categories: Categories;

        constructor() {
            this._dice = new Array< { val: number; held: boolean }>();
            this._totalScore = 0;
            this._categories = new Categories();

            for (var i = 0; i < 5; i++) {
                this._dice.push({ val: 0, held: false });
            }
        }

        public roll(): number {
            var total: number = 0;
            var utilities: any = (<any>window).utilities;

            for (var i = 0; i < 5; i++) {
                var val: number = utilities.generateRoll();
                this._dice[i].val = val;
                total += val;
            }

            this._totalScore += total;
            return total;
        }

        public get totalScore(): number {
            return this._totalScore;
        }
    }

    class Categories {
        public numbers: Array<number>;
        public three: number;
        public four: number;
        public small: number;
        public large: number;
        public full: number;
        public chance: number;
        public yatzee: number;

        constructor() {
            this.numbers = [];

            for (var i = 0; i < 6; i++) {
                this.numbers[i] = -1;
            }
            this.three = -1;
            this.four = -1;
            this.small = -1;
            this.large = -1;
            this.full = -1;
            this.chance = -1;
            this.yatzee = -1;
        }
    }
}