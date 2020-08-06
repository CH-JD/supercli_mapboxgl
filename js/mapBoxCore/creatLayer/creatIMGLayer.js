export default function creatRestLayer(map,options){
    /*
    [
       //图像显示4个点的位置信息
       [73.146939, 53.857304], //左上
       [135.409885, 53.857304], //右上
       [135.409885, 17.894901], //右下
       [73.146939, 17.894901] //左下
    ]
    */
    if(!options.hasOwnProperty("url")||!options.hasOwnProperty("id")){
        throw  new Error("mvt服务传参不对必须要有服务url和服务Id");
        return;
    }
    map.addLayer({
        //添加别墅的geojson图层进行三维的显示
        id: `${options.id}`, //图层名称
        type: "raster", //显示类型为栅格
        source: {
            type: "image", //数据源为类型为image
            url: `${options.url}`, //图像地址
            coordinates:`${options.coordinates}`
        }
    });

}