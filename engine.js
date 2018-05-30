var timerID = null;

function startGame() {

    var url = window.location.search;
    var level_game = url.replace("?", "");
    var seconds = 0;

    if (level_game == 1) {
        seconds = 120;
    }
    if (level_game == 2) {
        seconds = 60;
    }
    if (level_game == 3) {
        seconds = 30;
    }
    if (level_game == 4) {
        seconds = 5;
    }

    document.getElementById('storm').innerHTML = seconds;

    var enemy_qnt = 42;
    spawn_enemy(enemy_qnt);
    document.getElementById('enemy_alive').innerHTML = enemy_qnt;
    document.getElementById('enemy_dead').innerHTML = 0;

    countdown(seconds + 1);
}

function countdown(seconds) {
    seconds = seconds - 1;
    if (seconds == -1) {
        clearTimeout(timerID);
        game_over();
        return false;
    }

    document.getElementById('storm').innerHTML = seconds;
    timerID = setTimeout("countdown(" + seconds + ")", 1000);
}

function game_over() {
    kill_game();
    alert('Game Over! Try again!');
}

function spawn_enemy(enemy_qnt) {
    for (var i = 1; i <= enemy_qnt; i++) {
        var enemy = document.createElement("img");
        enemy.src = 'imagens/balao_azul_pequeno.png'
        enemy.style.margin = '10px';
        enemy.id = 'enemyID_' + i;
        enemy.onclick = function () {
            shot_enemy(this);
        }
        document.getElementById('background').appendChild(enemy);

    }
}

function shot_enemy(shot) {
    var enemy_id = shot.id
    document.getElementById(enemy_id).setAttribute("onclick","")
    document.getElementById(enemy_id).src = 'imagens/rip.png'
    enemyCountdown(-1);
}

function enemyCountdown(hit) {
    var enemy_alive = document.getElementById('enemy_alive').innerHTML;
    var enemy_dead = document.getElementById('enemy_dead').innerHTML;
    enemy_alive = parseInt(enemy_alive);
    enemy_dead = parseInt(enemy_dead);
    enemy_alive = enemy_alive + hit;
    enemy_dead = enemy_dead - hit;
    document.getElementById('enemy_alive').innerHTML = enemy_alive;
    document.getElementById('enemy_dead').innerHTML = enemy_dead;
    
    status_game(enemy_alive);
}

function status_game(enemy_alive){
        if(enemy_alive == 0){
            alert("#1 BATTLE ROYALE")
            end_game();
        }
}

function end_game(){
    clearTimeout(timerID);
}

function kill_game() {
    var i = 1;   
    while(document.getElementById('enemyID_'+i)) {        
        document.getElementById('enemyID_'+i).onclick = '';
        i++; 
    }
}