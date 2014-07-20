/**
 * Created by Thomas on 20/07/14.
 */

define(['stopWatch'], function(){
    // Global set interval and stopwatch module - scope changes upon click event attachment
    var timerRun, stopWatch = {
        // Document object model elements
        $startStopWatch: '', $stopStopWatch: '', $resetStopWatch: '', $tenthSeconds: '', $seconds: '', $minutes: '',
        // Incremental variables
        timerRun: 0, tenthcounter: 0, seccounter: 0, mincounter: 0,

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
            // Scope (this) changed to DOM element
            var parentScope = stopWatch;
            timerRun = setInterval(function(){parentScope.run()}, 10);
            return false;
        },

        /**
         * Run counter checks
         */
        run: function(){
            this.tenthcounter++;
            this.tenthcounterCheck();
        },

        /**
         * Check tenths of second
         */
        tenthcounterCheck: function(){
            if(this.tenthcounter < 10){
                this.tenthcounter = "0" + this.tenthcounter;
                this.$tenthSeconds.innerHTML = this.tenthcounter;
                return;
            }
            if(this.tenthcounter === 100){
                this.tenthcounter = 0;
                this.$tenthSeconds.innerHTML = this.tenthcounter;
                // Increment second and check
                this.seccounter++;
                this.secondsCounterCheck();
                return;
            }
            this.$tenthSeconds.innerHTML = this.tenthcounter;
        },

        /**
         * Check seconds
         */
        secondsCounterCheck: function(){
            if(this.seccounter < 10){
                this.seccounter = "0" + this.seccounter;
                this.$seconds.innerHTML = this.seccounter;
                return;
            }
            if(this.seccounter === 60){
                this.seccounter = 0;
                this.$seconds.innerHTML = this.seccounter;
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
                this.mincounter = "0" + this.mincounter;
                this.$minutes.innerHTML = this.mincounter;
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
            stopWatch.tenthcounter = stopWatch.seccounter = stopWatch.mincounter = 0;
            stopWatch.$tenthSeconds.innerHTML = stopWatch.$seconds.innerHTML = stopWatch.$minutes.innerHTML = "00";
            return false;
        }
    };

    // Return object
    return stopWatch;
});