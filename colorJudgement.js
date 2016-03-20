window.onload = function() {
    var timer;
    var totalTime = 300;
    var btnStart = document.getElementById('start');
    var btnRestart = document.getElementById('restart');
    var beginPanel = document.querySelector('.game-begin');
    var gamePanel = document.querySelector('.game');
    var overPanel = document.querySelector('.game-over');
    var game = document.querySelector('.game-panel');
    var score = document.querySelector('.score');
    var time = document.querySelector('.time');

    var result = ['瞎子', '色郎', '大色狼'];

    // 暂时的
    beginPanel.style.display = 'block';
    gamePanel.style.display = 'none';
    // init();
    // initGrid(1);

    //
    btnStart.addEventListener('click', function(e) {
        gameStart();
    }, false);
    btnRestart.addEventListener('click', function(e) {
        gameStart();
    }, false);


    // 初始化
    function init() {
        beginPanel.style.display = 'none';
        gamePanel.style.display = 'block';
        overPanel.style.display = 'none';
        var width = game.clientWidth;
        game.style.height = width + 'px';
        // game.style.height = game.offsetWidth + 'px';
        time.innerHTML = totalTime;
        score.innerHTML = '0';
    }

    /**
     * 生成格子
     * @param  {[type]} level [表示进行到第几级，取大于等于1的数]
     * @return {[type]}       [description]
     */
    function initGrid(level) {
        game.innerHTML = '';

        var rule = [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9];
        // 根据规则取得行数
        var row = level > rule.length ? rule[rule.length - 1] : rule[level - 1];

        // console.log('行数', row);

        // 总格子数
        var total = row * row;
        // console.log(total);
        var color = getRandomColor();
        var diffColor = generateSimilarColor(color, level);
        // 生成一个[1-total]之间的随机数
        var diffIndex = Math.floor(Math.random() * total) + 1;
        for (var j = 1; j <= total; j ++) {
            var span = document.createElement('span');
            var margin = 100 * 2 / game.clientWidth + '%';
            var width = 100 * ((game.clientWidth - (row - 1) * 2) / row) / game.clientWidth + '%';
            span.className = 'grid';
            span.dataset['num'] = j;
            span.style.backgroundColor = color;
            // span.style.width = (Math.floor(100/row - 3*row*row/game.clientWidth)) + '%';
            // span.style.width = ((game.clientWidth - (row - 1) * 2) / row) + 'px';
            // span.style.width = 100 * ((game.clientWidth - (row - 1) * 2) / row) / game.clientWidth + '%';
            span.style.width = width;
            span.style.height = width;
            span.style.marginRight = margin;
            span.style.marginBottom = margin;
            if (j % row == 0) {
                span.style.marginRight = '0px';
            }
            if (j > (total - row)) {
                console.log('>>',j)
                span.style.marginBottom = '0px';
            }
            // 不同的颜色块
            if (j == diffIndex) {
                span.style.backgroundColor = diffColor;
                span.addEventListener('click', function() {
                    initGrid(level + 1);
                    // 计算得分
                    calcScore(level);
                }, false);
            }
            game.appendChild(span);
        }

    }

    // 游戏开始
    function gameStart() {
        init();
        // 游戏开始
        initGrid(1);
        // 开始计时
        var timeLeft = totalTime;
        timer = setInterval(function() {
            timeLeft --;
            time.innerHTML = timeLeft;
            if (timeLeft < 0) {
                clearInterval(timer);
                // 游戏结束
                gameOver();
            }
        }, 1000);
    }

    // 游戏结束
    function gameOver() {
        gamePanel.style.display = 'none';
        overPanel.style.display = 'block';
        console.log(Number(score.innerHTML));
        var desc = score.innerHTML < 20 ? result[0] : (score.innerHTML > 30 ? result[2] : result[1]);
        overPanel.querySelector('.endScore').innerHTML = desc + ' lv: ' + score.innerHTML;
    }

    // 生成随机颜色
    function getRandomColor() {
        // 色相 0 ~ 360
        var h = Math.floor(Math.random() * 361);
        // 饱和度 0% ~ 100%
        var s = Math.floor(Math.random() * 101) + '%';
        // 取20% ~ 80%的亮度，避免太暗和太亮
        var l = Math.floor(Math.random() * 41 + 20) + '%';
        return 'hsl(' + h + ',' + s + ',' + l + ')';
    }

    // 生成相近颜色
    function generateSimilarColor(hsl, level) {
        // 定义9种难度
        var difficultyLevel = {
            1: [35, 45],
            2: [30, 40],
            3: [25, 35],
            4: [20, 30],
            5: [15, 25],
            6: [10, 20],
            7: [5, 15],
            8: [0, 10],
            9: [0, 5]
        };
        // 取出饱和度
        var temp = hsl.split(',');
        var s = Number(/\d+/.exec(temp[1].trim())[0]);
        var diffS;
        // 通过调整饱和度来控制颜色
        // 难度呈指数倍增加
        var dl = Math.ceil(Math.sqrt(level) + 1);
        if (dl > 9) {
            dl = 9;
        }
        console.log('难度', dl);
        var random = Math.random();
        diffS = (s >= 50) ? s - Math.floor(random * 10 + difficultyLevel[dl][1]) : s + Math.floor(random * 10 + difficultyLevel[dl][0]);
        //
        temp[1] = diffS + '%';
        var diffHsl = temp.join(',');
        return diffHsl;
    }

    // 计算得分
    function calcScore(level) {
        score.innerHTML = level;
    }

    window.onresize = function() {
        game.style.height = game.clientWidth + 'px';
    };
};
