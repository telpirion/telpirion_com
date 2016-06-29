var AI;
(function (AI) {
    var Robot = (function () {
        function Robot() {
            this._dice = new Array();
            this._totalScore = 0;
            this._categories = new Categories();
            for (var i = 0; i < 5; i++) {
                this._dice.push({ val: 0, held: false });
            }
        }
        Robot.prototype.roll = function () {
            var total = 0;
            var utilities = window.utilities;
            for (var i = 0; i < 5; i++) {
                var val = utilities.generateRoll();
                this._dice[i].val = val;
                total += val;
            }
            this._totalScore += total;
            return total;
        };
        Object.defineProperty(Robot.prototype, "totalScore", {
            get: function () {
                return this._totalScore;
            },
            enumerable: true,
            configurable: true
        });
        return Robot;
    })();
    AI.Robot = Robot;
    var Categories = (function () {
        function Categories() {
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
        return Categories;
    })();
})(AI || (AI = {}));