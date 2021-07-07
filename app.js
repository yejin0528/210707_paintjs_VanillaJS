const canvas = document.getElementById("jsCanvas");
const ctx =canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

//css로부터가 아닌 html로 부터의 width, height 받아오기 위해
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle="white";  //load시 canvas 색상
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(event){
    painting = true;
}

function stopPainting(event){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){  //painting === False
        ctx.beginPath();  //1. 경로생성
        ctx.moveTo(x, y);  //2. 선 시작 좌표
    } else{  //painting === True
        ctx.lineTo(x, y);  //3.선 끝 좌표
        ctx.stroke();  //4. 선 그리기
    }
}

function onMouseUp(event){
    stopPainting();
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function changeRange(event){
    const size =  event.target.value;
    ctx.lineWidth = size;
}

function clickCanvas(){
    if (filling) {
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function clickMode(event){
    if (filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText ="Paint";
    }
}

function handleCM(event){
    event.preventDefault();  //우클릭 방지
}

function clickSave() {
    const image = canvas.toDataURL("image/png");  //1. png타입 img url 생성
    const link = document.createElement("a");  //2. <a> 태그 생성
    link.href = image;  //3. <a href="~~~" />
    link.download = "PaintJS";    //저장되는 img 이름
    link.click();
}

/////* main code */////
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", clickCanvas);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));
//color : array안의 item 나타냄

if (range){
    range.addEventListener("input", changeRange);
}

if(mode){
mode.addEventListener("click",clickMode);  //처음 filling = false
}

if(save){
    save.addEventListener("click", clickSave);
}