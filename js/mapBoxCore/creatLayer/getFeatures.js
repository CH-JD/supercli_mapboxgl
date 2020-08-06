export default function getFeatures(map,options){
    let timeCount = 0,features =[];
    let setInterVal = setInterval(()=>{
        timeCount++;
        features = map.querySourceFeatures(`${options.sourceName}`, {
            sourceLayer: `${options.sourceLayer}`
        });
        if(timeCount>=60&&features.length===0){
            window.clearInterval(setInterVal)
        }else if(features>0){
            window.clearInterval(setInterVal)
        }
    },1000)
    return features;
}