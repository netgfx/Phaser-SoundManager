# Phaser-SoundManager
A small sound-manager for easily use and parse sounds from assetPacks

View the *files.json* file for an example of the assetPack, then instansiate the sound-manager like this:
```
var soundManager = new SoundManager(gameObject);
soundManager.setupSounds(); // initialize
```

And call functions like:
```
soundManager.playSound("somesound");
or
soundManager.somesound();

// Stop Sound
soundManager.stopSound("mainSong");

// play sound with loop, and volume parameters
soundManager.playSound("mainMenu", true, 0.5);
```

## API

* playSound(key)
* soundkeyname()
* stopSound(key)
* playSound(key, loop, volume)
* stopAllSounds()
* getSound(key) // returns the sound object
