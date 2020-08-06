
export default function creatRestLayer(map,options){

    if(!options.hasOwnProperty("url")||options.hasOwnProperty("id")){
        throw  new Error("rest服务传参不对必须要有服务url和i服务Id");
        return;
    }
    map.addLayer({
        id: options.id,
        type: "raster",
        source: {
            "type": "raster",
            "tiles": [options.url],
            rasterSource: 'iserver'
        }
    });
}