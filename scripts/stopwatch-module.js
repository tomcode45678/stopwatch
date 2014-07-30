/**
 * Created by Thomas on 20/07/14.
 */

define(['stopWatch'], function(){
    // Global set interval and stopwatch module - scope changes upon click event attachment
    var timerRun, stopWatch = {
        // Document object model elements
        $startStopWatch: '', $stopStopWatch: '', $resetStopWatch: '', $hundredthSeconds: '', $seconds: '', $minutes: '',
        // Incremental variables
        timerRun: 0, hundredthcounter: 0, seccounter: 0, mincounter: 0,

        /**
         * Set click handlers
         */
        clickEvents: function(){
            this.$startStopWatch.onclick = this.start;
            this.$stopStopWatch.onclick = this.stop;
            this.$resetStopWatch.onclick = this.reset;
        },

        /**
         * Clear existing timer and restart it
         */
        start: function(){
            clearInterval(timerRun);
            timerRun = setInterval(function(){stopWatch.run()}, 10);
            return false;
        },

        /**
         * Run counter checks
         */
        run: function(){
            this.hundredthcounter++;
            this.hundredthcounterCheck();
        },

        /**
         * Check hundredths of second
         */
        hundredthcounterCheck: function(){
            if(this.hundredthcounter < 10){
                this.$hundredthSeconds.innerHTML = "0" + this.hundredthcounter;
                return;
            }
            if(this.hundredthcounter === 100){
                this.$hundredthSeconds.innerHTML = this.hundredthcounter = 0;
                // Increment second and check
                this.seccounter++;
                this.secondsCounterCheck();
                return;
            }
            this.$hundredthSeconds.innerHTML = this.hundredthcounter;
        },

        /**
         * Check seconds
         */
        secondsCounterCheck: function(){
            if(this.seccounter < 10){
                this.$seconds.innerHTML = "0" + this.seccounter;
                return;
            }
            if(this.seccounter === 60){
                this.$seconds.innerHTML = this.seccounter = 0;
                // Increment minute and check
                this.mincounter++;
                this.minutesCounterCheck();
                return;
            }
            this.$seconds.innerHTML = this.seccounter;
        },

        /**
         * Check minutes
         */
        minutesCounterCheck: function(){
            if(this.mincounter < 10){
                this.$minutes.innerHTML = "0" + this.mincounter;
                return;
            }
            if(this.mincounter == 60){
                clearInterval(timerRun);
                return;
            }
            this.$minutes.innerHTML = this.mincounter;
        },

        /**
         * Stop timer
         */
        stop: function(){
            clearInterval(timerRun);
            return false;
        },

        /**
         * Reset stopwatch and dependent variables
         */
        reset: function(){
            // Scope (this) changed to DOM element use object name
            clearInterval(timerRun);
            stopWatch.hundredthcounter = stopWatch.seccounter = stopWatch.mincounter = 0;
            stopWatch.$hundredthSeconds.innerHTML = stopWatch.$seconds.innerHTML = stopWatch.$minutes.innerHTML = "00";
            return false;
        }
    };

    // Return object
    return stopWatch;
});