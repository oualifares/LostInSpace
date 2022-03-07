'use strict';

var vaisseau;
var canvas;

window.onload = function () {
    //*
    canvas = document.getElementById('game_area');
    console.log(canvas);
    window.onkeydown = gereTouchegauche;
    document.addEventListener('keydown', function (e) {
        //console.log(e.keyCode);
        switch (e.keyCode) {
        case 37:
            gereTouchegauche(e);
            break;

        case 38:
            gereTouchehaut(e);
            break;

        case 39:
            gereTouchedroite(e);
            break;

        case 40:
            gereTouchebas(e);
            break;
        }
    });
    vaisseau = new Mobile(canvas.width / 2, canvas.height / 2, 6, -6);
    console.log(vaisseau);
    vaisseau.dessine(canvas.getContext('2d'));
};


document.addEventListener('keydown', function (e) {
    if (e.keyCode === 40) {
        gereTouchebas();
        //app-specific code goes here
    }
});
//  Vaisseau

function Mobile(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

}


Mobile.prototype.dessine = function (ctx) {
    console.log(ctx);
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.moveTo(this.x - 16, this.y + 12);
    ctx.lineTo(this.x, this.y - 20);
    ctx.lineTo(this.x + 16, this.y + 12);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.stroke();
};


// Missile


function Missile(x, y) {
    this.x = x;
    this.y = y - 2;
}






Mobile.prototype.avancebas = function () {
    if (this.y < 586) {
        this.y -= this.dy;
    }
    //this.x+=this.dx

};

Mobile.prototype.avancedroite = function () {
    if (this.x < 584) {
        this.x += this.dx;
    }
    //this.y += this.dy
};

Mobile.prototype.avancegauche = function () {
    if (this.x > 16) {
        this.x -= this.dx;
    }
    //this.y += this.dy
};
Mobile.prototype.avancehaut = function () {
    //this.x += this.dx
    if (this.y > 12) {
        this.y += this.dy;
    }
};







function gereTouche(e) {
    console.log(e, 'name', e.type);
    vaisseau.avancehaut();
    canvas.width = canvas.width;
    vaisseau.dessine(canvas.getContext('2d'));
}



function gereTouchehaut(e) {
    console.log(e, 'name', e.type);
    vaisseau.avancehaut();
    canvas.width = canvas.width;
    vaisseau.dessine(canvas.getContext('2d'));
}

function gereTouchebas(e) {
    console.log(e, 'name', e.type);
    vaisseau.avancebas();
    canvas.width = canvas.width;
    vaisseau.dessine(canvas.getContext('2d'));
}

function gereTouchegauche(e) {
    console.log(e, 'name', e.type);
    vaisseau.avancegauche();
    canvas.width = canvas.width;
    vaisseau.dessine(canvas.getContext('2d'));
}

function gereTouchedroite(e) {
    console.log(e, 'name', e.type);
    vaisseau.avancedroite();
    canvas.width = canvas.width;
    vaisseau.dessine(canvas.getContext('2d'));
}

window.onload = function () {
    var canvas = document.getElementById("game_area");
    var context = canvas.getContext("2d");
    var ship = new Ship(290, 590, "white");
    var fucking = new Fuckers(300);
    drawTriangle(290, 590, context, ship.color);
    var shots = [];



    window.addEventListener('keydown', function (event) {
        var e = event.keyCode;
        if (e === 38 && ship.y > 15) {
            ship.y = ship.y - 3;

        } else if (e === 39 && ship.x < 575) {
            ship.x = ship.x + 3;
        } else if (e === 37 && ship.x > 5) {
            ship.x = ship.x - 3;
        } else if (e === 40 && ship.y < 595) {
            ship.y = ship.y + 3;
        } else if (e === 32) {
            shots.push(new Shot(ship.x, ship.y - 3));
        };

    });
    var animate = function () {
        context.clearRect(0, 0, 600, 600);
        for (var i = 0; i < fucking.fuckers.length; i++) {
            if (fucking.fuckers[i].x > 595) {
                fucking.fuckers[i].dx = -fucking.fuckers[i].dx * 1.1
            } else if (fucking.fuckers[i].x < 5) {
                fucking.fuckers[i].dx = -fucking.fuckers[i].dx * 1.1
            } else if (fucking.fuckers[i].y > 595) {
                fucking.fuckers[i].dy = -fucking.fuckers[i].dy * 1.1
            } else if (fucking.fuckers[i].y < 5) {
                fucking.fuckers[i].dy = -fucking.fuckers[i].dy * 1.1
            }

            fucking.fuckers[i].x += fucking.fuckers[i].dx
            fucking.fuckers[i].y += fucking.fuckers[i].dy
            drawTriangle(fucking.fuckers[i].x, fucking.fuckers[i].y, context, fucking.fuckers[i].color)

        }

        if (shots.length > 0) {
            for (var i = 0; i < shots.length; i++) {
                if (shots[i].alive == false) {
                    delete shots[i];
                    i -= 1;
                } else {
                    shots[i].y += -1;
                    drawShot(shots[i].x, shots[i].y, context);
                };
            };
        };
        drawTriangle(ship.x, ship.y, context, ship.color);
        drawShot(300, 300, context)
        window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
};

function drawTriangle(x, y, context, color) {
    context.strokeStyle = color;
    context.linewidth = 3;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 4, y);
    context.lineTo(x + 2, y - 2);
    context.lineTo(x, y);
    context.stroke();
};

function Fuckers(nmb) {
    var lst = [];
    var x = 0;
    for (var i = 0; i < nmb; i++) {
        lst.push(new Ship(x, 6, "green"));
        x += 5;
    };
    this.fuckers = lst
};

function drawShot(x, y, context) {
    context.strokeStyle = "white";
    context.linewidth = 3;
    context.moveTo(x, y);
    context.lineTo(x, y + 3);
    context.stroke();
}

function Ship(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color
    this.dx = 0.0001
    this.dy = 1
    this.alive = true
};

function Shot(x, y) {
    this.x = x;
    this.y = y;
    this.alive = true;
};