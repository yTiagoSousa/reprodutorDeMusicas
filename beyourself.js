let play_pause = document.querySelector('#musicState');
let slider = document.querySelector('#progress');
let state = 0;
let track = document.createElement('audio');
track.ontimeupdate = () => this.audio_currentTime();
let index_n = 0;
let old_index = undefined;
let musicName;
let musicTemp = document.querySelector('#musicDuration');
let musicCurrent = document.querySelector('#timingMusic');
let testin = document.getElementsByTagName('audio');
let Musics = [
    {
        name: "All I Want",
        author: "Kodaline",
        path: "Musics/song1.mp3",
        img: "All I Want - Kodline",
        duracao: this.duration
    },
    {
        name: "The Ballad Of Cleopatra",
        author: "The Lumineers",
        path: "Musics/song2.mp3",
        img: "The Ballad Of Cleopatra - The Lumineers",
        duracao: this.duration
    },
    {
        name: "Não Tenho Mais Medo",
        author: "Filipe Guimarães",
        path: "Musics/song3.mp3",
        img: "??",
        duracao: this.duration
    },
    {
        name: "O Teu Amor Está Ganhando Forma",
        author: "DROPS",
        path: "Musics/song4.mp3",
        img: "DROPS",
        duracao: this.duration
    }
];

loadTrack(index_n);

function loadTrack(index_n){            

    resetSlider();

    track.src = Musics[index_n].path;       //Seleciona Faixa
    track.load();

    selectTrack(old_index, index_n);
        old_index = index_n;
    
    setTrackDuration();

}

function selectTrack(old_index,index_n){
    if(old_index != undefined){
        let old_Music = document.getElementById('music'+old_index);
            old_Music.style.backgroundColor ='black';
    }

    let item = document.getElementById('music'+index_n);
            item.style.backgroundColor ='purple';
        let musicNameTitle = document.getElementById('musicName');
            musicNameTitle.innerHTML = Musics[index_n].name;
        let musicAuthor = document.getElementById('authorName');
            musicAuthor.innerHTML = Musics[index_n].author;
        }

function trackDuration(){                   //Retorna Duração da Faixa em Minutos
        let duracao=track.duration;
        let timeTrack=parseMinute(duracao);
        console.log('sdasdadsd' + timeTrack)
        return timeTrack;
    }

function setTrackDuration(){   
    musicTemp.innerHTML = trackDuration();    //Escreve o tempo total da musica
}



function audio_currentTime(){
    let current0 = track.currentTime;
        console.log('currentTime = ' + current0);
        changeMusicOnPlay(current0);
        musicProgress(current0);
}

function changeMusicOnPlay(value){
    let musicTemp = parseMinute(value);
    timingMusic.innerHTML = musicTemp;   
}

function loadPlayList(){
    for( let i=0; Musics[i]!=undefined; i++){
        //Load musicName
        let musicNameID = 'musicName'+i;
        let musicName = document.getElementById(musicNameID);
            musicName.innerHTML = Musics[i].name;
            console.log(Musics[i].name);
        
            //Load musicAuthor
        let musicAuthorID = 'musicAuthor'+i;
        let musicAuthor = document.getElementById(musicAuthorID);
            musicAuthor.innerHTML = Musics[i].author;
            console.log(Musics[i].author);


            musicAuthorID.innerHTML += Musics[i].author;
            console.log(Musics[i].author);
        

            
        
        
    }
}
loadPlayList();




function musicState(value){
    switch(value){
        case 0:         //PAUSE
            pauseMusic();
            play_pause.innerHTML = '<i class="far fa-play-circle fa-3x iconColor"></i>';
            break;

        case 1:         //PLAY
            playMusic();
            play_pause.innerHTML = '<i class="far fa-pause-circle fa-3x iconColor"></i>';
            break;

        default:        //ERRO
            console.log('ERRO AO MUDAR ESTADO DA MUSICA');
            break;
    }
}

function changeState(){
    if(state==0)
        state=1;
           else
           state=0;
        musicState(state);
}

function playMusic(){           //Inicia o audio
    console.log("Entrou na funcao play");
    track.play();
}

function pauseMusic(){          //Pausa o audio
    console.log("Entrou na funcao pause");
    track.pause();
}

function resetSlider(){         //Define o valor do Slider para zero
    slider.value = 0;
}

function next(){                //Inicia a próxima Faixa
    
    if(index_n < (Musics.length-1)){
        index_n = index_n+1;
        }else{
            index_n=0;
            }
        console.log("music lenght = " + Musics.length);
        console.log("NEXT INDEX = " + index_n);
        loadTrack(index_n);
        musicState(state);          //Verifica se o player ira repoduzir a proxina faixa
}

function previous(){
    if(index_n >= 1){
        index_n = index_n-1;
        }else{
            index_n=(Musics.length-1);
            }
        console.log("music lenght = " + Musics.length);
        console.log("NEXT INDEX = " + index_n);
        loadTrack(index_n);
        musicState(state);          //Verifica se o player ira repoduzir a proxina faixa
}

function musicProgress(musicPosition){
    console.log('slider.value 00000   ' + slider.value)
    slider.max=track.duration;
    console.log('slider.value 11111   ' + slider.value)
    slider.value=musicPosition;
    console.log('slider.value 22222   ' + slider.value)
}

function Sliderposition(){
    slider_position = slider.value;
	track.currentTime = slider_position; 
}

function parseMinute(temp){
    let minutos = temp/60;
        minutos = Math.floor(minutos);
        console.log('minutos= ' + minutos);

    let segundos = temp%60;
        segundos = Math.floor(segundos);
        console.log('segundos= ' +  segundos);
    
    if(segundos < 10){
        segundos = '0'+segundos
    }
        return(minutos+':'+segundos);

}