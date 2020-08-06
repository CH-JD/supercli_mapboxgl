/**
 * arguments:
 * num(获取颜色个数) type:int;
 * isRelative(是否获取同一色系的) type:bool;
 * colorVal:(获取同一色系的时候必填) '#121212'
 * amt(同色系的明暗程度变化) + 变亮 -变暗
 *
 */
class GetColorVal {
    constructor(colorVal,num,isRelative,amt){
        this.num = num;
        this.isRelative = isRelative;
        this.colorVal = colorVal;
        this.amt = amt;
    }
    //获取随机颜色
    getRandomColor(){
       let HSLArr =[];
       for(let i =0;i<this.num;i++){
           let randomHSLValue = this.randomHSL();
           if (i > 0&&Math.abs(randomHSLValue[0] - HSLArr[i - 1][0]) < 0.25) {
               i--;
               continue; // 重新获取随机色
           }
           randomHSLValue[1] = 0.7 + (randomHSLValue[1] * 0.2); // [0.7 - 0.9] 排除过灰颜色
           randomHSLValue[2] = 0.4 + (randomHSLValue[2] * 0.4); // [0.4 - 0.8] 排除过亮过暗色
           randomHSLValue = randomHSLValue.map( (item) => {
               return parseFloat(item.toFixed(2));
           });
           HSLArr.push(randomHSLValue);
           return HSLArr.map( (item) => {
               return 'rgb(' + this.hslToRgb.apply(this,item).toString()+ ')';
           });
       }
    }
    //生成随机色值
    randomHSL(){
        let H = Math.random();
        let S = Math.random();
        let L = Math.random();
        return [H, S, L];
    }
    //获取同一色系的颜色
    getAllRelationColor(amt){
        let col = this.colorVal.toLowerCase();
        let usePound = false;
        if(col.indexOf("rgb")!==-1){
            col=col.replace(/rgb/,'');
            col=this.colorRGB2Hex();
        }
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        let num = parseInt(col,16);
        let r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
        let g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }
    /**
     * HSL颜色值转换为RGB
     * H，S，L 设定在 [0, 1] 之间
     * R，G，B 返回在 [0, 255] 之间
     *
     * @param H 色相
     * @param S 饱和度
     * @param L 亮度
     * @returns Array RGB色值
     */
    hslToRgb(){
        let H =this.colorVal[0],S = this.colorVal[1],L = this.colorVal[2];
        let R, G, B;
        if (+S === 0) {
            R = G = B = L; // 饱和度为0 为灰色
        } else {
            let hsl2Rgb = function (p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            let Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
            let P = 2 * L - Q;
            R = hsl2Rgb(P, Q, H + 1 / 3);
            G = hsl2Rgb(P, Q, H);
            B = hsl2Rgb(P, Q, H - 1 / 3);
        }
        return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
    }

    //颜色转换
    /**
     * RGB颜色值转换为HEX
     * R，G，B 设定在 [0, 255] 之间
     * HEX 返回 #******
     * @returns HEX色值
     */
    colorRGB2Hex(){
        let rgb = this.colorVal.split(',');
        let r = parseInt(rgb[0].split('(')[1]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2].split(')')[0]);
        let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }
    //RGBColorTorgb
    /**
     * RGB颜色值转换为RGB [255,255,255]
     * R，G，B 设定在 [0, 255] 之间
     * rgb 返回在 [0, 255] 之间
     * @returns rgb色值
     */
    RGBColorTorgb(){
        let rgb = (this.colorVal + "").split(',');
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);
        return `rgb(${r},${g},${b})`;
    }
    /**
     * RGB颜色值转换为rgb
     * R，G，B 设定在 [0, 255] 之间
     * rgb 返回在 [0, 255] 之间
     * @returns [] rgb色值
     */
    rgbColorToRGB(){
        let rgb = this.colorVal.split(',');
        let r = parseInt(rgb[0].split('(')[1]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2].split(')')[0]);
        return [r, g, b]
    }
    //hexToRgb
    /**
     * hex 例如 #000000
     *
     * rgb 返回在 [0, 255] 之间
     * @returns [] rgb色值
     */
    hexToRgb(){
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorVal);
        return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`:"rgb(255,255,255)"
    }
    init(){
        if(this.isRelative){
            this.getAllRelationColor(this.amt);
        }else {
           this.getRandomColor();
        }
    }
}