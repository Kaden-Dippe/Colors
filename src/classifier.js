const constraints = require('./constraints.js');

var color_key = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'white'];
var colors = {};

/* Returns whether or not X is in the range [min, max]. */
function inRange(x, min, max) {
    return x >= min && x <= max;
}

/* Returns whether or not SONG fits COLOR's constraints. */
function withinConstraint(song, color) {
    for (let feature in color) {
        var min = color[feature][0];
        var max = color[feature][1];
        if (!inRange(song[feature], min, max)) {
            return false;
        }
    }
    return true;
}

/*
 * Classifies a song with a color C depending on
 * the song's features.
 */
function classify(song) {
    if (withinConstraint(song, constraints.redConditions)) {
        colors['red'].push(song);
    } else if (withinConstraint(song, constraints.orangeConditions)) {
        colors['orange'].push(song);
    } else if (withinConstraint(song, constraints.yellowConditions)) {
        colors['yellow'].push(song);
    } else if (withinConstraint(song, constraints.greenConditions)) {
        colors['green'].push(song);
    } else if (withinConstraint(song, constraints.blueConditions)) {
        colors['blue'].push(song);
    } else if (withinConstraint(song, constraints.pinkConditions)) {
        colors['pink'].push(song);
    } else {
        colors['white'].push(song);
    }
    return colors;
}

function init(features) {
    for (let color in color_key) {
        colors[color] = {};
    }
}
