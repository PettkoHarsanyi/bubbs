class GreenZone{
    constructor(game) {
        this.game = game
        this.radius = 50; // ZÖLD ZÓNA SUGARA
        this.x = getRndInteger(this.radius, canvas.width - this.radius + 1); // ZÖLD ZÓNA X POZÍCIÓJA
        this.y = getRndInteger(this.radius, canvas.height - this.radius + 1); // ZÖLD ZÓNA Y POZÍCIÓJA
        this.color = "green"; // ZÖLD ZÓNA SZÍNE
        this.grayZoneRadius = this.radius + 700;
        this.goldZoneRadius = this.radius + 350;
        this.grayZoneUnitPerSec = (this.grayZoneRadius - this.radius) / game.round.refresh;
    }

    drawSafePoint() { // ZÖLD ZÓNA KIRAJZOLÁSA
        if (this.grayZoneRadius > this.radius) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.grayZoneRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = "gray";
            ctx.fill();
            ctx.closePath();
            this.grayZoneRadius = this.grayZoneRadius - this.grayZoneUnitPerSec;
        }

        if (this.goldZoneRadius > this.radius) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.goldZoneRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = "gold";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.goldZoneRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            this.goldZoneRadius = this.goldZoneRadius - this.grayZoneUnitPerSec;
        }


        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

    }

    ballInside() {
        var dx = game.ball.x - this.x;
        var dy = game.ball.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dx) + Math.abs(dy) != 0 && dist <= this.radius - game.ball.radius) {
            return true;
        } else {
            return false;
        }
    }
}