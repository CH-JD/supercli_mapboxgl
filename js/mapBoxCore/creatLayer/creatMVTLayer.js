export default function creatMVTLayer(map,options){
    if(!options.hasOwnProperty("url")||!options.hasOwnProperty("id")){
        throw  new Error("mvt服务传参不对必须要有服务url和服务Id");
        return;
    }
    //[75.81887805,18.293764819443287,134.2764634,50.81115741908195]
    map.addSource(`${options.sourceId}`,{
        "tiles": [`${options.url}`],
        "bounds":`${options.bounds}` ,
        "type": "vector"
    });
    map.addLayer({
        "layout": {
            "icon-image": `${options.imgPath}`,
            "icon-size": `${options.imgSize}`||0.3,
            "icon-padding": `${options.padding}`||0,
            'icon-allow-overlap':  `${options.overlap}`||false,
        },
        "metadata": {
            "layer:caption": `${options.caption}`,
        },
        "maxzoom":`${options.maxzoom}`,
        "minzoom": `${options.minzoom}`,
        "id":  `${options.id}`,
        "source": `${options.sourceId}`,
        "source-layer": `${options.sourceLayer}`,
        "type": "symbol",
    });
}