function mod(a,b){
    return a-b*Math.floor(a/b);
}
function clamp(val,min,max){
    if(val<min){
        return min;
    }
    if(max<val){
        return max;
    }
    return val;
}
function findTile(x,y){
    return tiles.findIndex(e=>e.x<=x && e.x+dotSize>x && e.y<=y && e.y+dotSize>y);
}
function findTileWithLocation(i,j){
    return tiles.findIndex(e=>e.i==i && e.j==j);
}
function picker(x,y){
    return pickerTiles[pickerTiles.findIndex(e=>e.x<=x && e.x+dotSize>x && e.y<=y && e.y+dotSize>y)];
}
var useInPerFrame=false;
const c=new complexMath();
const funcpens=document.getElementById("funcpens");
const cpenval=document.getElementById("cpenval");
const canvas=document.querySelector(".canvas");
canvas.style.border="2px solid";
const ctx=canvas.getContext("2d");
const cp=document.querySelector(".colorPicker");
const cpx=cp.getContext("2d");
const cv=document.querySelector(".cv");
const colorVisualization=cv.getContext("2d");
var dotSize=10;
var hist=[];
var pendown=false;
var funcpenmode=false;
var pickerfuncmode=false;
var pen={
    fillAt:{z:new complex(0,0),w:0},
    type:"pen",
    x:0,
    y:0,
    funcid:-1,
    radius:1,
    z:new complex(0,0),
    w:100
}
var funcpen=[];
var tiles=[];
var t=0;
var pickerTiles=[];
const pi=Math.PI;
const zmax=100;
async function generateTile(){
    tiles=[];
    for(let x=0; x<canvas.width/dotSize; x++){
        for(let y=0; y<canvas.height/dotSize; y++){
            tiles.push({
                z:new complex(0,0),
                x:x*dotSize,
                y:y*dotSize,
                w:0,
                i:x,
                j:y,
                filled:false
            });
        }
    }
    hist.push(await copyArray(tiles));
    t=0;
}
generateTile();
function regenerateColorPool(){
    pickerTiles=[];
    const size=cp.width/2;
    const center={x:cp.width/2,y:cp.height/2};
    for(let x=0; x<cp.width; x++){
        for(let y=0; y<cp.height; y++){
            pickerTiles.push({
                z:new complex(100*(x-center.x)/size,100*(y-center.y)/size),
                x:x,
                y:y
            });
        }
    }
    for(const p of pickerTiles){
        if(pickerfuncmode){
            var t=p;
            eval(funcpen[pen.funcid].data);
        }
        cpx.fillStyle=`hsl(${180*p.z.arg/pi},${pen.w}%,${p.z.abs}%)`;
        cpx.fillRect(p.x,p.y,1,1);
    }
}
regenerateColorPool();
//canvasの描画処理
function translate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(pendown){
        const id=findTile(pen.x,pen.y);
        if(id!=-1){
        const x=tiles[id].x+dotSize/2;
        const y=tiles[id].y+dotSize/2;
        if(pen.type=="pen"){
        for(const t of tiles){
        if(Math.hypot(t.x-x,t.y-y)<pen.radius*dotSize/2 || (pen.radius==1 && t.x==x-dotSize/2 && t.y==y-dotSize/2)){
        //関数ペン
        if(funcpenmode && pen.funcid!=-1){
            func=funcpen[pen.funcid];
                if(!useInPerFrame){
                    if(!t.filled){
                        t.filled=true;
                    eval(func.data);
                    }
                }else{
            eval(func.data);
                }
        }else{
            //複素ペン
        t.z=pen.z;
        t.w=pen.w;
        }
    }
    }
}else{
    var t=tiles[id];
    if(funcpenmode && pen.funcid!=-1){
    fillWithFunction(func.data,t.i,t.j);
    }else{
        fill(t.i,t.j);
    }
}
    }
    }
    for(const t of tiles){
        ctx.fillStyle=`hsl(${180*t.z.arg/pi},${clamp(t.w,0,100)}%,${clamp(100*(t.z.abs/zmax),0,100)}%)`;
        ctx.fillRect(t.x,t.y,dotSize,dotSize);
        if(t.x<=pen.x && pen.x<t.x+dotSize && t.y<=pen.y && pen.y<t.y+dotSize){
            ctx.strokeStyle=`hsl(${180*pen.z.arg/pi},${clamp(pen.w,0,100)}%,${clamp(100*(pen.z.abs/zmax),0,100)}%)`;
            ctx.strokeRect(t.x,t.y,dotSize,dotSize);
        }
    }
    requestAnimationFrame(translate);
}
translate();
window.addEventListener("keydown",e=>{
    if(e.ctrlKey && e.code=="KeyZ"){
        undo();
    }
    if(e.ctrlKey && e.code=="KeyX"){
        redo();
    }
});
canvas.addEventListener("mousedown",e=>{
    if(pen.type=="fill"){
        const id=findTile(pen.x,pen.y);
        if(id!=-1){
        const t=tiles[id];
        pen.fillAt.z=t.z;
        pen.fillAt.w=t.w;
        }
    }
    pendown=true;
    if(e.button==2){
        funcpenmode=true;
    }
});
canvas.addEventListener("mousemove",e=>{
    pen.x=e.offsetX;
    pen.y=e.offsetY;
});
window.addEventListener("mouseup",e=>{
    pendown=false;
    funcpenmode=false;
    updateHistory();
    if(pen.type=="fill" || !useInPerFrame){
        for(const t of tiles){
            t.filled=false;
        }
    }
});
function cut(val,x){
    return Math.round(val*Math.pow(10,x))*Math.pow(1/10,x);
}
cp.addEventListener("click",e=>{
    var t=picker(e.offsetX,e.offsetY);
    pen.z=t.z;
    let im=pen.z.imag.toFixed(1);
    if(im>=0){
        im="+"+im;
    }
    cpenval.innerHTML=`${pen.z.real.toFixed(1)}${im}i,彩度${pen.w},Argz=${Math.round(180*(pen.z.arg/pi+1))}°,|z|=${pen.z.abs.toFixed(1)}`;
    colorVisualization.fillStyle=`hsl(${180*pen.z.arg/pi},${clamp(pen.w,0,100)}%,${clamp(100*(pen.z.abs/zmax),0,100)}%)`;
    colorVisualization.beginPath();
    colorVisualization.arc(9,9,9,0,2*pi);
    colorVisualization.fill();
    colorVisualization.closePath();
});
function add(data,name){
    funcpen.push({
        id:funcpen.length,
        data:data,
        name:name
    })
    fixFuncpens();
}
function fixFuncpens(){
    funcpens.innerHTML="";
    for(const f of funcpen){
    funcpens.innerHTML+=`<input type="text" value="${f.name}" onchange="funcpen[${f.id}].name=this.value" /><textarea onchange="funcpen[${f.id}].data=this.value">${f.data}</textarea><input type="button" value="使用" onclick="usepen(${f.id})"><input type="button" value="✖" onclick="deletefunc(${f.id})"><br>`;
    }
}
function deletefunc(num){
    let a=funcpen.slice(0,num);
    let b=funcpen.slice(num+1,funcpen.length);
    for(const B of b){
        a.push(B);
    }
    funcpen=a;
    usepen(-1);
    fixFuncpens();
}
function usepen(num){
    pen.funcid=num;
    const usedcfunpen=document.getElementById("usedcfunpen");
    if(num==-1){
        usedcfunpen.innerHTML="なし";
    }else{
    usedcfunpen.innerHTML=funcpen[num].name;
    }
    if(pickerfuncmode){
        regenerateColorPool();
    }
}
canvas.addEventListener("contextmenu",()=>{
    event.preventDefault();
});
async function undo(){
    if(t-1>=0){
    t--;
    tiles=await copyArray(hist[t]);
    for(const t of tiles){
        t.z=new complex(t.z.real,t.z.imag);
    }
    }
}
async function redo(){
    if(t+1<hist.length){
    t++;
    tiles=await copyArray(hist[t]);
    for(const t of tiles){
        t.z=new complex(t.z.real,t.z.imag);
    }
    }
}
async function copyArray(A){
    const str=await JSON.stringify(A);
    const res=await JSON.parse(str);
    return res;
}
async function updateHistory(){
    hist=hist.slice(0,t+1);
    hist.push(await copyArray(tiles));
    t++;
}
function fillWithFunction(func,i,j){
    const id=findTileWithLocation(i,j);
    if(id!=-1){
        const t=tiles[id];
    if(sameComplex(t.z,pen.fillAt.z) && t.w==pen.fillAt.w && !t.filled){
        t.filled=true;
        eval(func);
        fillWithFunction(func,i+1,j);
        fillWithFunction(func,i-1,j);
        fillWithFunction(func,i,j+1);
        fillWithFunction(func,i,j-1);
    }
}
}
function fill(i,j){
    const id=findTileWithLocation(i,j);
    if(id!=-1){
        const t=tiles[id];
    if(sameComplex(t.z,pen.fillAt.z) && t.w==pen.fillAt.w && !t.filled){
        t.filled=true;
        t.z=pen.z;
        t.w=pen.w;
        fill(i+1,j);
        fill(i-1,j);
        fill(i,j+1);
        fill(i,j-1);
    }
}
}
function sameComplex(z,c){
    return z.real==c.real && z.imag==c.imag;
}
function save(name){
    const a=document.createElement('a');
    if(name==""){
    a.download=`${Date.now().toString(16)}.json`;
    }else{
        a.download=`${name}.json`;
    }
    var blob = new Blob([`${JSON.stringify(funcpen)}`], { type: 'text/plain' });
        a.href=URL.createObjectURL(blob);
        a.click();
}
async function load(file){
    const fr=new FileReader();
    fr.onload = () => {
        const data=JSON.parse(fr.result);
        funcpen=data;
        fixFuncpens();
      };
    fr.readAsText(file);
}
async function savePic(name){
    const img=new ImageData(canvas.width,canvas.height);
    const res=[];
    const elem=[];
    for(let k=0; k<img.data.length; k+=4){
        elem.push({data:[img.data[k],img.data[k+1],img.data[k+2],img.data[k+3]],position:{x:mod(elem.length,canvas.width),y:Math.floor(elem.length/canvas.width)}});
    }
    for(const e of elem){
        const i=Math.floor(e.position.x/dotSize);
        const j=Math.floor(e.position.y/dotSize);
        const id=findTileWithLocation(i,j);
        if(id!=-1){
            const t=tiles[id];
            const rgb=hsltorgb(t.z.arg*180/pi,t.w,t.z.abs/zmax);
            res.push(0);
            res.push(rgb.x);
            res.push(rgb.y);
            res.push(rgb.z);
        }
    }
    img.data=new Uint8ClampedArray(res);
    return elem;
}
function loadTiles(file){
    const fr=new FileReader();
    fr.onload = () => {
        const data=JSON.parse(fr.result);
        funcpen=data;
        fixFuncpens();
      };
    fr.readAsText(file);
}
async function parseTiles(jsonText){
    tiles=JSON.parse(jsonText);
    for(const t of tiles){
        t.z=new complex(t.z.real,t.z.imag);
    }
}
function hsltorgb(h,s,l){
    const max=l+(s*(1-Math.abs(2*l-1)))/2;
    const min=l-(s*(1-Math.abs(2*l-1)))/2;
    const r=max-min;
    var rgb;
    const v=60;
    function inRange(value,min,max){
        return min<=value && value<max;
    }
    h=mod(h,360);
    if(inRange(h,0,v)){
        rgb=new vector(max,min+r*h/v,min);   
    }
    if(inRange(h,v,2*v)){
        rgb=new vector(min+r*(120-h)/v,max,min);   
    }
    if(inRange(h,2*v,3*v)){
        rgb=new vector(min,max,min+r*(h-120)/v);   
    }
    if(inRange(h,3*v,4*v)){
        rgb=new vector(min,min+r*(240-h)/v,max);   
    }
    if(inRange(h,4*v,5*v)){
        rgb=new vector(min+r*(h-240)/v,min,max);   
    }
    if(inRange(h,5*v,6*v)){
        rgb=new vector(max,min,min+r*(360-h)/v);   
    }
    return rgb;
}