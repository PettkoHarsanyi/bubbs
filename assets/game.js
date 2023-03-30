class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.redZones = new Array(this.round.difficulty);
        this.greenZone = new GreenZone(this);
    }
    playing = false;
    ball = {
        x: canvas.width / 2, // LABDA X POZÍCIÓJA
        y: canvas.height / 2, // LABDA Y POZÍCIÓJA
        radius: 10, // LABDA SUGARA
        walkSpeed: 3, // GYALOGLÓ SEBESSÉG
        sprintSpeed: 10, // SPRINTELŐ SEBESSÉG
        speed: 0, // AKTUÁLIS SEBESSÉGMÉRŐ
        sprinting: false,  // SPRINTEL-E
        slow: false,
        upPressed: false, // FELFELE MEGY
        downPressed: false, // LEFELE MEGY
        leftPressed: false, // BALRA MEGY
        rightPressed: false, // JOBBRA MEGY
        getsBonus: false,
        combo: 1,
        isGoneOutOnce: false,
    }
    round = {
        number: 1,
        started: false,
        difficulty: 10, // ENNYIVEL KEZDŐDIK A JÁTÉK
        difficultyGrowth: 5, // ENNYIVEL TÖBB LESZ MINDEN KÖRBEN
        refreshAtRound: 10, // ENNYI KÖRÖNKÉNT NŐ AZ IDŐ
        refreshAdd: 100, // ENNYIVEL
        refresh: 400, // EZREDMÁSODPERC
    }
    // redZones = new Array(this.round.difficulty); // PIROS ZÓNÁK TÖMBJE
    time = 0;
    score = 0;
    scoreGive = 10;

    drawBall() {
        ctx.beginPath();
        ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    setDifficulty() {
        if (this.time % this.round.refresh == 0) {
            this.round.difficulty += this.round.difficultyGrowth;

            if (this.round.number % this.round.refreshAtRound == 0) {
                this.round.refresh += this.round.refreshAdd;
            }

            this.greenZone = new GreenZone(this);

            for (var i = 0; i < this.round.difficulty - (this.round.difficultyGrowth); i++) {
                this.redZones[i] = new RedZone(this);
            }
            
            this.round.number++;
            this.time = 0;
        }
        this.round.started = true;
    }

    checkCollision() {
        if (this.ball.y < this.ball.radius) {
            this.ball.y = this.ball.radius;
        }
        if (this.ball.y > canvas.height - this.ball.radius) {
            this.ball.y = canvas.height - this.ball.radius;
        }
        if (this.ball.x < this.ball.radius) {
            this.ball.x = this.ball.radius;
        }
        if (this.ball.x > canvas.width - this.ball.radius) {
            this.ball.x = canvas.width - this.ball.radius;
        }

        for (var redzonee in this.redZones) {
            var dx = this.ball.x - this.redZones[redzonee].x;
            var dy = this.ball.y - this.redZones[redzonee].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(dx) + Math.abs(dy) != 0 && dist + 3 <= this.ball.radius + this.redZones[redzonee].radius) {
                document.getElementById("endPanel").style.visibility = "visible";
                clearInterval(interval);
                this.playing = false;
            }
        }
    }

    moveBall() {
        if (this.ball.upPressed && this.ball.rightPressed) {
            this.ball.y -= Math.cos(45 * Math.PI / 180) * this.ball.speed;
            this.ball.x += Math.cos(45 * Math.PI / 180) * this.ball.speed;
        } else if (this.ball.upPressed && this.ball.leftPressed) {
            this.ball.y -= Math.cos(45 * Math.PI / 180) * this.ball.speed;
            this.ball.x -= Math.cos(45 * Math.PI / 180) * this.ball.speed;
        } else if (this.ball.leftPressed && this.ball.downPressed) {
            this.ball.y += Math.cos(45 * Math.PI / 180) * this.ball.speed;
            this.ball.x -= Math.cos(45 * Math.PI / 180) * this.ball.speed;
        } else if (this.ball.rightPressed && this.ball.downPressed) {
            this.ball.y += Math.cos(45 * Math.PI / 180) * this.ball.speed;
            this.ball.x += Math.cos(45 * Math.PI / 180) * this.ball.speed;
        } else if (this.ball.upPressed) {
            this.ball.y -= this.ball.speed;
        } else if (this.ball.downPressed) {
            this.ball.y += this.ball.speed;
        } else if (this.ball.leftPressed) {
            this.ball.x -= this.ball.speed;
        } else if (this.ball.rightPressed) {
            this.ball.x += this.ball.speed;
        }

        if (this.ball.sprinting) {
            this.ball.speed = this.ball.sprintSpeed;
        } else {
            this.ball.speed = this.ball.walkSpeed;
        }
    }
}