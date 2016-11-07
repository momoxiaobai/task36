/**
 * Created by Administrator on 2016/10/17.
 */
    //此js实现了创建机器人运动的表格，随文本框显示行数，行数随滚轴滚动，根据下拉框选中的大小设置格子数目，
    //根据下拉框改变机器人行动的速度
var box_num = document.querySelector('.box_num');
var table = document.querySelector('.box_table');
var table_tds = document.getElementsByTagName('td');
var console_lines = document.querySelector('.console_lines');
var console_lines_wrapper = document.querySelector('.console_lines_wrapper');
var console_lines_item = document.getElementsByClassName('console_lines_item');
var textarea = document.querySelector('.console_editor');
var box_img = document.querySelector('.box_img');
var run_box = document.querySelector('.run_box');
var box_table = document.querySelector(".box_table");
var box_speed = document.querySelector(".box_speed");
var body = document.getElementsByTagName('body')[0];
    function addEvent(element,event,listener){
    if(element.addEventListener){
        element.addEventListener(event,listener,false)
    }else if(element.attachEvent){
        element.attachEvent('on'+event,listener)
    }else{
        element['on'+event] = listener;
    }
}
    //根据参数创建机器人运动的表格
var createBoxContainer = function(rows,cols){
    var row_num = rows;
    var col_num = cols;
    for(var i = 0;i<=row_num;i++){
        var table_content = document.createElement('tr');
        table_content.className = 'box_td';

        var tr_content = "";
        if(i == 0){
            tr_content = "<td class='box_td'data-flag='true'></td>";
           for(var j = 1;j<=col_num;j++){
              tr_content += "<td class='box_td' data-flag='true'>"+(j)+"</td>";
            }
            table_content.innerHTML += tr_content;
        }else{
            tr_content = "<td class='box_td' data-flag='true'>"+(i)+"</td>";
          for(var k = 0;k<col_num;k++){
              tr_content += "<td class='box_tds' data-flag='true'></td>"
          }
            table_content.innerHTML += tr_content;
        }
        table.appendChild(table_content)
    }
    var styles = document.styleSheets[0].rules;
    var len = styles.length;
    for(var n = 0;n<len;n++){
        if(styles[n].selectorText == '.box_tds' || styles[n].selectorText == 'td.box_td'){
            if(rows == 20){
                styles[n].style.width = 36+'px';
                styles[n].style.height = 36+'px';
                box_img.style.width = 36+'px';
                box_img.style.height = 36+'px';
                run_box.style.width = 36+'px';
                run_box.style.height = 36+'px';
                box_img.style.top = 37+'px';
                box_img.style.left = 37+'px';
                console_lines_wrapper.style.height = 747+'px';
//                alert(console_lines_wrapper.style.height)
                textarea.style.height = 747+'px';
            }else if(rows == 30){
                styles[n].style.width = 24+'px';
                styles[n].style.height = 24+'px';
                box_img.style.width = 25+'px';
                box_img.style.height = 25+'px';
                run_box.style.width = 25+'px';
                run_box.style.height = 25+'px';
                box_img.style.top = 25+'px';
                box_img.style.left = 25+'px';
                console_lines_wrapper.style.height = 744+'px';
                textarea.style.height = 744+'px';
//                alert(console_lines_wrapper.style.height)

            }else if(rows == 40){
                styles[n].style.width = 19+'px';
                styles[n].style.height = 19+'px';
                box_img.style.width = 20+'px';
                box_img.style.height = 20+'px';
                run_box.style.width = 20+'px';
                run_box.style.height = 20+'px';
                box_img.style.top = 20+'px';
                box_img.style.left = 20+'px';
                console_lines_wrapper.style.height = 788+'px';
//                alert(console_lines_wrapper.style.height)

                textarea.style.height = 788+'px';
            }
        }
    }
};
createBoxContainer(20,20);
//随文本框的增加显示行数
var showLinesNum = function(){
    var textContent = textarea.value;
    textContent = textContent.split('\n');
    var len = textContent.length;
    var newHtml = '';
    if(len == 0){
        newHtml += "<div class='console_lines_item'>"+1+"</div>";
    }else{
        for(var i = 0;i<len;i++){

            newHtml += "<div class='console_lines_item'>"+(i+1)+"</div>";
        }
    }

    console_lines.innerHTML = newHtml;
};
addEvent(textarea,'input',function(){
    showLinesNum();
});
//行数随滚轴滚动
var linesScroll = function(e){
var console_lines = document.querySelector('.console_lines');
    console_lines.style.top = -e.scrollTop + 'px';
};
addEvent(textarea,'scroll',function(eve){
    linesScroll(this);
});
//根据下拉框选中的大小设置格子数目
var boxNumber = function(){
    var box_number = box_num.value;
    var box_rc = [];
    box_rc = box_number.split('x');
    var rows = parseInt(box_rc[0]);
    var cols = parseInt(box_rc[1]);
    var box_table_child = box_table.children;
    var len = box_table.children.length;
    for(var j = 0;j<len;j++){
        box_table.removeChild(box_table.lastElementChild);
    }
            createBoxContainer(rows,cols);
};
addEvent(box_num,'change',function(){
    boxNumber();
});
//根据下拉框改变机器人行动的速度
var runSpeed = function(){
    var speed = box_speed.value;
    switch(speed){
        case '慢速':
            box_img.style.transition = 'all 1s';
            break;
        case '常速':
            box_img.style.transition = 'all .5s';
            break;
        case '快速':
            box_img.style.transition = 'all .3s';
            break;
        case '极速':
            box_img.style.transition = 'all .1s';
            break;
    }
}
addEvent(box_speed,'change',function(){
    runSpeed();
});
var number = parseInt(box_num.value.split('x')[0]);
var tds = [number+1];
for(var n = 0;n<=number;n++){
    tds[n]= new Array(number+1);
}
for(var i = 0;i<=number;i++){
    for(var j = 0;j<=number;j++){
        tds[i][j] = table_tds[i*(number+1)+j];
    }
}
