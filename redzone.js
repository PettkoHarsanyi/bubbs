class RedZone {

    constructor(game) {
        this.game = game
        this.color = "red"; // PIROS ZÓNA SZÍNE
        do {
            this.radius = getRndInteger(5, 50); // PIROS ZÓNA SUGARA
            this.x = getRndInteger(this.radius, canvas.width - this.radius + 1); // PIROS ZÓNA X POZÍCIÓJA
            this.y = getRndInteger(this.radius, canvas.height - this.radius + 1); // PIROS ZÓNA Y POZÍCIÓJA
        } while (this.isColliding());
    }

    drawRedPoint() { // PIROS ZÓNA KIRAJZOLÁSA
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

    isColliding() { // ÖSSZEÜTKÖZIK-E EGY MÁSIK PIROS ZÓNÁVAL, VAGY A ZÖLD ZÓNÁVAL, VAGY A JÁTÉKOSSAL. IGAZAT, VAGY HAMISAT AD VISSZA.
        if (game.redZones.length > 0) {
            var isIn = false;
            for (var redzonee in game.redZones) {

                if (((this.x + this.radius > game.redZones[redzonee].x - game.redZones[redzonee].radius - 20 && this.x - this.radius < game.redZones[redzonee].x + game.redZones[redzonee].radius + 20) // ÜTKÖZIK MÁSIK PIROS ZÓNÁVAL X-EN
                    && (this.y + this.radius > game.redZones[redzonee].y - game.redZones[redzonee].radius - 20 && this.y - this.radius < game.redZones[redzonee].y + game.redZones[redzonee].radius + 20)) // ÜTKÖZIK MÁSIK PIROS ZÓNÁVAL Y-ON
                    || ((this.x + this.radius > game.greenZone.x - game.greenZone.radius - 30 && this.x - this.radius < game.greenZone.x + game.greenZone.radius + 30) // ÜTKÖZIK A ZÖLD ZÓNÁVAL X-EN
                        && (this.y + this.radius > game.greenZone.y - game.greenZone.radius - 30 && this.y - this.radius < game.greenZone.y + game.greenZone.radius + 30)) // ÜTKÖZIK A ZÖLD ZÓNÁVAL Y-ON
                    || ((this.x + this.radius > game.ball.x - game.ball.radius - 30 && this.x - this.radius < game.ball.x + game.ball.radius + 30) // ÜTKÖZIK A JÁTÉKOSSAL X-EN
                        && (this.y + this.radius > game.ball.y - game.ball.radius - 30 && this.y - this.radius < game.ball.y + game.ball.radius + 30)) // ÜTKÖZIK A JÁTÉKOSSAL Y-ON
                ) {
                    isIn = true;
                }
            }
        }
        return isIn;
    }
}