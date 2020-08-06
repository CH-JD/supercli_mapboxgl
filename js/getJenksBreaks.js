/** 自然断点法
 * args data type:Array int 必传;  num 分段个数  int  选传
 * 默认分段个数 6
 * 如果传入的数组去重个数小于默认值或者传入的分段个数值
 * 将会按照当前的数组的个数去分段
 * */
function getJenksBreaks(data,num=6){
  if(!data||!Array.isArray(data)||data.length===0){
    console.warn("自然分段的数据必须为数组并且数组的个数大于0!");
    //防止意外错误,返回一个空数组
    return [];
  }
  //设置默认的分段个数
  data.sort((a,b)=>a-b);
  //对数组进行向下取整并且去重
  let tD=data.map((item,index) => Math.floor(item)||0),tL=0;
  tD = [...(new Set(tD))];
  //对传入num参数进行二次处理
  tL =tD.length;
  num = tL<num&&tL||num;
  let k = data.length, kArr=[],mathArr1=[],mathArr2=[],res=[],v=0;
  for (let j = 0; j <= k; j++){
    mathArr1[j]=[];
    mathArr2[j]=[];
    res[j]=0;
    for(let i=0;i<=num;i++){
      mathArr1[j][i]=0;
      mathArr2[j][i]=0;
    }
  }
  for (let i = 1; i <= num; i++) {
    mathArr1[1][i] = 1;
    mathArr2[1][i] = 0;
    for (let j = 2; j <= k; j++){
      mathArr2[j][i]=Number.MAX_VALUE;
    }
  }
  for (let l = 2; l <= k; l++) {
    let s1=0,s2=0,w=0,i3=0;
    for (let m = 1; m <= l; m++) {
      i3 = l - m + 1;
      let val=parseFloat(data[i3-1]);
      s2 += val * val;
      s1 += val;
      w++;
      v = s2 - (s1 * s1) / w;
      let i4 = i3 - 1;
      if (i4 != 0) {
        for (let j = 2; j <= num; j++) {
          if (mathArr2[l][j] >= (v + mathArr2[i4][j - 1])) {
            mathArr1[l][j] = i3;
            mathArr2[l][j] = v + mathArr2[i4][j - 1];
          }
        }
      }
    }
    mathArr1[l][1] = 1;
    mathArr2[l][1] = v;
  }
  kArr[num - 1] = parseFloat(data[k-1]);
  for (let j = num; j >= 2; j--) {
    let id = parseFloat(mathArr1[k][j]) - 2;
    kArr[j - 2] = parseFloat(data[id]);
    k = parseFloat( mathArr1[k][j] - 1);
  }
  let resetKArr=[];
  for(let i =0,l=kArr.length;i<l;i++){
    if(!isNaN(kArr[i])&&kArr[i]!==undefined){
      resetKArr.push(kArr[i]);
    }
  }
  resetKArr=[...new Set(resetKArr)];
  return resetKArr;
};