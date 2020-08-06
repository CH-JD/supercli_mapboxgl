/*
 * 创建标注
 */
export default function creatLabelLayer (map,options) {
    if(!options.hasOwnProperty("id")){
        throw  new Error("mvt服务传参不对必须要有服务url和服务Id");
        return;
    }
    map.addLayer({
        "id": `${options.id}`,
        "type": "symbol",
        "source": {
            type: `${options.sourceType}`,//'geojson',
            data: `${options.data}`
        },
        "interactive": true,
        "layout": {
            "text-size": {
                base: `${options.textSize}`,
                stops:  `${options.stops}`,
            },
            "text-font": `${options.font}`,
            "text-max-width": 20,
            "text-offset": [0, 0.2],
            "text-anchor": `${options.anchor}`,
            "text-field": `{${options.field}}`,
        },
        "paint": {
            "text-color":  `${options.color}`,
            "text-halo-color": `${options.haloColor}`,
            "text-halo-width":  `${options.haloWidth}`,
        },
    });
}