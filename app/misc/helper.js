import AsyncStorage from '@react-native-async-storage/async-storage';

export default coverImags = [
    require('../../assets/my-imgs/audiolist_cover/Buddha_1.jpg'),
    require('../../assets/my-imgs/audiolist_cover/Buddha_2.jpg'),
    require('../../assets/my-imgs/audiolist_cover/Buddha_3.jpg'),
    require('../../assets/my-imgs/audiolist_cover/Buddha_4.jpg'),
];

export var playerImages = [
    [
        require('../../assets/my-imgs/Buddha_1.jpg'),
        require('../../assets/my-imgs/Buddha_2.jpg'),
        require('../../assets/my-imgs/Buddha_3.jpg'),
        require('../../assets/my-imgs/Buddha_4.png'),
        require('../../assets/my-imgs/Buddha_5.jpg'),
        require('../../assets/my-imgs/Buddha_6.jpg'),
        require('../../assets/my-imgs/Buddha_7.jpg'),
        require('../../assets/my-imgs/Buddha_8.jpg'),
    ],
    [
        require('../../assets/my-imgs/Buddha_9.jpg'),
        require('../../assets/my-imgs/Buddha_10.jpg'),
        require('../../assets/my-imgs/Buddha_11.jpg'),
        require('../../assets/my-imgs/Buddha_12.jpg'),
        require('../../assets/my-imgs/Buddha_13.jpg'),
        require('../../assets/my-imgs/Buddha_14.jpg'),
        require('../../assets/my-imgs/Buddha_15.jpg'),
        require('../../assets/my-imgs/Buddha_16.jpg'),
    ],
    [
        require('../../assets/my-imgs/Buddha_17.jpg'),
        require('../../assets/my-imgs/Buddha_18.jpg'),
        require('../../assets/my-imgs/Buddha_19.jpg'),
        require('../../assets/my-imgs/Buddha_20.jpg'),
        require('../../assets/my-imgs/Buddha_21.jpg'),
        require('../../assets/my-imgs/Buddha_22.jpg'),
        require('../../assets/my-imgs/Buddha_23.jpg'),
        require('../../assets/my-imgs/Buddha_24.jpg'),
    ]
]

export const storeAudioForNextOpening = async (audio, index) => {
    await AsyncStorage.setItem('previousAudio', JSON.stringify({audio, index}));
}

export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}