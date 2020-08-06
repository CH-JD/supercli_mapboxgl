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
        "layout":  {
            // 使用图片资源
            'icon-image': `${options.iconPath}`,
            // 缩放
            'icon-size':  `${options.iconSize}`,
            // 旋转角度
            'icon-rotate':  `${options.iconRotate}`,
            // 偏移量
            'icon-offset': `${options.offset}`,
            // 跟随地图转动，推拉（3d效果那种）Mapbox 中叫 bearing 和 pitch
            'icon-allow-overlap':  `${options.overlap}`,
        }
    });
}