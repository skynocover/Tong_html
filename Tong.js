var Bug = /** @class */ (function () {
    function Bug(type) {
        this.type = type;
    }
    Bug.prototype.series = function () {
        if (this.type == 0) {
            return 10; //表示被吃掉
        }
        return Math.ceil(this.type / 5);
    };
    return Bug;
}());
var BugBlock = /** @class */ (function () {
    function BugBlock(width, height) {
        this.block = [[], [], [], [], []];
        var arr = new Array;
        for (var i = 0; i < width; i++) {
            while (this.block[i].length < 5) {
                var rand = Math.floor(Math.random() * width * height) + 1;
                if (arr.indexOf(rand) == -1) {
                    arr.push(rand);
                    this.block[i].push(new Bug(rand));
                }
            }
        }
    }
    BugBlock.prototype.show = function () {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                document.getElementById(String(i * 10 + j)).innerHTML = '<img src="./file/' + this.block[i][j].type + '.png" alt="" height="100" />';
            }
        }
    };
    return BugBlock;
}());
var chameleon = /** @class */ (function () {
    function chameleon() {
        this.position = 0; //變色龍的位置
    }
    chameleon.prototype.side = function () {
        switch (this.position) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                return 0; //上方
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return 1; //右方
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                return 2; //下方
            default:
                return 3; //左方
        }
    };
    chameleon.prototype.face = function () {
        var arr = [];
        switch (this.side()) {
            case 0:
                for (var i = 0; i < 5; i++) {
                    arr.push(Bugs.block[i][this.position]);
                }
                break;
            case 1:
                for (var i = 0; i < 5; i++) {
                    arr.push(Bugs.block[this.position - 5][i]);
                }
                break;
            case 2:
                for (var i = 0; i < 5; i++) {
                    arr.push(Bugs.block[i][14 - this.position]);
                }
                break;
            default:
                for (var i = 0; i < 5; i++) {
                    arr.push(Bugs.block[19 - this.position][i]);
                }
                break;
        }
        return arr;
    };
    chameleon.prototype.checkposition = function (i, j) {
        if (Bugs.block[i][j].series() == 10) { //若點擊到被吃掉的則錯誤
            alert("點選錯誤");
            return false;
        }
        switch (this.side()) { //確認變色龍位置
            //在上或下
            case 0:
            case 2:
                if (j == this.position || this.position + j == 14) { //確認點選的X與變色龍相同位置                    
                    return true;
                }
                else { //點選的X與變色龍不在相同位置
                    alert("點選錯誤");
                    return false;
                }
            //在左或右
            default:
                if (i == this.position - 5 || this.position + i == 19) {
                    return true;
                }
                else {
                    alert("點選錯誤");
                    return false;
                }
        }
    };
    chameleon.prototype.eat = function (i, j) {
        var num = 0;
        if (this.checkposition(i, j)) {
            var check_1 = Bugs.block[i][j].series(); //點選的蟲子類型
            this.face().forEach(function (value) {
                if (value.series() == check_1) {
                    num++;
                    value.type = 0;
                }
            });
        }
        cham.position = cham.position + num;
        if (cham.position > 19) {
            cham.position = cham.position - 20;
        }
    };
    chameleon.prototype.show = function () {
        for (var i = 0; i < 20; i++) { //隱藏所有的變色龍格子         
            document.getElementById('a' + i).innerHTML = '<img src="./file/chameleon.png" alt="" height="100" style="VISIBILITY: hidden">';
        }
        //將變色龍圖片放入變色龍的位置       
        document.getElementById('a' + cham.position).innerHTML = '<img src="./file/chameleon.png" alt="" height="100" >';
    };
    chameleon.prototype.checksess = function () {
        var num = 0;
        this.face().forEach(function (value) {
            if (value.series() == 10) {
                num = num + 1;
            }
        });
        if (num == 5) { //若面前的蟲子都被吃過則確認是否成功
            num = 0;
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    if (Bugs.block[i][j].series() == 10) {
                        num++;
                    }
                }
            }
            if (num == 25) {
                confirm("挑戰成功");
            }
            else if (confirm("挑戰失敗,是否重新挑戰")) {
                window.location.reload();
            }
        }
    };
    return chameleon;
}());
var Bugs;
var cham = new chameleon;
function init() {
    Bugs = new BugBlock(5, 5);
    cham.position = 0;
    Bugs.show();
    cham.show();
}
