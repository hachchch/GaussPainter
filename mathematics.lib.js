class mathematics{
    /*コンピューターならではの関数*/
  primeNumbers(a){
      if(!a){
          a=500;
      }
      let found=0;
      let res=[];
      let x=1;
      while(found<a){
          x++;
          let ans=[];
          let k=0;
          while(ans.length<2){
              k++;
      if(x/k==Math.trunc(x/k)){
        ans.push(k);
      }
    }
          if(ans[1]==x){
          res.push(x);
          found++;
          }
      }
      return res;
  }
  prime(a){
      let res=this.primeNumbers(a);
      return res[a-1];
  }
  chance(a){
    if(Math.random()*100<=a){
        return true;
        }else{
        return false;
        }
  }
    triangle(a){
        return Math.abs(Math.round(a)-a);
    }
    /*三角関数*/
  csc(a){
  return 1/Math.sin(a);
  }
  sec(a){
  return 1/Math.cos(a);
  }
  cot(a){
  return 1/Math.tan(a);
  }
    acsc(a){
        return Math.asin(1/a);
    }
    asec(a){
        return Math.acos(1/a);
    }
    acot(a){
        return (Math.PI/2)-Math.atan(a);
    }
    acsch(a){
        return Math.asinh(1/a);
    }
    asech(a){
        return Math.acosh(1/a);
    }
    acoth(a){
        return Math.atanh(1/a);
    }
    /*基本関数*/
    log(n,x){
        return Math.log(x)/Math.log(n);
    }
    ln(n){
        return Math.log1p(n-1);
    }
  sum(K,N,gen){
  let ans=0;
  for(let k=K;k<=N;++k){
    ans+=eval(gen);
  }
  return ans;
}
prod(K,N,gen,val){
  let ans=1;
  if(!val){
  for(let k=K;k<=N;++k){
    ans=ans*eval(gen);
  }
  }else{
  let syntax ="for(var "+val+"=K;"+val+"<=N;++"+val+"){ans=ans*eval(gen);}";
  eval(syntax);
  }
  return ans;
}
fact(a){
  if(a==Math.round(a) && a>=0){
  return this.prod(1,a,"k");
  }else{
  return this.gamma(a+1);
  }
}
gamma(a,b){
  if(!b){
    b=20;
  }
if(a>=1){
  return this.int(0,b,`Math.pow(x,${a}-1)*Math.exp(-x)`,500);
    }else{
    //let m=170.00053;
    //return (m**a)*this.fact(m)/this.prod(0,m,`${a}+k`);
    //if(a==Math.floor(a)){
    //    return undefined;
    //}
    return this.gamma(a+1)/a;
    }
}
    mean(...args){
  let ans=0;
  for(const a of args){
    ans+=eval(a);
  }
  return ans/args.length;
}
geomean(...args){
  let ans=1;
  for(const a of args){
    ans=ans*eval(a);
  }
  return Math.pow(ans,1/args.length);
}
  median(...args){
    return (args[Math.floor((args.length-1)/2)]+args[Math.ceil((args.length-1)/2)])/2;
  }
    divisor(N){
    if(N!=Math.trunc(N)){
      console.error("小数に対応していません");
    }
    let ans=[];
    for(let k=1; k<=N; ++k){
      if(N/k==Math.trunc(N/k)){
        ans.push(k);
      }
    }
    return ans;
  }
  mod(a,b){
    return a-(b*Math.floor(a/b));
  }
  quartile(a){
    let mid1=(a.length+1)/2;
    let mid2=(a.length+1)/2;
    if(mid1!=Math.trunc(mid1)){
    mid1=mid1+0.5;
    mid2=mid2-0.5;
    }
    return [this.median(a.slice(0,mid1-1)),this.median(a),this.median(a.slice(mid2,a.length))];
  }
  syntax(f,vars,varsnum){
      for(let index=0; index<vars.length; ++index){
      f=f.replaceAll(vars[index],varsnum[index]);
          }
      f=f.replaceAll("--","+");
      return eval(f);
  }
/*場合の数*/
nPr(n,r){
  return this.fact(n)/this.fact(n-r);
}
nCr(n,r){
  return this.fact(n)/(this.fact(r)*this.fact(n-r));
}
nSk1(n,k){
if(k>n){
console.error("invalid input!");
return;
}
if(k==0){
return 0;
}else if(k==1){
return this.fact(n-1);
}else if(n==k){
return 1;
}else{
return this.nSk1(n-1,k-1)+(n-1)*this.nSk1(n-1,k)
}
}
nSk2(n,k){
    let res=0;
    for(let m=1; m<=k; ++m){
        res+=Math.pow(-1,k-m)*this.nCr(k,m)*Math.pow(m,n);
    }
    return res/this.fact(k);
}
    /*微分積分学*/
  euler(term,x,y,h,f){
    let Yarray=[y];
    function F(x,y){
      return eval(f);
    }
    for(let n=1; n<=term; ++n){
      Yarray[n]=Yarray[n-1]+h*F(x,Yarray[n-1]);
      x+=h;
    }
    return Yarray[term];
  }
  trapezoidal(a,b,f,n){
    if(!n){
    n=10001;
    }
    function F(x){
      return eval(f);
    }
    let an=[a];
    for(let i=1; i<=n; ++i){
      an[i]=an[i-1]+((b-a)/n);
    }
    let ans=0;
    for(let k=1; k<=n; ++k){
      ans+=(an[k]-an[k-1])*(F(an[k])+F(an[k-1]))/2;
    }
    return ans;
  }
  int(a,b,f,mix){
    function F(x){
      return eval(f);
    }
    if(!mix){
    return ((b-a)/6)*(F(a)+4*F((a+b)/2)+F(b));
    }else{
    if(mix/2!=Math.ceil(mix/2)){
      mix=2*Math.ceil(mix/2);
    }
    let an=[0];
    let h=(b-a)/mix;
    for(let i=1; i<mix; ++i){
      an[i]=a+i*h;
    }
    let ans1=0;
    for(let i=1; i<=mix/2-1; ++i){
      ans1+=F(an[2*i]);
    }
    let ans2=0;
    for(let i=1; i<=mix/2; ++i){
      ans2+=F(an[2*i-1]);
    }
    return (h/3)*(F(a)+2*ans1+4*ans2+F(b));
    }
  }
    /*近似的な微分を計算する*/
    d(X,F,n,h){
        function f(x){
            return eval(F);
        }
        let res=0;
        if(!n){
        /*何回微分するか*/
        n=1;
            }
        if(!h){
        /*コンピュータに教える極めて0に近い数字は任意に変更可能。デフォで1/100000*/
        h=0.000001;
            }
        /*中心差分近似法を用いる*/
        res=(f(X+h)-f(X-h))/(2*h);
        //res=(f(X+h)-f(X))/(h);
        return res;
    }
    newton(Function,init,h){
        let res=init;
        function f(x){
            return eval(Function);
        }
        for(let k=0; k<h; ++k){
            res=res-(f(res)/this.d(res,Function));
        }
        return res;
    }
    Rd(X,Y,which,F,h){
        let res=0;
        if(!h){
        h=0.000001;
            }
        if(which=="x"){
        function f(x){
            var y=Y;
            return eval(F);
        }
        res=(f(X+h)-f(X-h))/(2*h);
        }
        if(which=="y"){
        function f(y){
            var x=X;
            return eval(F);
        }
        res=(f(Y+h)-f(Y-h))/(2*h);
        }
        return res;
    }
    beta(a,b){
        return this.int(0,1,`Math.pow(x,${a-1})*Math.pow(1-x,${b}-1)`);
    }
    zeta(s,n){
        if(s==0){
            return -1/2;
        }else if(s==2){
            return Math.pow(Math.PI,2)/6;
        }else{
        if(!n){
            n=10000;
        }
        return this.sum(1,n,`1/Math.pow(k,${s})`);
        }
    }
    multiZeta(a,precision){
        if(!precision){
            //precision=5000*Math.pow(2/25,a.length-2);
            if(a.length<=1){
                precision=10000;
            }
            if(a.length==2){
                precision=5000;
            }
            if(a.length==3){
                precision=400;
            }
            if(a.length>=4){
                precision=125;
            }
            //console.log(precision)
        }
        if(precision<5000){
            console.log("precisionが5000以下では精度がかなり悪いです。");
        }
        let R=0;
        let totaloop=0;
        let k=[];
        function sumation(n){
            let res=0;
            if(n==a.length){
                    let product=1;
                    for(let i=0; i<a.length; ++i){
                        product=product*(k[i]**a[i]);
                    }
                    res+=1/product;
                R+=res;
                return;
            }
            if(n==0){
                k[n]=1;
            }else{
                k[n]=k[n-1]+1;
            }
            while(k[n]<=precision){
                if(n>a.length){
                    break;
                }
                sumation(n+1);
                k[n]++;
                totaloop++;
            }
        }
        sumation(0);
        //console.log(totaloop);
        return R;
    }
    /*特殊関数*/
  B(N){
      if(N==0){
        return 1;
      }
      let ans=0;
      for(let k=0; k<N; ++k){
        ans+=this.nCr(N+1,k)*this.B(k);
      }
      return (-1/(N+1))*ans;
  }
    W0(x,n){
        if(!n){
        n=7;
        }
        let o=0;
        for(let i=0; i<=n; ++i){
        for(let j=1; j<=n; ++j){
            o+=(Math.pow((-1),i)*this.nSk1(i+j,i+1)*Math.pow(this.ln(x),-i-j)*Math.pow(this.ln(this.ln(x)),j))/this.fact(j);
        }
        }
        return this.ln(x)-this.ln(this.ln(x))+o;
    }
    dfact(x){
        if(Math.round(x)==x){
            if(x-2*Math.floor(x/2)==0){
                return this.prod(1,x/2,"2*k");
            }else{
                return this.prod(1,(x+1)/2,"2*k-1");
            }
        }else{
            console.error("整数のみしか入力できません！");
        }
    }
    factpow(x,n){
        return this.prod(1,n,`${x}+k-1`);
    }
    F(a,b,c,z,n){
        if(!n){
            n=50;
        }
        return this.sum(0,n,`this.factpow(${a},k)*this.factpow(${b},k)*Math.pow(${z},k)/(this.factpow(${c},k)*this.fact(k))`)
    }
    /*複素数*/
    complex(f){
        let real=0;
        let imag=0;
        let i=0;
        f=f.replaceAll("i**0","1");
        f=f.replaceAll("i**2","(-1)");
        f=f.replaceAll("i**3","(-i)");
        f=f.replaceAll("i**4","1");
        f=f.replaceAll("i**5","i");
        real=eval(f);
        i=1;
        imag=eval(f)-real;
        if(real!=0 || imag!=0){
        return [real,imag];
            }
        }
    Re(z){
        return z[0];
    }
    complexAbs(input){
            return Math.sqrt(this.complex(input)[0]**2+this.complex(input)[1]**2);
        }
    imagPow(base,imag){
        imag=imag*this.ln(base);
        return this.complex("Math.cos("+imag+")+i*Math.sin("+imag+")");
        }
    zFact(z){
        //複素数の階乗
    let res={real:0,imag:0}
    if(z.real<0){
        let G=this.zFact({real:z.real+1,imag:z.imag});
        let r=Math.hypot(z.real+1,z.imag);
        if(r==0){
            r+=0.000001;
        }
        let X=Math.exp(-Math.log(r))*Math.cos(Math.atan2(z.imag,z.real+1));
        let Y=Math.exp(-Math.log(r))*Math.sin(Math.atan2(z.imag,z.real+1));
        return {real:G.real*X+G.imag*Y,imag:G.imag*X-G.real*Y};
    }
    let inf=100;
    res.real=this.int(0,inf,`Math.exp(${z.real}*Math.log(x+0.000000001)-x)*Math.cos(${z.imag}*Math.log(x+0.000000001))`,1000);
    res.imag=this.int(0,inf,`Math.exp(${z.real}*Math.log(x+0.000000001)-x)*Math.sin(${z.imag}*Math.log(x+0.000000001))`,1000);
    return res;
    }
    arg(z){
        return Math.atan2(z.imag,z.real);
    }
    abs(z){
        return Math.hypot(z.real,z.imag);
    }
    znCr(za,zb){
        let z=this.zFact(za);
        let b=this.zFact(zb);
        let c=this.zFact({real:za.real-zb.real,imag:za.imag-zb.imag});
        let w={real:this.abs(b)*this.abs(c)*Math.cos(this.arg(b)+this.arg(c)),imag:this.abs(b)*this.abs(c)*Math.sin(this.arg(b)+this.arg(c))};
        return {
            real:(z.real*Math.cos(this.arg(w))+z.imag*Math.sin(this.arg(w)))/this.abs(w),
            imag:(z.imag*Math.cos(this.arg(w))-z.real*Math.sin(this.arg(w)))/this.abs(w)};
    }
    /*線形代数学*/
    matrixSum(...matrix){
        let c=[];
        for(let k=0; k<matrix[0].length; ++k){
        c.push([]);
        }
        for(let i=0; i<c.length; ++i){
        for(let j=0; j<c.length; ++j){
            let a=0;
            for(let k=0; k<matrix.length; ++k){
                a+=matrix[k][i][j];
            }
            c[i][j]=a;
        }
        }
        return c;
    }
    matrixProdScalar(x,matrix){
        let c=[];
        for(let k=0; k<matrix.length; ++k){
        c.push([]);
        }
        for(let i=0; i<c.length; ++i){
        for(let j=0; j<c.length; ++j){
            c[i][j]=matrix[i][j]*x;
        }
        }
        return c;
    }
    matrixProd(...matrix){
        let res=[];
        for(let k=0; k<matrix[0].length; ++k){
        res.push([]);
        }
        for(let i=0; i<matrix[0].length; ++i){
        for(let j=0; j<matrix[1][0].length; ++j){
            res[i][j]=0;
            for(let k=0; k<matrix[0][0].length; ++k){
            res[i][j]+=matrix[0][i][k]*matrix[1][k][j];
            }
        }
        }
        return res;
    }
    innerProd(a,b){
        let res=0;
        for(let k=0; k<a.length; ++k){
        res+=a[k]*b[k];
        }
        return res;
    }
    crossProd(a,b){
        return [this.det(3,[1,a[0],b[0],0,a[1],b[1],0,a[2],b[2]]),this.det(3,[0,a[0],b[0],1,a[1],b[1],0,a[2],b[2]]),this.det(3,[0,a[0],b[0],0,a[1],b[1],1,a[2],b[2]])];
    }
    outerProd(a,b){
        let res=[];
        for(let k=0; k<a.length; ++k){
            res.push([]);
        }
        for(let i=0; i<a.length; ++i){
        for(let j=0; j<b.length; ++j){
        res[i][j]=a[i]*b[j];
        }
        }
        return res;
    }
    equations(...coefficients){
        let ans=[];
        var M=[];
        let index=0;
        for(const c of coefficients){
            M.push([]);
            for(const C of c.slice(0,c.length-1)){
            M[index].push(C);
            }
            index++;
        }
        var data="[";
        for(let k=0; k<M.length; ++k){
            data+=`[`;
            for(let i=0; i<M[k].length; ++i){
                data+=`${M[k][i]}`;
                if(i+1<M[k].length){
                    data+=",";
                }
            }
            data+="]";
            if(k+1<M.length){
                data+=",";
            }
        }
        data+="]";
        let detA=this.det(M);
        for(let i=0; i<coefficients.length; ++i){
        let m=eval(data);
        for(let k=0; k<coefficients.length; ++k){
        m[k][i]=coefficients[k][coefficients[k].length-1];
        }
        let det2=this.det(m);
        ans.push(det2/detA);
        }
        return ans;
    }
    randomInt(min,max,digit){
        if(!digit){
            digit=0;
            }
        return Math.round(Math.pow(10,digit)*(Math.random()*(max-min)+min))/Math.pow(10,digit);
    }
    /*集合論*/
    union(...sets){
        let res=[];
        for(let n=0; n<sets.length; ++n){
        for(let k=0; k<sets[n].length; ++k){
            if(res.indexOf(sets[n][k])==-1){
            res.push(sets[n][k]);
            }
        }
        }
        return res;
    }
    intersection(...sets){
        let val="";
        if(sets.length>2){
            let A=sets.slice(2);
            for(let n=0; n<A.length; ++n){
            val+="[";
            for(let k=0; k<A[n].length; ++k){
                val+=A[n][k];
                if(k+1<A[n].length){
                    val+=",";
                    }
            }
            val+="]";
                if(n+1<A.length){
                    val+=",";
                }
            }
            sets=sets.slice(0,2);
        }
        let res=[];
        for(let n=0; n<sets.length; ++n){
        for(let k=0; k<sets[n].length; ++k){
        for(let N=0; N<sets.length; ++N){
            if(n!=N){
        for(let K=0; K<sets[N].length; ++K){
            if(sets[N][K]==sets[n][k]){
                if(res.indexOf(sets[n][k])==-1){
                res.push(sets[n][k]);
                    }
            }
        }
                }
        }
        }
        }
        if(val!=""){
            res=eval(`this.intersection(res,${val})`);
        }
        return res;
    }
    difference(U,set){
        let res=[];
        for(let k=0; k<set.length; ++k){
            if(set.indexOf(U[k])==-1){
                res.push(U[k]);
            }
        }
        return res;
    }
    //数学記述言語の操作
    parseTex(string){
        while(string.indexOf(`\left`)!=-1){
            let id=string.indexOf(`\left`);
        if(isFinite(string[id-1])){
            //あきらめ
        }
        }
        return string.replaceAll(`\\cdot`,"*");
    }
    toTex(string){
        let tex=string;
        tex=tex.replaceAll(`m.`,`\\`).replaceAll(`Math.`,`\\`);
        tex=tex.replaceAll("/",`\\frac{${tex[tex.indexOf("/")-1]}}{${tex[tex.indexOf("/")+1]}}`);
        tex=tex.replaceAll(`*`,`\\cdot`).replaceAll(`(`,`\\left(`).replaceAll(`)`,`\\right)`);
        console.log(tex);
        return tex;
    }
}
class complex{
    constructor(real,imag){
        this.real=real;
        this.imag=imag;
    }
    get abs(){
        return Math.hypot(this.real,this.imag);
    }
    get arg(){
        return Math.atan2(this.imag,this.real);
    }
    get angle(){
        return 180*(this.arg/Math.PI+1);
    }
    get conjugation(){
        return new complex(this.real,-this.imag);
    }
}
class complexMath{
    z(real,imag){
        return new complex(real,imag);
    }
    polar(radius,theta){
        return new complex(radius*Math.cos(theta),radius*Math.sin(theta));
    }
    arg(z){
        return z.arg;
    }
    abs(z){
        return z.abs;
    }
    conjugation(z){
        return z.conjugation;
    }
    sum(z,c){
        return this.z(z.real+c.real,z.imag+c.imag);
    }
    dec(z,c){
        return this.z(z.real-c.real,z.imag-c.imag);
    }
    prod(z,c){
        return this.polar(z.abs*c.abs,z.arg+c.arg);
    }
    quot(z,c){
        return this.prod(z,this.pow(c,this.z(-1,0)));
    }
    exp(z){
        return this.polar(Math.exp(z.real),z.imag);
    }
    ln(z){
        return this.z(Math.log(z.abs),z.arg);
    }
    pow(z,c){
        if(z.abs==0){
            return this.z(0,0);
        }
        return this.exp(this.prod(c,this.ln(z)));
    }
    log(z,c){
        return this.quot(this.ln(c),this.ln(z));
    }
    sin(z){
        return this.quot(this.dec(this.exp(this.prod(this.z(0,1),z)),this.exp(this.prod(this.z(0,-1),z))),this.z(0,2));
    }
    sinzmc(z){
        const m=new mathematics();
        let res=this.z(0,0);
        for(let k=0; k<10; ++k){
            res=this.sum(res,this.prod(this.z(Math.pow(-1,k),0),this.quot(this.pow(z,this.z(2*k+1,0)),this.z(m.fact(2*k+1),0))));
        }
        return res;
    }
    cos(z){
        return this.quot(this.sum(this.exp(this.z(-z.imag,z.real)),this.exp(this.z(z.imag,-z.real))),this.z(2,0));
    }
    tan(z){
        return this.quot(this.sin(z),this.cos(z));
    }
    mandelbrot(z,n){
        let c=this.z(0,0);
        for(let k=0; k<n; ++k){
            c=this.sum(this.pow(c,this.z(2,0)),z);
        }
        return c;
    }
}
class quaternion{
    constructor(real,i,j,k){
        this.real=real;
        this.i=i;
        this.j=j;
        this.k=k;
    }
    get imag(){
        return new vector(this.i,this.j,this.k);
    }
    get vector(){
        //単位ベクトル
        return new vector(this.i/this.imag.length,this.j/this.imag.length,this.k/this.imag.length);
    }
    get abs(){
        return Math.hypot(this.real,this.imag.length);
    }
    get arg(){
        return Math.atan2(this.imag.length,this.real);
    }
    get arg3(){
        return [Math.atan2(this.i,this.real),Math.atan2(this.j,this.real),Math.atan2(this.k,this.real)];
    }
    get angle(){
        return 180*(this.arg/Math.PI);
    }
    get conjugation(){
        return new quaternion(this.real,-this.i,-this.j,-this.k);
    }
}
class quaternionMath{
    q(real,i,j,k){
        return new quaternion(real,i,j,k);
    }
    vecq(r,v){
        return new quaternion(r,v.x,v.y,v.z);
    }
    polar(radius,vector,theta){
        const v=vector.length;
        vector.x=vector.x/v;
        vector.y=vector.y/v;
        vector.z=vector.z/v;
        return new quaternion(radius*Math.cos(theta),radius*vector.x*Math.sin(theta),radius*vector.y*Math.sin(theta),radius*vector.z*Math.sin(theta));
    }
    arg(q){
        return q.arg;
    }
    abs(q){
        return q.abs;
    }
    sum(q,p){
        return this.q(q.real+p.real,q.i+p.i,q.j+p.j,q.k+p.k);
    }
    dec(q,p){
        return this.q(q.real-p.real,q.i-p.i,q.j-p.j,q.k-p.k);
    }
    prod(q,p){
        if(Number.isFinite(p)){
            return this.vecq(q.real*p,vec3.prod(q.imag,p));
        }
        return this.vecq(q.real*p.real-vec3.dot(q.imag,p.imag),vec3.sum(vec3.sum(vec3.prod(p.imag,q.real),vec3.prod(q.imag,p.real)),vec3.cross(q.imag,p.imag)));
    }
    exp(q){
        return this.polar(Math.exp(q.real),q.vector,q.imag.length);
    }
    ln(q){
        return this.q(Math.log(q.abs),q.vector.x*q.arg,q.vector.y*q.arg,q.vector.z*q.arg);
    }
    pow(q,p){
    if(q.abs==0){
        return q;
    }else{
        if(Number.isFinite(q) && Number.isFinite(p)){
            return this.q(Math.pow(q,p),0,0,0);
        }
        if(!Number.isFinite(q) && !Number.isFinite(p) && q.imag.length==0 && p.imag.length==0){
            return this.q(Math.pow(q.real,p.real),0,0,0);
        }
        if(!Number.isFinite(q) && q.imag.length==0 && Number.isFinite(p)){
            return this.q(Math.pow(q.real,p),0,0,0);
        }
        if(!Number.isFinite(p) && Number.isFinite(q) && p.imag.length==0){
            return this.q(Math.pow(q,p.real),0,0,0);
        }
        if(Number.isFinite(q)){
            return this.exp(this.prod(p,this.q(Math.log(q),0,0,0)));
        }
        if(Number.isFinite(p)){
            return this.exp(this.prod(this.q(p,0,0,0),this.ln(q)));
        }
        if(q.imag.length==0){
            return this.exp(this.prod(p,this.q(Math.log(q.real),0,0,0)));
        }
        if(p.imag.length==0){
            return this.exp(this.prod(this.q(p.real,0,0,0),this.ln(q)));
        }
        return this.exp(this.prod(p,this.ln(q)));
    }
    }
    quot(q,p){
        if(Number.isFinite(p)){
            return this.prod(q,this.q(1/p,0,0,0));
        }
        if(p.imag.length==0){
            return this.prod(q,this.q(1/p.real,0,0,0));
        }
        return this.prod(q,this.pow(p,-1));
    }
    sin(q){
        const m=new mathematics();
        let res=this.q(0,0,0,0);
        for(let k=0; k<10; ++k){
            res=this.sum(res,this.prod(this.q(Math.pow(-1,k),0,0,0),this.quot(this.pow(q,2*k+1),this.q(m.fact(2*k+1),0,0,0))));
        }
        return res;
    }
    toText(q){
        let real=q.real;
        let i=q.i+"";
        let j=q.j+"";
        let k=q.k+"";
        if(real==0 && i==0 && j==0 && k==0){
            real=0;
            i="";
            j="";
            k="";
        }else{
            if(parseFloat(i)>0){
                if(real!=0){
                    i="+"+i;
                }
            }
            if(parseFloat(j)>0){
                if(real!=0 || i!=0){
                    j="+"+j;
                }
            }
            if(parseFloat(k)>0){
                if(real!=0 || i!=0 || j!=0){
                    k="+"+k;
                }
            }
            if(real==0){
                real="";
            }
            if(i==0){
                i="";
            }else if(Math.abs(parseFloat(i))!=1){
                i=i+"i";
            }else{
                i=i.replaceAll("1","i");
            }
            if(j==0){
                j="";
            }else if(Math.abs(parseFloat(j))!=1){
                j=j+"j";
            }else{
                j=j.replaceAll("1","j");
            }
            if(k==0){
                k="";
            }else if(Math.abs(parseFloat(k))!=1){
                k=k+"k";
            }else{
                k=k.replaceAll("1","k");
            }
        }
        return `${real}${i}${j}${k}`;
    }
}
class octonion{
    constructor(real,i,j,k,e,f,g,h){
        if(i===undefined){
            i=0;
        }
        if(j===undefined){
            j=0;
        }
        if(k===undefined){
            k=0;
        }
        if(e===undefined){
            e=0;
        }
        if(f===undefined){
            f=0;
        }
        if(g===undefined){
            g=0;
        }
        if(h===undefined){
            h=0;
        }
        this.real=real;
        this.i=i;
        this.j=j;
        this.k=k;
        this.e=e;
        this.f=f;
        this.g=g;
        this.h=h;
    }
    get imag(){
        return [this.i,this.j,this.k,this.e,this.f,this.g,this.h];
    }
    get vector(){
        //単位ベクトル
        let res=[];
        for(let k=0; k<8-1; ++k){
            if(vec.length(this.imag)==0){
                res.push(0);
            }else{
        res.push(this.imag[k]/vec.length(this.imag));
            }
        }
        return res;
    }
    get abs(){
        return Math.sqrt(Math.pow(this.real,2)+Math.pow(this.i,2)+Math.pow(this.j,2)+Math.pow(this.k,2)+Math.pow(this.e,2)+Math.pow(this.f,2)+Math.pow(this.g,2)+Math.pow(this.h,2));
    }
    get arg(){
        return Math.atan2(vec.length(this.imag),this.real);
    }
    get conjugate(){
        return new octonion(this.real,-this.i,-this.j,-this.k,-this.e,-this.f,-this.g,-this.h);
    }
}
class octonionMath{
    o(real,i,j,k,e,f,g,h){
        return new octonion(real,i,j,k,e,f,g,h);
    }
    veco(x,v){
        return new octonion(x,v[0],v[1],v[2],v[3],v[4],v[5],v[6]);
    }
    polar(radius,vector,theta){
        for(var v of vector){
            v=v/vec.length(vector);
        }
        return this.veco(radius*Math.cos(theta),vec.prod(vec.prod(vector,radius),Math.sin(theta)));
    }
    fromQuaternion(q,p){
        return new octonion(q.real,q.i,q.j,q.k,p.real,p.i,p.j,p.k);
    }
    sum(a,b){
        return this.o(a.real+b.real,a.i+b.i,a.j+b.j,a.k+b.k,a.e+b.e,a.f+b.f,a.g+b.g,a.h+b.h);
    }
    dec(a,b){
        return this.o(a.real-b.real,a.i-b.i,a.j-b.j,a.k-b.k,a.e-b.e,a.f-b.f,a.g-b.g,a.h-b.h);
    }
    prod(a,b){
        const q=new quaternionMath();
        let aq=[new quaternion(a.real,a.i,a.j,a.k),new quaternion(a.e,a.f,a.g,a.h)];
        let bq=[new quaternion(b.real,b.i,b.j,b.k),new quaternion(b.e,b.f,b.g,b.h)];
        return this.fromQuaternion(q.dec(q.prod(aq[0],bq[0]),q.prod(bq[1].conjugation,aq[1])),q.sum(q.prod(bq[1],aq[0]),q.prod(aq[1],bq[0].conjugation)));
    }
    exp(o){
        return this.polar(Math.exp(o.real),o.vector,vec.length(o.imag));
    }
    ln(o){
        return this.veco(Math.log(o.abs),vec.prod(o.vector,o.arg));
    }
    pow(a,b){
        return this.exp(this.prod(b,this.ln(a)));
    }
    quot(a,b){
        return this.prod(a,this.pow(b,this.o(-1,0,0,0,0,0,0,0))); 
    }
    log(a,b){
        return this.quot(this.ln(b),this.ln(a));
    }
}
class sedenion{
    constructor(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15){
        if(e1===undefined){
            e1=0;
        }
        if(e2===undefined){
            e2=0;
        }
        if(e3===undefined){
            e3=0;
        }
        if(e4===undefined){
            e4=0;
        }
        if(e5===undefined){
            e5=0;
        }
        if(e6===undefined){
            e6=0;
        }
        if(e7===undefined){
            e7=0;
        }
        if(e8===undefined){
            e8=0;
        }
        if(e9===undefined){
            e9=0;
        }
        if(e10===undefined){
            e10=0;
        }
        if(e11===undefined){
            e11=0;
        }
        if(e12===undefined){
            e12=0;
        }
        if(e13===undefined){
            e13=0;
        }
        if(e14===undefined){
            e14=0;
        }
        if(e15===undefined){
            e15=0;
        }
        this.e0=e0;
        this.e1=e1;
        this.e2=e2;
        this.e3=e3;
        this.e4=e4;
        this.e5=e5;
        this.e6=e6;
        this.e7=e7;
        this.e8=e8;
        this.e9=e9;
        this.e10=e10;
        this.e11=e11;
        this.e12=e12;
        this.e13=e13;
        this.e14=e14;
        this.e15=e15;
    }
    get array(){
        return [this.e0,this.e1,this.e2,this.e3,
            this.e4,this.e5,this.e6,this.e7,
            this.e8,this.e9,this.e10,this.e11,
            this.e12,this.e13,this.e14,this.e15];
    }
    get imag(){
        return this.array.slice(1,16);
    }
    get vector(){
        //単位ベクトル
        let res=[];
        for(let k=0; k<16-1; ++k){
        if(vec.length(this.imag)==0){
            res.push(0);
        }else{
        res.push(this.imag[k]/vec.length(this.imag));
        }
        }
        return res;
    }
    get abs(){
        return vec.length(this.array);
    }
    get arg(){
        return Math.atan2(vec.length(this.imag),this.e0);
    }
    get conjugate(){
        let res=[this.e0];
        let S=vec.prod(this.imag,-1);
        for(const s of S){
            res.push(s);
        }
        return res;
    }
}
class sedenionMath{
    s(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15){
        return new sedenion(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15);
    }
    vecs(x,v){
        return new sedenion(x,v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12],v[13]);
    }
    polar(radius,vector,theta){
        for(var v of vector){
            v=v/vec.length(vector);
        }
        return this.vecs(radius*Math.cos(theta),vec.prod(vec.prod(vector,radius),Math.sin(theta)));
    }
    fromOctonion(a,b){
        return new sedenion(a.real,a.i,a.j,a.k,a.e,a.f,a.g,a.h,b.real,b.i,b.j,b.k,b.e,b.f,b.g,b.h);
    }
    sum(a,b){
        let res=vec.sum(a.array,b.array);
        return this.vecs(res[0],res.slice(1,16));
    }
    dec(a,b){
        let res=vec.dec(a.array,b.array);
        return this.vecs(res[0],res.slice(1,16));
    }
    prod(a,b){
        const o=new octonionMath();
        let ao=[new octonion(a.e0,a.e1,a.e2,a.e3,a.e4,a.e5,a.e6,a.e7),new octonion(a.e8,a.e9,a.e10,a.e11,a.e12,a.e13,a.e14,a.e15)];
        let bo=[new octonion(b.e0,b.e1,b.e2,b.e3,b.e4,b.e5,b.e6,b.e7),new octonion(b.e8,b.e9,b.e10,b.e11,b.e12,b.e13,b.e14,b.e15)];
        return this.fromOctonion(o.dec(o.prod(ao[0],bo[0]),o.prod(bo[1].conjugate,ao[1])),o.sum(o.prod(bo[1],ao[0]),o.prod(ao[1],bo[0].conjugate)));
    }
    exp(s){
        return this.polar(Math.exp(s.e0),s.vector,vec.length(s.imag));
    }
    ln(s){
        return this.vecs(Math.log(s.abs),vec.prod(s.vector,s.arg));
    }
    pow(a,b){
        return this.exp(this.prod(b,this.ln(a)));
    }
    quot(a,b){
        return this.prod(a,this.pow(b,this.s(-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0))); 
    }
    log(a,b){
        return this.quot(this.ln(b),this.ln(a));
    }
}
class vector{
    constructor(x,y,z){
        this.R=2;
        this.x=x;
        this.y=y;
        if(z!==undefined){
        this.z=z;
        this.R++;
        }
    }
    get length(){
        if(this.R==2){
            return Math.hypot(this.x,this.y);
        }else{
            return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
        }
    }
}
const vec={
    length(A){
        let res=0;
        for(const a of A){
            res+=Math.pow(a,2);
        }
        return Math.sqrt(res);
    },
    sum(A,B){
        for(let k=0; k<A.length; ++k){
            A[k]=A[k]+B[k];
        }
        return A;
    },
    dec(A,B){
        for(let k=0; k<A.length; ++k){
            A[k]=A[k]-B[k];
        }
        return A;
    },
    prod(A,x){
        let res=[];
        for(var a of A){
            res.push(a*x);
        }
        return res;
    }
}
const vec2={
    dot(a,b){
        return a.x*b.x+a.y*b.y;
    }
}
const vec3={
    sum(a,b){
        return new vector(a.x+b.x,a.y+b.y,a.z+b.z);
    },
    dec(a,b){
        return new vector(a.x-b.x,a.y-b.y,a.z-b.z);
    },
    prod(a,x){
        return new vector(a.x*x,a.y*x,a.z*x);
    },
    dot(a,b){
        return a.x*b.x+a.y*b.y+a.z*b.z;
    },
    cross(a,b){
        return new vector(a.y*b.z-a.z*b.y,a.z*b.x-b.z*a.x,a.x*b.y-a.y*b.x);
    }
}
const mat2={
}
const mat3={
}
const mat4={

}
const mat={
    cofactor(matrix, row, col) {
        row-=1;
        col-=1;
  const cofactorMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i !== row) {
      const rowCopy = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j !== col) {
          rowCopy.push(matrix[i][j]);
        }
      }
      cofactorMatrix.push(rowCopy);
    }
  }
  return cofactorMatrix;
    },
    det(matrix){
        let size=matrix.length;
        if(size!=matrix[0].length){
            console.error("The determinant must be a square matrix!");
            return;
        }
let A=matrix;
        if(size==2){
            return (A[0][0]*A[1][1]-A[1][0]*A[0][1]);
        }else if(size==3){
            return (A[0][0]*A[1][1]*A[2][2]-A[0][0]*A[1][2]*A[2][1]+A[0][1]*A[1][2]*A[2][0]-A[0][1]*A[1][0]*A[2][2]+A[0][2]*A[1][0]*A[2][1]-A[0][2]*A[1][1]*A[2][0]);
        }else{
            let res=0;
            for(let i=0; i<matrix.length; i++) {
    res+=Math.pow(-1,i)*matrix[0][i]*this.det(this.cofactor(matrix, 1, i+1));
  }
  return res;
        }
    }
}