const electron = window.electron
const ipcRenderer = electron.ipcRenderer
const text=document.getElementsByClassName('text')

ipcRenderer.send('get','get')

ipcRenderer.on('api-reply',(event,arg)=>{
  console.log(arg);
  text.innerHTML=arg;
})
