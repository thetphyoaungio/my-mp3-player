import React, { Component } from 'react';
import {View, StyleSheet,Text, ScrollView} from 'react-native';
//import { AudioContext } from '../context/AudioProvider'

const mediaAssets = [
    // {
    //   "id": "1111",
    //   "uri": require('../../tracks/00.mp3'),
    //   "title": "Longing",
    //   "artist": "David Chavez",
    //   "artwork": "",
    //   "duration": 143
    // },
    // {
    //   "id": "2222",
    //   "uri": require('../../tracks/01.mp3'),
    //   "title": "Soul Searching (Demo)",
    //   "artist": "David Chavez",
    //   "artwork": "",
    //   "duration": 77
    // },
    {
        "id": "1111",
        "url": "https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj",
        "title": "Longing",
        "artist": "David Chavez",
        "artwork": "https://i.picsum.photos/id/100/200/200.jpg",
        "duration": 143
      },
      {
        "id": "2222",
        "url": "https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E",
        "title": "Soul Searching (Demo)",
        "artist": "David Chavez",
        "artwork": "https://i.picsum.photos/id/200/200/200.jpg",
        "duration": 77
      },
      {
        "id": "3333",
        "url": "https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI",
        "title": "Lullaby (Demo)",
        "artist": "David Chavez",
        "artwork": "https://i.picsum.photos/id/300/200/200.jpg",
        "duration": 71
      },
      {
        "id": "4444",
        "url": "https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC",
        "title": "Rhythm City (Demo)",
        "artist": "David Chavez",
        "artwork": "https://i.picsum.photos/id/400/200/200.jpg",
        "duration": 106
      },

];

class AudioList extends Component {
    //static contextType = AudioContext;

    render() {
        return (
            // <View style={styles.container}>
            //     <Text>Audio List...</Text>
            // </View>

            <ScrollView>
                {/* {this.context.audioFiles.map(item => <Text key={item.id}>{item.filename}</Text> )} */}
                {mediaAssets.map(item => <Text style={styles.list_text} key={item.id}>{item.title}</Text> )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_text:{
        padding:10,
        borderBottomColor:'grey',
        borderBottomWidth:1
    },
    srollview:{

    }
})

export default AudioList;