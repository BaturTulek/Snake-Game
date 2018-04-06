
//Initial Declerations
var snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}, {x: 3, y: 6}, {x: 3, y: 7}];
var head, tail, body;
var num1, num2;  //Apple coordinates
var point = 0;
var Mflag = false;


//INIT FUNCTION
$(function () {
    //Create Grids
    $("#grid").html(createTable());

    //Grid OFF and ON button
    checkBox();

    //Draw Snake Initial Postion
    drawSnake();

    //Add Apple
    addApple();

    //Move snake and count points
     window.setInterval(movement, 100);    

});


//Move snake according to coordinations and count points
function movement() {
    if (Mflag) {
        removeSnake();
        if (snake[0].y > num2) {
            snakemove({x: 0, y: -1});
        } else if (snake[0].y < num2) {
            snakemove({x: 0, y: 1});
        } else if (snake[0].y === num2) {
            if (snake[0].x > num1) {
                snakemove({x: -1, y: 0});
            } else if (snake[0].x < num1) {
                snakemove({x: 1, y: 0});
            } else if (snake[0].x === num1) {
                point += 100;
                Mflag = false;
                $("#displayPoint").html(point)
                        .fadeIn()
                        .animate({'font-size' : '300px'}, 800)
                        .animate({'font-size' : '30px'}, 500)
                        .fadeOut();
            }
        }
        drawSnake();
    }
}


//GRID ON OFF BUTTON 
function checkBox() {
    var flag = true;
    $("#check").click(function () {
        if (flag) {
            $(".gray").css("border", "0px");
            flag = false;
            $("label").text("GRID OFF");
        } else {
            $(".gray").css("border", "1px solid slategray");
            flag = true;
            $("label").text("GRID ON");
        }
    });
}


//Draw Snake 
function drawSnake() {
    head = snake[0];
    var headTile = findHeadTile();
    $("#" + head.x + "_" + head.y).css("background", "url(snake-graphics.png) no-repeat " + tile(headTile))
            .addClass("containSnake");
    tail = snake[snake.length - 1];
    var tailTile = findTailTile();
    $("#" + tail.x + "_" + tail.y).css("background", "url(snake-graphics.png) no-repeat " + tile(tailTile))
            .addClass("containSnake");
    for (var i = 1; i < snake.length - 1; i++) {
        body = snake[i];
        var bodyTail = findBodyTile(i);
        $("#" + body.x + "_" + body.y).css("background", "url(snake-graphics.png) no-repeat " + tile(bodyTail))
                .addClass("containSnake");
    } 
    
    //Initial Tooltip
     $("#" + snake[0].x + "_" +snake[0].y).qtip({
        content: {
            text: 'Please Some Food',
            title: "Snake Says"
        }
    });
  
}


//Return Head Image
function findHeadTile() {
    if (snake[1].x === snake[0].x && snake[1].y > snake[0].y)
        return 3;
    else if (snake[1].x < snake[0].x && snake[1].y === snake[0].y)
        return 4;
    else if (snake[1].x > snake[0].x && snake[1].y === snake[0].y)
        return 8;
    else if (snake[1].x === snake[0].x && snake[1].y < snake[0].y)
        return 9;
}


//Return Tail Image
function findTailTile() {
    if (snake[snake.length - 2].x === snake[snake.length - 1].x && snake[snake.length - 2].y < snake[snake.length - 1].y)
        return 13;
    else if (snake[snake.length - 2].x > snake[snake.length - 1].x && snake[snake.length - 2].y === snake[snake.length - 1].y)
        return 14;
    else if (snake[snake.length - 2].x < snake[snake.length - 1].x && snake[snake.length - 2].y === snake[snake.length - 1].y)
        return 18;
    else if (snake[snake.length - 2].x === snake[snake.length - 1].x && snake[snake.length - 2].y > snake[snake.length - 1].y)
        return 19;
}


//Return Body Images
function findBodyTile(i) {
    if (snake[i - 1].x > snake[i].x && snake[i + 1].y === snake[i].y)
        return 1;
    else if (snake[i - 1].x < snake[i].x && snake[i + 1].y === snake[i].y)
        return 1;
    else if (snake[i - 1].x === snake[i].x && snake[i + 1].y < snake[i].y)
        return 7;
    else if (snake[i - 1].x === snake[i].x && snake[i + 1].y > snake[i].y)
        return 7;
    else if (snake[i - 1].y < snake[i].y && snake[i + 1].x > snake[i].x)
        return 5;
    else if (snake[i - 1].x > snake[i].x && snake[i + 1].y < snake[i].y)
        return 5;
    else if (snake[i - 1].x > snake[i].x && snake[i + 1].y > snake[i].y)
        return 0;
    else if (snake[i - 1].x === snake[i].x && snake[i + 1].x > snake[i].x)
        return 0;
    else if (snake[i - 1].y > snake[i].y && snake[i + 1].x < snake[i].x)
        return 2;
    else if (snake[i - 1].x < snake[i].x && snake[i + 1].y > snake[i].y)
        return 2;
    else if (snake[i - 1].y === snake[i].y && snake[i + 1].y < snake[i].y)
        return 12;
    else if (snake[i - 1].x === snake[i].x && snake[i + 1].x < snake[i].x)
        return 12;
}


//Return Apple Image
function findApple() {
    return 15;
}


//Calculate
function tile(no) {
    var left = (no % 5) * -64 + "px";
    var top = Math.floor(no / 5) * -64 + "px";
    return " " + left + " " + top;
}


//Create Table
function createTable() {
    
    var str = "";
    str += "<table id= 'gameTable'>";
    
    for (var i = 0; i < 10; i++) {
        str += "<tr>";
        for (var k = 0; k < 10; k++) {
            str += "<td class = 'gray' id='" + k + "_" + i + "' >";
            str += "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    return(str);
}


//Add apple to cell
function addApple() {
    
    var apple = findApple();
    var flag = false;
    
    $("td").click(function () {
        if (!($(this).hasClass("containSnake"))) {
            if (flag === false) {
                $(this).css("background", "url(snake-graphics.png) no-repeat " + tile(apple))
                        .addClass("containApple");
                flag = true;
            } else if (flag) {
                $(".containApple").css("background", "white")
                        .removeClass("containApple");
                $(this).css("background", "url(snake-graphics.png) no-repeat " + tile(apple))
                        .addClass("containApple");
            }
            
            //Use for counting points
            Mflag  = true;
                
            //Return cell id which has apple image 
            //In order to use movesnake function
            var appleId = $(".containApple").attr('id');
            var numbers = appleId.split('_');
           
            //num1 = x coordinate of cell which contains apple
            //num2 = y coordinate of cell which contains apple
            num1 = parseInt(numbers[0]);
            num2 = parseInt(numbers[1]);
        }
    });
}


//Move snake body
function snakemove(dir) {
    for (var i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = snake[i];
    }
    head = snake[0];
   
    //Remove old Tooltip
    $("#" + head.x + "_" + head.y).qtip('destroy',true);
    
    snake[0] = {x: head.x + dir.x, y: head.y + dir.y};
    
    //Add new Tooltip
      $("#" + snake[0].x + "_" +snake[0].y).qtip({
        content: {
            text: 'Please Some Food',
            title: "Snake Says"
        }
    });
}


//Remove old snake images
function removeSnake() {
    for (var i = 0; i < snake.length; i++) {
        $("#" + snake[i].x + "_" + snake[i].y).css("background", "white")
                .html("")
                .removeClass("containSnake");
    }
}