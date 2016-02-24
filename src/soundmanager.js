// #soundmanager //
var Soundmanager = function(gameObj) {

    var sounds = {};
    var numberOfWordSounds = 10;
    var that = this;
    var game = gameObj;
    that.soundsEnabled = true;
    this.soundsFile = "";
    ///////////////// PRIVATE METHODS ///////////////////
    function onSoundURLReceived(response) {
        this.soundsFile = response.url;
    }

    function errorOnRequest(e) {
        window.console.log("ERROR: " + e.message, e);
    }

    function loadWordSounds() {
        var lib = game.load.cache._cache.sound;
        for (var key in lib) {
            sounds[String(key)] = game.add.audio(String(key));
            that[String(key)] = that.getSoundValue(key);
        }
    }
    /////////////////////////////////////////////////////
    this.getSoundValue = function(value) {
        return function() {
            if(that.soundsEnabled === true){
                sounds[String(value)].stop();
                sounds[String(value)].play();
            }
            else {
                return false;
            }
            return value;
        };
    };

    this.getSoundURL = function() {
        var deferred = $.Deferred();
        var con = $.when(deferred.promise());
        // assumes jQuery or equivalent
        $.ajax({
            url: "rpc_proxy.php",
            data: 'method=getSoundURL',
            type: "POST",
            crossDomain: true,
            error: errorOnRequest,
            success: function(response) {
                var r = String(response);
                deferred.resolve(response);
            }
        });
        con.done(onSoundURLReceived);
    };

    this.setupSounds = function() {
        loadWordSounds();
    };

    this.playSound = function(word, loop, volume) {
        if(this.soundsEnabled === false) {
            return false;
        }

        loop = loop || false;
        volume = volume || 1;

        if (sounds[word]) {
            sounds[word].loop = loop;
            sounds[word].volume = volume;
            sounds[word].stop();
            sounds[word].play();
        }
    };

    this.stopSound = function(key) {
        if(sounds[key]) {
            sounds[key].stop();
        }
    };

    this.getSound = function(key) {
        return sounds[key];
    };

    this.stopAllSounds = function() {
        for (var key in sounds) {
            this.stopSound(key);
        }
    };

    this.enableSounds = function() {
        this.soundsEnabled = true;
    };

    this.disableSounds = function() {
        this.soundsEnabled = false;
    }

    return this;
};
