/**
 * Created by Administrator on 2016/10/19.
 */
function boxRun(){

    this.commends = [];
    this.direction = 'south';
    this.build_row = '';   //存储自己创建的墙的坐标，涂色用
    this.build_col = '';   //存储自己创建的墙的坐标，涂色用
    this.operator = document.querySelector('#operator');
    this.console_item = document.querySelectorAll('.console_lines_item');
    this.init();
}
boxRun.prototype = new createWall();
boxRun.prototype.getCommends =function() {
//   function(){
        var commends = textarea.value;
        commends = commends.split('\n');
        var len = commends.length;
        for(var i = 0;i<len;i++){
            this.commends[i] = commends[i];
        }
    };
boxRun.prototype.setDirection = function(commend){
            var direction = commend;
            if(direction == 'top'){
//                alert('1')
                this.flag = true;
                box_img.style.transform = "rotate(180deg)";
                this.direction = 'north';
            }else if(direction == 'left'){
//                alert('2')
                this.flag = true;
                box_img.style.transform = "rotate(90deg)";
                this.direction = 'west';
            }else if(direction == 'right'){
//                alert('3')
                this.flag = true;
                box_img.style.transform = "rotate(-90deg)";
                this.direction = 'east';
            }else if(direction == 'bottom'){
//                alert('4')
                this.flag = true;
                box_img.style.transform = "rotate(0deg)";
                this.direction = 'south';
            }else if(direction == 'turn back'){
                this.flag = true;
                if(this.direction == 'north'){
                    box_img.style.transform = "rotate(0deg)";
                    this.direction = 'south';
                }else if(this.direction == 'south'){
                    box_img.style.transform = "rotate(180deg)";
                    this.direction = 'north';
                }else if(this.direction == 'west'){
                    box_img.style.transform = "rotate(-90deg)";
                    this.direction = 'east';
                }else if(this.direction == 'east'){
                    box_img.style.transform = "rotate(90deg)";
                    this.direction = 'west';
                }

            }else{
                this.flag = false;
            }
    };
    boxRun.prototype.move = function(n){
//        alert('sdsds')
        var number = n;
        var row_col_num;
        var run_distance;
        switch(box_num.value){
            case '20x20':
                run_distance = 37;
                row_col_num = 20;
                break;
            case '30x30':
                run_distance = 25;
                row_col_num = 30;
                break;
            case '40x40':
                run_distance = 20;
                row_col_num = 40;
                break;
        }
        var box_img_top = box_img.offsetTop;
        var box_img_left = box_img.offsetLeft;
        var box_img_row = box_img_top/run_distance;
        var box_img_col = box_img_left/run_distance;
        if(this.direction == 'south'){
            var flag_south = true;
            for(var i = 0;i<number;i++){
                if(tds[box_img_row+i+1][box_img_col].dataset.flag == 'false'){
                    flag_south = false;
                    this.flag = false;
                }
            }
            if(row_col_num-box_img_row >= number && flag_south){
                box_img.style.top = (box_img_top+number*run_distance)+'px';
//                return true;
                this.flag = true;
            }else{
                this.flag = false;
            }
        }else if(this.direction == 'north'){
            var flag_north = true;
            for(var j = 0;j<number;j++){
                if(tds[box_img_row-j-1][box_img_col].dataset.flag == 'false'){
                    flag_north = false;
                    this.flag = false;
                }
            }
            if(box_img_row-1 >= number && flag_north){
                box_img.style.top = (box_img_top-number*run_distance)+'px';
                this.flag = true;
            }else{
                this.flag = false;
            }
        }else if(this.direction == 'east'){
            var flag_east = true;
            for(var k = 0;k<number;k++){
                if(tds[box_img_row][box_img_col+k+1].dataset.flag == 'false'){
                    flag_east = false;
                    this.flag = false;
                }
            }
            if(row_col_num-box_img_col >= number && flag_east){
                box_img.style.left = (box_img_left+number*run_distance)+'px';
                this.flag = true;
            }else{
                this.flag = false;
            }
        }else if(this.direction == 'west'){
//            alert(this.flag+'1')
            var flag_west = true;
            for(var l = 0;l<number;l++){
                if(tds[box_img_row][box_img_col-l-1].dataset.flag == 'false'){
                    flag_west = false;
                    this.flag = false;
                }
            }
//            alert(box_img_col)
            if(box_img_col-1 >= number && flag_west){
//                alert(this.flag+'2')
                box_img.style.left = (box_img_left-number*run_distance)+'px';
                this.flag = true;
            }else{
//                alert(this.flag+'3')
                this.flag = false;
            }
//            alert(this.flag+'4')
        }
//        alert(this.flag+'5')
    };
