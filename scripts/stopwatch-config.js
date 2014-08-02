/**
 * Created by Thomas on 20/07/14.
 */

var paths = {stopWatch: 'stopwatch-module'}, modules = []; // RequireJS configuration

// Reset all previously defined paths and their dependencies to point into a single "all" script
if(requirejs.s.contexts._.config.paths.all){
    setScriptBuildPaths();
}

// Initialize
requirejs.config({paths: paths});

// Build final modules list
modules = Object.keys(requirejs.s.contexts._.config.paths);

define(function(){
    // Load modules
    require(modules, function(){
        // Retrieve stop watch object
        var stopWatch = require('stopWatch');

        // Set global variables based on document object model
        stopWatch.clickEvents({
            // Stopwatch buttons
            $startStopWatch     : document.getElementById('start').getElementsByTagName('a')[0],
            $stopStopWatch      : document.getElementById('stop').getElementsByTagName('a')[0],
            $resetStopWatch     : document.getElementById('reset').getElementsByTagName('a')[0],

            // Number locations displaying the stopwatch result
            $hundredthSeconds   : document.getElementById('hundredth-seconds'),
            $seconds            : document.getElementById('seconds'),
            $minutes            : document.getElementById('minutes'),

            // Default count variables
            hundredthcounter    : 0,
            seccounter          : 0,
            mincounter          : 0
        });
    });
});