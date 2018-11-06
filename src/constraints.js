var redConditions = {
    'danceability': [0.8, 1.0],
    'energy': [0.9, 1.0],
    'tempo': [100, 200],
    'valence': [0.0, 0.4]
};

var orangeConditions = {
    'danceability': [0.6, 1.0],
    'energy': [0.8, 1.0],
    'tempo': [100, 150],
    'valence': [0.6, 0.8]
};

var yellowConditions = {
    'danceability': [0.7, 1.0],
    'energy': [0.8, 1.0],
    'tempo': [100, 200],
    'valence': [0.8, 1.0]
};

var greenConditions = {
    'danceability': [0.0, 0.4],
    'energy': [0.3, 0.5],
    'instrumentalness': [0.5, 1.0],
    'tempo': [0, 80],
    'valence': [0.4, 0.6]
};

var blueConditions = {
    'danceability': [0.0, 0.4],
    'energy': [0.3, 0.5],
    'instrumentalness': [0.3, 1.0],
    'tempo': [0, 85],
    'valence': [0.0, 0.4]
};

var pinkConditions = {
    'danceability': [0.5, 1.0],
    'energy': [0.6, 0.8],
    'instrumentalness': [0.0, 0.7],
    'tempo': [80, 170],
    'valence': [0.7, 1.0]
};

module.exports = {
    redConditions: redConditions,
    orangeConditions: orangeConditions,
    yellowConditions: yellowConditions,
    greenConditions: greenConditions,
    blueConditions: blueConditions,
    pinkConditions: pinkConditions
};
