/**
 * Created by gaowe on 2020/2/12.
 */

function regHandler(str){
  const userAgent = navigator.userAgent,
    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    rFirefox = /(firefox)\/([\w.]+)/,
    rOpera = /(opera).+version\/([\w.]+)/,
    rChrome = /(chrome)\/([\w.]+)/,
    rSafari = /version\/([\w.]+).*(safari)/;
  let browser;
  let version;
  const ua = userAgent.toLowerCase();
  function uaMatch(ua){
    let match = rMsie.exec(ua);
    if(match != null){
      return { browser : "IE", version : match[2] || "0" };
    }
    let match = rFirefox.exec(ua);
    if (match != null) {
      return { browser : match[1] || "", version : match[2] || "0" };
    }
    let match = rOpera.exec(ua);
    if (match != null) {
      return { browser : match[1] || "", version : match[2] || "0" };
    }
    let match = rChrome.exec(ua);
    if (match != null) {
      return { browser : match[1] || "", version : match[2] || "0" };
    }
    let match = rSafari.exec(ua);
    if (match != null) {
      return { browser : match[2] || "", version : match[1] || "0" };
    }
    if (match != null) {
      return { browser : "", version : "0" };
    }
  }
  let browserMatch = uaMatch(ua);
  if (browserMatch.browser){
    browser = browserMatch.browser;
    version = browserMatch.version;
  }
  let osInfoNum =regOSInfoFn();

  if(browser==="IE"&&parseInt(version)<=11){
    let regWarp= document.getElementById("reg-warp");
    let regBg =document.getElementById("reg-bg");
    let closeRegBtn = document.getElementById("close-reg-btn");
    let remarkBox =  document.getElementById("remark-box");
    let btnCancel = document.getElementById("btn-cancel");
    let btnHref32 = document.getElementById("btn-href-32");
    let btnHref64 = document.getElementById("btn-href-64");
    let contentBox = document.getElementById("content-box");
    contentBox.innerHTML=str;
    regWarp.style.display="block";
    regBg.style.display="block";
    btnCancel.onclick = function(){
      regWarp.style.display="none";
      regBg.style.display="none";
    };
    closeRegBtn.onclick = function(){
      regWarp.style.display="none";
      regBg.style.display="none";
    };
    if(osInfoNum===64){
      remarkBox.innerHTML="(您的系统位64位,我们推荐您下载64位的谷歌浏览器！)";
      btnHref32.style.display="none";
    }else if(osInfoNum===32){
      remarkBox.innerHTML="(您的系统位32位,我们推荐您下载32位的谷歌浏览器！)";
      btnHref64.style.display="none";
    }
    /*
     this.$confirm('浏览器版本过低（目前IE只支持IE11/IE（edge）版本！为了您更好的体验，我们建议您使用谷歌浏览器,去下载?', '提示', {
     confirmButtonText: '去下载',
     cancelButtonText: '取消',
     type: 'warning'
     }).then(() => {
     const elt = document.createElement('a');
     elt.setAttribute('href', 'google.zip');
     elt.setAttribute('download', '');
     elt.style.display = 'none';
     document.body.appendChild(elt);
     elt.click();
     document.body.removeChild(elt);
     }).catch(() => {
     });*/
  }

  function regOSInfoFn(){
    let _pf = navigator.platform,appVer = navigator.userAgent,_bit=null;
    if(_pf == "Win32" || _pf == "Windows") {
      if(appVer.indexOf("WOW64")>-1){
        _bit = 64;
      }else{
        _bit = 32;
      }
      return _bit;
    }
  }
}
regHandler("浏览器版本过低（目前IE只支持IE11/IE（edge）版本！");
