/**
 * arguments
 * type:bd09togcj02 gcj02tobd09 wgs84togcj02 type string
 * lng type float
 * lat type float
 */
class GeoCodeTransformClass {
    constructor(type,lng,lat){
        this.x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        this.PI = 3.1415926535897932384626;
        this.a = 6378245.0;
        this.ee = 0.00669342162296594323;
        this.type = type;
        this.lng = lng;
        this.lat = lat;
    }
    out_of_china(){
        return (this.lng < 72.004 || this.lng > 137.8347) || ((this.lat < 0.8293 || this.lat > 55.8271) || false);
    }
    transformlat(){
        let ret = -100.0 + 2.0 * this.lng + 3.0 * this.lat + 0.2 * this.lat * this.lat + 0.1 * this.lng * this.lat + 0.2 * Math.sqrt(Math.abs(this.lng));
        ret += (20.0 * Math.sin(6.0 * this.lng * this.PI) + 20.0 * Math.sin(2.0 * this.lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(this.lat * this.PI) + 40.0 * Math.sin(this.lat / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(this.lat / 12.0 * this.PI) + 320 * Math.sin(this.lat * this.PI / 30.0)) * 2.0 / 3.0;
        return ret
    }
    transformlng(){
        var ret = 300.0 + this.lng + 2.0 * this.lat + 0.1 * this.lng * this.lng + 0.1 * this.lng * this.lat + 0.1 * Math.sqrt(Math.abs(this.lng));
        ret += (20.0 * Math.sin(6.0 * this.lng * this.PI) + 20.0 * Math.sin(2.0 * this.lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(this.lng * this.PI) + 40.0 * Math.sin(this.lng / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(this.lng / 12.0 * this.PI) + 300.0 * Math.sin(this.lng / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret
    }

    /**
     * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
     * 即 百度 转 谷歌、高德
     * @param bd_lon
     * @param bd_lat
     * @returns {*[]}
     */
    bd09togcj02(){
        let x = this.lng - 0.0065;
        let y = this.lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y *  this.x_PI);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x *  this.x_PI);
        let gg_lng = z * Math.cos(theta);
        let gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat]
    }
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    gcj02tobd09() {
        let z = Math.sqrt(this.lng * this.lng + this.lat * this.lat) + 0.00002 * Math.sin(this.lat *this.x_PI);
        let theta = Math.atan2(this.lat, this.lng) + 0.000003 * Math.cos(this.lng * this.x_PI);
        let bd_lng = z * Math.cos(theta) + 0.0065;
        let bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat]
    }
    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    wgs84togcj02() {
        if (this.out_of_china(this.lng, this.lat)) {
            return [this.lng, this.lat]
        }
        else {
            let dlat = this.transformlat(this.lng - 105.0, this.lat - 35.0);
            let dlng = this.transformlng(this.lng - 105.0, this.lat - 35.0);
            let radlat = this.lat / 180.0 * this.PI;
            let magic = Math.sin(radlat);
            magic = 1 - this.ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * this.PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * this.PI);
            let mglat = this.lat + dlat;
            let mglng = this.lng + dlng;
            return [mglng, mglat]
        }
    }

    init(){
        switch (this.type) {
            case "bd09togcj02":
               return this.bd09togcj02();
               break;
            case "gcj02tobd09":
                return this.gcj02tobd09();
                break;
            case "wgs84togcj02":
                return this.wgs84togcj02();
                break;

        }
    }

}