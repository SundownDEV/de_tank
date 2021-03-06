/*
 * nano.js * Audio Player library
 * by SundownDEV
 * version 1.0.0
 */

function nanoPlayer(player, options) {
    this.player = document.querySelector(player);
    this.options = options;
    
    /* Adding additional params */
    if(this.options.DefaultSong !== 'undefined'){
        this.options.index = this.options.DefaultSong;
    }else{
        this.options.index = 0;
    }
    
    this.options.current_timeline = '00:00';
    this.options.timeline = '00:00';
    this.options.playing = false;
    
    /* Init the player */
    var audioTag = document.createElement('audio');
    this.player.appendChild(audioTag);
    audioTag.preload = 'auto';
    
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('mainDiv');
    this.player.appendChild(mainDiv);
    
    /* Play button */
    var pButton = document.createElement('button');
    pButton.classList.add('pButton');
    mainDiv.appendChild(pButton);
    pButton.innerHTML = 'play';
    
    /* Timeline element */
    var timeline = document.createElement('div');
    timeline.classList.add('timeline');
    mainDiv.appendChild(timeline);
    
    var progress = document.createElement('div');
    progress.classList.add('progress');
    timeline.appendChild(progress);
    
    var loaded = document.createElement('div');
    loaded.classList.add('loaded');
    timeline.appendChild(loaded);
    
    /* Song duration element */
    var timer = document.createElement('div');
    timer.classList.add('timer');
    mainDiv.appendChild(timer);
    
    /* Volume control element */
    var volumeControl = document.createElement('div');
    volumeControl.classList.add('volumeControl');
    this.player.appendChild(volumeControl);
    
    /* functions */
    this.setSong = function(id){
        this.options.index = id;
        audio.src = this.options.songList[id].path;
        audio.load();
    }
    
    this.play = function(){
        audio.play();
        pButton.innerHTML = 'pause';
    }
    
    this.pause = function(){
        audio.pause();
        pButton.innerHTML = 'play';
    }
    
    this.stop = function(){
        audio.pause();
        audio.currentTime = 0;
        pButton.innerHTML = 'play';
        options.playing = false;
    }
    
    this.prev = function(){
        if(options.songList.indexOf(options.songList[options.index]) != 0){
            options.index -= 1;
            this.setSong(options.index);
            this.stop();
            
            if(options.playing === true){
                this.play();
            }else{
                this.stop();
            }
        }else if(options.playing === false){
            this.stop();
        }
    }
    
    this.next = function(){
        if(options.songList.indexOf(options.songList[options.index]) != options.songList.length - 1){
            options.index += 1;
            this.setSong(options.index);
            this.pause();
            
            if(options.playing === true){
                this.play();
            }else{
                this.pause();
            }
        }else{
            this.stop();
        }
    }
    
    this.setVolume = function(vol){
        audio.volume = vol * 0.01; // round 100 to 1
    }
    
    var getCurrentTimerPourcentage = function(){
        //audio.currentTime/audio.duration
        //timeline.style.width = '40%';
    }
    
    var getCurrentTimerSec = function(){
        //audio.currentTime/audio.duration
        
        timeline.style.width = '40%';
    }
    
    var setDuration = function(duration){
        var minutes = "0" + Math.floor(duration / 60);
        var seconds = "0" + (Math.floor(duration) - minutes * 60);
        options.timeline = minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    
    this.setCurrentTimer = function(currentTime){
        var minutes = "0" + Math.floor(currentTime / 60);
        var seconds = "0" + (Math.floor(currentTime) - minutes * 60);
        this.options.current_timeline = minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    
    this.refreshTimer = function(){
        this.setCurrentTimer(audio.currentTime);
        
        timer.innerHTML = '<span class="played">'+this.options.current_timeline+'</span> / <strong class="duration">'+this.options.timeline+'</strong>';
    }
    
    /* Create the audio object */
    var audio = new Audio();
    
    this.setSong(this.options.index);
    this.setVolume(this.options.defaultVolume);
    
    audio.addEventListener('canplay', function() {
        setDuration(audio.duration);
        nanoPlayer.refreshTimer();
    });
    
    /* Using params */
    if(this.options.autoplay === true){
        this.play();
    }
    
    /* triggering elements */
    pButton.addEventListener('click', function(){
        if(options.playing === false){
            nanoPlayer.play();
            options.playing = true;
        }else{
            nanoPlayer.pause();
            options.playing = false;
        }
    });
    
    timeline.addEventListener('click', function(){
        //mettre à jour progress bar en fonction du clic
        //maj le timer
        //console.log('test1');
    });
    
    audio.addEventListener("playing", function(){
        nanoPlayer.options.playing = true;
    });
    
    audio.addEventListener("timeupdate", function(){
        nanoPlayer.refreshTimer();
    });
    
    audio.addEventListener("ended", function(){
        if(options.loop === true && options.songList.indexOf(options.songList[options.index]) == options.songList.length - 1){
            nanoPlayer.play();
        }else{
            nanoPlayer.next();
        }
    });
}
