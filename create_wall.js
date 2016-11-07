/**
 * Created by Administrator on 2016/10/19.
 */
var rows = [];
var cols = [];
//var tds;
function createWall(){
    this.random_create = document.querySelector("#random_create");
    this.reset = document.querySelector("#reset");
    this.box_num = document.querySelector(".box_num");
    this.flag = true;
}
createWall.prototype={

    randomCreate:function(){
        var row = Math.floor(Math.random()*20+1);
        var col = Math.floor(Math.random()*20+1);
        rows.push(row);
        cols.push(col);
        tds[row][col].style.backgroundColor = '#BDC3C7';
        tds[row][col].dataset.flag = 'false';
    },
    specialCreate:function(n,m){
        var row = n;
        var col = m;
        rows.push(row);
        cols.push(col);
        tds[row][col].style.backgroundColor = '#BDC3C7';
        tds[row][col].dataset.flag = 'false';
    },
    getRows:function(){
        return rows;
    },
    getCols:function(){
      return cols;
    },
    resetTable:function(){
        box_img.style.transform = "rotate(0deg)";
        for(var i = 0;i<tds.length;i++){
            for(var j = 0;j<tds[i].length;j++){
                tds[i][j].style.backgroundColor = 'white';
                tds[i][j].dataset.flag = true;
            }
        }
        cols = [];
        rows = [];
        switch(box_num.value){
            case '20x20':
                box_img.style.top = 37+'px';
                box_img.style.left = 37+'px';
                break;
            case '30x30':
                box_img.style.top = 25+'px';
                box_img.style.left = 25+'px';
                break;
            case '40x40':
                box_img.style.top = 20+'px';
                box_img.style.left = 20+'px';
                break;
            default :
                alert('error');
                break;
        }

    },
    createBuild:function(n,m){
        var row = n;
        var col = m;
        var number = parseInt(box_num.value.split('x')[0].trim());
        if((row>number && row<1) || (col>number && col<1)){
//            this.flag = false;
        }else if(tds[row][col].dataset.flag == 'false'){
//            this.flag = false;
        }else{
            tds[row][col].style.backgroundColor = '#BDC3C7';
            tds[row][col].dataset.flag = false;
        }

    }

};
var create_wall = new createWall();

addEvent(this.random_create,'click',function(){
    create_wall.randomCreate();
});
addEvent(this.reset,'click',function(){
    create_wall.resetTable();
});
