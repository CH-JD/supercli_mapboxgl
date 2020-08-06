/**
 * @author ch_jd
 * @date 2020-07-28
 * @Description: 地图平移操作
 * @param pClass 父级class
 * subClass 子级样式
 * map 地图
 * defaultClass 默认class
 */
export default class PaintControlClass {
  constructor(pClass,subClass,map,defaultClass){
    this.pClassEl = document.getElementsByClassName(`${pClass}`)[0];
    this.subClass = subClass;
    this.map = map;
    this.defaultClass = defaultClass;
  }
  hasClass(ele, cls){
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  }
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
  }
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, " ");
    }
  }
  toggleClass(ele,cls){
    if(this.hasClass(ele,cls)){
      this.removeClass(ele, cls);
    }else{
      this.addClass(ele, cls);
    }
  }
  togglePClass(ele,pClass,cClass){
      if(this.hasClass(ele,cClass)&&!this.hasClass(this.pClassEl,pClass)){
         for(let j =0,jl = Object.values(this.subClass).length;j<jl;j++){
           if(this.hasClass(this.pClassEl,Object.values(this.subClass)[j][1])){
             this.removeClass(this.pClassEl,Object.values(this.subClass)[j][1])
           }
         }
         this.addClass(this.pClassEl,pClass);
      }
  }
  init(){
    this.pClassEl.addEventListener("mousemove",e=> {
      if(e.target){
        for(let i =0,l=Object.values(this.subClass).length;i<l;i++){
          this.togglePClass(e.target,Object.values(this.subClass)[i][1],Object.values(this.subClass)[i][0]);
        }
      }else {
        if(!this.hasClass(this.pClassEl, this.defaultClass)){
          for(let j =0,jl = Object.values(this.subClass).length;j<jl;j++){
              this.removeClass(this.pClassEl,Object.values(this.subClass)[j][1])
          }
          this.addClass(this.pClassEl, this.defaultClass);
        }
      }

    });
    this.pClassEl.addEventListener("click",e => {
      if(this.hasClass(e.target,"sm-pan__center")){
        this.map.flyTo({
          center: [104.3, 32],
          bearing: 0
        });
      }
      let zoom = this.map.getZoom();
      let num = zoom<8&&4/zoom||2/zoom;
      if(this.hasClass(e.target,"is-left")){
        let center = this.map.getCenter();
        this.map.panTo([center.lng+=num,center.lat]);
      }
      if(this.hasClass(e.target,"is-right")){
        let center = this.map.getCenter();
        this.map.panTo([center.lng-=num,center.lat]);
      }
      if(this.hasClass(e.target,"is-top")){
        let center = this.map.getCenter();
        this.map.panTo([center.lng,center.lat-=num]);
      }
      if(this.hasClass(e.target,"is-bottom")){
        let center = this.map.getCenter();
        this.map.panTo([center.lng,center.lat+=num]);
      }

    });
    this.pClassEl.addEventListener("mouseout",e=> {
        if(!this.hasClass(this.pClassEl,"sm-pan--default")){
          for(let j =0,jl = Object.values(this.subClass).length;j<jl;j++){
            this.removeClass(this.pClassEl,Object.values(this.subClass)[j][1])
          }
          this.addClass(this.pClassEl,"sm-pan--default");
        }
    });
  }
}
