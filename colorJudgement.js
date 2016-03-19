window.onload = function() {
    var timer;
    var btnStart = document.getElementById('start');
    var beginPanel = document.querySelector('.game-begin');
    var gamePanel = document.querySelector('.game');
    var game = document.querySelector('.game-panel');
    var score = document.querySelector('.score');
    var time = document.querySelector('.time');

    var template = '<span class="item" data-mun=""></span>';

    // 暂时的
    // beginPanel.style.display = 'block';
    // gamePanel.style.display = 'none';
    init();
    initGrid(6);

    /*开始游戏*/
    btnStart.addEventListener('click', function(e) {
        beginPanel.style.display = 'none';
        gamePanel.style.display = 'block';

        init();

        // 开始计时
        var timeLeft = 60;
        timer = setInterval(function() {
            timeLeft --;
            time.innerHTML = timeLeft;
            if (timeLeft == 0) {
                clearInterval(timer);
            }

            initGrid(1);

            // 游戏
            gameBegin();

        }, 1000);

    }, false);


    // 初始化
    function init() {
        var width = game.clientWidth;
        game.style.height = width + 'px';
        // game.innerHTML = template;

    };

    /**
     * 生成格子
     * @param  {[type]} level [表示进行到第几级，取大于等于1的数]
     * @return {[type]}       [description]
     */
    function initGrid(level) {
        var template = '<span class="item" data-mun=""></span>';
        game.innerHTML = '';

        var rule = [2, 3, 4, 5, 5, 6, 6, 7, 7, 8];
        // 根据规则取得行数
        var row = rule[level - 1];
        if (level > rule.length) {
            row = rule[rule.length - 1];
        }
        console.log('行数', row);

        // 总格子数
        var total = row * row;
        // console.log(total);
        var color = getRandomColor();
        // var diffColor = generateSimilerColor(color);
        var diffColor = getRandomColor();
        // 生成一个1-total之间的随机数
        var diffIndex = Math.floor(Math.random() * total) + 1;
        console.log(diffIndex);
        for (var j = 1; j <= total; j ++) {
            var span = document.createElement('span');
            span.className = 'item';
            span.dataset['num'] = j;
            span.style.backgroundColor = color;
            span.style.width = (Math.floor(100/row - 2*2*row/game.clientWidth)) + '%';
            span.style.height = span.style.width;
            // 不同的颜色块
            if (j == diffIndex) {
                span.style.backgroundColor = diffColor;
                span.addEventListener('click', function() {
                    initGrid(level + 1);
                }, false);
            }
            game.appendChild(span);
        }

    }

    // 游戏
    function gameBegin() {
        initGrid(0);
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
    function generateSimilerColor(hsl, level) {
        // 定义10种难度
        var levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // 取出饱和度
        var s = /\d/.exec(hsl.split(',')[1].trim())[0];
        // 通过调整饱和度来控制颜色
        // var similar = Math.abs()
    }

    window.onresize = function() {
        game.style.height = game.clientWidth + 'px';
    };


};
