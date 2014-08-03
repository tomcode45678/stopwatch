/**
 * Created by Thomas on 20/07/14.
 */

define(['stopWatch'], function(){
    // Global set interval and stopwatch module - scope changes upon click event attachment
    var config, stopWatch = {
        /**
         * Set click handlers
         * @param configuration
         */
        clickEvents: function(configuration){
            config = configuration;
            config.$startStopWatch.onclick = this.start;
            config.$stopStopWatch.onclick = this.stop;
            config.$resetStopWatch.onclick = this.reset;
        },

        /**
         * Clear existing timer and restart it
         * @returns {boolean}
         */
        start: function(){
            clearInterval(config.timer);
            if(config.addLap === true){
                stopWatch.recordLap();
            }
            config.timer = setInterval(function(){stopWatch.run()}, 10);
            config.$startStopWatch.innerHTML = "Lap";
            config.addLap = true;
            return false;
        },

        /**
         * Record lap time
         */
        recordLap: function(){
            config.$laps.setAttribute('class','active');
            config.$laps.innerHTML +=
                "<li>"+
                    config.$minutes.innerHTML+":"+
                    config.$seconds.innerHTML+":"+
                    config.$hundredthSeconds.innerHTML
                +"</li>";
        },

        /**
         * Run counter checks
         */
        run: function(){
            config.hundredthcounter++;
            this.hundredthcounterCheck();
        },

        /**
         * Check hundredths of second
         * @returns {*}
         */
        hundredthcounterCheck: function(){
            if(config.hundredthcounter < 10){
                return config.$hundredthSeconds.innerHTML = "0" + config.hundredthcounter;
            }
            if(config.hundredthcounter === 100){
                config.$hundredthSeconds.innerHTML = "00";
                config.hundredthcounter = 0;
                // Increment second and check
                config.seccounter++;
                return this.secondsCounterCheck();
            }
            return config.$hundredthSeconds.innerHTML = config.hundredthcounter;
        },

        /**
         * Check seconds
         * @returns {*}
         */
        secondsCounterCheck: function(){
            if(config.seccounter < 10){
                return config.$seconds.innerHTML = "0" + config.seccounter;
            }
            if(config.seccounter === 60){
                config.$seconds.innerHTML = "00";
                config.seccounter = 0;
                // Increment minute and check
                config.mincounter++;
                return this.minutesCounterCheck();
            }
            return config.$seconds.innerHTML = config.seccounter;
        },

        /**
         * Check minutes
         * @returns {*}
         */
        minutesCounterCheck: function(){
            if(config.mincounter < 10){
                return config.$minutes.innerHTML = "0" + config.mincounter;
            }
            if(config.mincounter == 60){
                return clearInterval(config.timer);
            }
            return config.$minutes.innerHTML = config.mincounter;
        },

        /**
         * Stop timer
         * @returns {boolean}
         */
        stop: function(){
            clearInterval(config.timer);
            config.$startStopWatch.innerHTML = "Start";
            config.addLap = false;
            return false;
        },

        /**
         * Reset stopwatch and dependent variables
         * @returns {boolean}
         */
        reset: function(){
            clearInterval(config.timer);
            config.$startStopWatch.innerHTML = "Start";
            config.$laps.innerHTML = "";
            config.$laps.removeAttribute('class');
            config.addLap = false;
            config.hundredthcounter = config.seccounter = config.mincounter = 0;
            config.$hundredthSeconds.innerHTML = config.$seconds.innerHTML = config.$minutes.innerHTML = "00";
            return false;
        }
    };
    // Return object
    return stopWatch;
});