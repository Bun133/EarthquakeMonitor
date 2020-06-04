const electron = window.electron
const ipcRenderer = electron.ipcRenderer

function onRecived(jsondata){
  console.log(getType(jsondata[0]['code']));
  console.log(getScale(jsondata[0]['earthquake']['maxScale']));
  console.log(getDomesticTunami(jsondata[0]['earthquake']['domesticTsunami']));
  // console.log(jsondata[0]['points']);
  printPoints(jsondata[0]['points']);
  console.log(`この地震の最大震度は${getScale(jsondata[0]['earthquake']['maxScale'])}`);
  console.log(`この地震の発生時刻は${jsondata[0]['earthquake']['time']}`);
  console.log(getHypoCenterString(jsondata[0]['earthquake']['hypocenter']));
}

function scaleConvert(scale){
  return scale/10;
}

function getScale(scale){
  var shindo=0;
  switch(scale){
    case 45:
      return '震度5弱';
    case 50:
      return '震度5強';
    case 55:
      return '震度6弱';
    case 60:
      return '震度6強';
    default:
      return `震度${scaleConvert(scale)}`;
  }
}

function getDomesticTunami(tunamiData){
  switch (tunamiData) {
    case 'None':
      return '津波の心配なし';
    case 'Unknown':
      return '津波は不明';
    case 'Checking':
      return '津波は調査中';
    case 'NonEffective':
     return '若干の海面変動[被害の心配なし]';
    case 'Watch':
      return '津波注意報';
    case 'Warning':
      return '津波予報[種類不明]';
  }
}

function printPoints(arr){
  for(var i=0;i<arr.length;i++){
    console.log(`${arr[i]['addr']}:${getScale(arr[i]['scale'])}`);
  }
}

function getHypoCenterString(hypoData){
  return `震源地は${hypoData['name']}、緯度${hypoData['latitude']}、経度${hypoData['longitude']}、深さは${hypoData['depth']}、マグニチュードは${hypoData['magnitude']}`;
}

function getType(code){
  switch(code){
    case 551:
      return '津波情報';
      break;
    case 552:
      return '津波予報'
      break;
    case 5610:
      return '集計済み地震感知情報'
      break;
  }
}


ipcRenderer.send('get','get')

ipcRenderer.on('api-reply',(event,arg)=>{
  console.log(arg);
  onRecived(arg);
});
