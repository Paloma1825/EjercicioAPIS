
if (window.File && window.FileReader && window.FileList) {
   
   function handleFileSelect(evt) {
  
    let file = evt.target.files[0]; 

    if (!file.type.match('video.*')) {
        return;
    }
    let reader = new FileReader();
    reader.onload = (function (theFile) {
    return function (e) {
        
        const list = document.getElementsByClassName("class-video");
        if(list[0]!=null){
            list[0].parentNode.removeChild(list[0]);
        }


        let loadingMessage = document.createElement('p');

        loadingMessage.id = "loading";
        loadingMessage.className = "loading-message";
        loadingMessage.innerHTML = 'El video está cargando';
        document.getElementById('salida').insertBefore(loadingMessage, null);

        let span = document.createElement('span');
        span.id="contenedor-video"
        span.className="class-video"
        span.innerHTML = ['<video id="video" class="thumb" src="',e.target.result,'" title="', escape(theFile.name),'"/>'].join('');
        document.getElementById('salida').insertBefore(span, null);
        
        document.getElementById('video').addEventListener('canplay', () => {
            let loadingMessage = document.getElementById('loading');
            document.getElementById('salida').removeChild(loadingMessage);

        });
        
    }
    })(file);
   

    reader.readAsDataURL(file);

    
    document.getElementById('play').style.display='inline';
    document.getElementById('pause').style.display='inline';
    document.getElementById('volumeup').style.display='inline';
    document.getElementById('volumedown').style.display='inline';

    let playButton = document.getElementById('play');
    let pauseButton=document.getElementById('pause');
    let volumeupButton=document.getElementById('volumeup');
    let volumedownButton =document.getElementById('volumedown');

    playButton.addEventListener('click',Reproducir,false);

    pauseButton.addEventListener('click',Pausa,false);
    
    volumeupButton.addEventListener('click',SubirVolumen,false);

    volumedownButton.addEventListener('click',BajarVolumen,false);
    
    
    } 
}
else {
    alert('La API de FILE no es soportada en este navegador.');
}


document.getElementById('file').addEventListener('change',handleFileSelect, false);


function Reproducir(){
    document.getElementById('video').play();
    
}
function Pausa(){
    document.getElementById('video').pause();
}

function SubirVolumen(){
    document.getElementById('video').volume +=0.1;
}

function BajarVolumen(){
    document.getElementById('video').volume -=0.1;
}