boxRun.prototype.build = function(){
    var run_distance;
    var row_col_num;
    switch(box_num.value){
        case '20x20':
            run_distance = 37;
            row_col_num = 20;
            break;
        case '30x30':
            run_distance = 25;
            row_col_num = 30;
            break;
        case '40x40':
            run_distance = 20;
            row_col_num = 40;
            break;
    }
    var box_img_top = box_img.offsetTop;
    var box_img_left = box_img.offsetLeft;
    var box_img_row = box_img_top/run_distance;
    var box_img_col = box_img_left/run_distance;

    if(this.direction == 'north'){
        this.createBuild(box_img_row-1,box_img_col);
        this.build_row =box_img_row-1;
        this.build_col = box_img_col;
    }else if(this.direction == 'south'){
        this.createBuild(box_img_row+1,box_img_col);
        this.build_row =box_img_row+1;
        this.build_col = box_img_col;
    }else if(this.direction == 'west'){
        this.createBuild(box_img_row,box_img_col-1);
        this.build_row =box_img_row;
        this.build_col = box_img_col-1;
    }else if(this.direction == 'east'){
        this.createBuild(box_img_row,box_img_col+1);
        this.build_row =box_img_row;
        this.build_col = box_img_col+1;
    }
};
boxRun.prototype.runCommends = function(word1,word2,n){
//    alert(n)
    var commends_item1 = word1;
    var commends_item2 = word2;
    var num = parseInt(n);
//    var flag = true;
        if(commends_item1 == 'build'){
         this.build();
        }else if(commends_item1 == 'move'){
            this.setDirection(commends_item2);
            this.move(num);
//            alert('asdgadff')
        }else if(commends_item1 == 'turn' && commends_item2 != 'back'){
//             alert('left')
            this.setDirection(commends_item2);
        }else if(commends_item1 == 'turn' && commends_item2 == 'back'){
            this.setDirection('turn back');
        }else if(commends_item1 == 'bru'){
            if(this.build_row == ''){
//                return false;
//                alert('ddd')
                this.flag = false;
            }else{
//                alert('asdfad')
                tds[this.build_row][this.build_col].style.backgroundColor = commends_item2;
                this.flag = true;
            }

        }else if(commends_item1 == 'tra'){
         this.move(num);
         this.flag = true;
        }else{
            this.flag = false;
        }

};
boxRun.prototype.bindKey = function(e){
//    alert(e)
    if(e.target.nodeName == 'BODY'){
        e.preventDefault();
        if(e.keyCode == 37){
            if(this.direction == 'west'){
                this.move(1);
            }else {
                this.setDirection('left');
            }
        }else if(e.keyCode == 38){
            if(this.direction == 'north'){
                this.move(1);
            }else {
                this.setDirection('top');
            }
        }else if(e.keyCode == 39){
            if(this.direction == 'east'){
                this.move(1);
            }else {
                this.setDirection('right');
            }
        }else if(e.keyCode == 40){
            if(this.direction == 'south'){
                this.move(1);
            }else {
                this.setDirection('bottom');
            }
    }

    }
};
boxRun.prototype.setBgColor=function(n){
//    alert('ddd')
    alert(this.flag)
    var i = n;
  if(this.flag){
      console_lines_item[i].style.backgroundColor = 'green';
  }else if(!this.flag){
      console_lines_item[i].style.backgroundColor = 'orange';
  }
};
boxRun.prototype.operatorRun=function(){
//    alert('d')
    this.flag = true;
  var commends = textarea.value.split('\n');
    var len = commends.length;
    var letter = [];
    var seconds;
    for(var i = 0;i<len;i++){
        letter.push(commends[i].trim());
    }
    var commend_length = letter.length;
    var speed = box_speed.value;
    switch(speed){
        case '慢速':
            seconds = 1000;
            break;
        case '常速':
            seconds = 500;
            break;
        case '快速':
            seconds = 300;
            break;
        case '极速':
            seconds = 100;
            break;
    }
//    alert('123')
     var j = 0;
    var k = 0;
    var _this = this;
//    alert(console_lines_item.length)
    var timer1,timer2,timer3;
    timer1 = setInterval(function(){
//        alert(j)
        console_lines_item[j].style.backgroundColor = 'green';
//        clearTimeout(timer2);
//        clearTimeout(timer3);
        var word = [];
        word = letter[j].split(' ');
//
        if(word[1]== undefined){
            word[1] = 0;
            word[2] = 0;
        }else if(word[2] == undefined){
            word[2] = 0;
        }
        _this.runCommends(word[0],word[1],word[2]);
//        alert(_this.flag);
        if(j<len-1 && _this.flag){

            var n = j;
            timer2 = setTimeout(function(){
                console_lines_item[n].style.backgroundColor = '#2c3e50'},seconds);
//            clearInterval(timer1);
            j++;
        }else if(!_this.flag){
//            alert('stop1')
            timer3 = setTimeout(function(){console_lines_item[j].style.backgroundColor = 'orange'},seconds);
            clearInterval(timer1);

        }else if(j == len-1){
            clearInterval(timer1);
//            alert('stop');
        }
        },seconds);

};
boxRun.prototype.changeColor=function(){
    var i = 0;
    var speed = box_speed.value;
    var seconds;
    switch(speed){
        case '慢速':
            seconds = 1000;
            break;
        case '常速':
            seconds = 500;
            break;
        case '快速':
            seconds = 300;
            break;
        case '极速':
            seconds = 100;
            break;
    }
    var _this = this;
   setTimeout(function(){
       setInterval(function(){
            if(_this.flag){

            }
       },seconds)},seconds);
}
boxRun.prototype.a=function(){
    alert('12345')
}
boxRun.prototype.init=function(){

    addEvent(document,'keydown',
        this.bindKey.bind(this)
    );
    addEvent(this.operator,'click',
        this.operatorRun.bind(this))
};
var box_run = new boxRun();
var timer;
