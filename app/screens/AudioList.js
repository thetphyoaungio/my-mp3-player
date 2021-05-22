import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {DataProvider, RecyclerListView, LayoutProvider} from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal  from '../components/OptionModal';
import {Audio} from 'expo-av';
import tracks from '../../tracks/tracks.js';
import {play, pause, resume} from '../misc/audioController';

const mediaAssets = tracks;

const dataProvider = new DataProvider((r1,r2)=>r1!==r2);

class AudioList extends Component {
  list = dataProvider.cloneWithRows(mediaAssets,mediaAssets);

  layoutProvider = new LayoutProvider((i)=>'audio', (type,dim)=>{
    switch(type){
        case 'audio':{
            dim.width = Dimensions.get('window').width;
            dim.height = 70;
            break;
        }
        default:{
            dim.width = 0;
            dim.height = 0;
        }
    }
  });

  handleAudioPress = async (audio) => {
    
    //play first time
    if(!this.state.soundObj){
      const playbackObj = new Audio.Sound();
      //playbackObj
      
      const status = await play(playbackObj,audio.uri);
      
      return this.setState({...this.state, playbackObj:playbackObj, soundObj:status, currentAudio:audio});
    }

    //pause the audio
    if(this.state.soundObj.isLoaded && this.state.soundObj.isPlaying){
      const status = await pause(this.state.playbackObj);
      return this.setState({...this.state, soundObj:status});
    }

    //resume the audio
    if(this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio.id===audio.id){
      const status = await resume(this.state.playbackObj);
      return this.setState({...this.state, soundObj:status});
    }

  }
  
  rowRenderer = (type,item) => {
    return (
      <AudioListItem 
      title={item.title} 
      duration={item.duration } 
      onOptionPress={()=>{
        this.currentItem = item;
        this.setState({...this.state, optionModalVisible:true})
      }}
      onAudioPress={()=>this.handleAudioPress(item)} />
    )
  };
  
  constructor(props){
    super(props);

    this.state = {
      optionModalVisible:false,
      playbackObj:null,
      soundObj:null,
      currentAudio:{}
    }

    this.currentItem = {}
  }

  render() {
    return (
        <Screen>
        <RecyclerListView 
        dataProvider={this.list} 
        layoutProvider={this.layoutProvider}
        rowRenderer={this.rowRenderer} />

        <OptionModal 
        onPlayPress={()=>{console.log('Play Pressed!')}} 
        onPlayListPress={()=>{console.log('PlayList Pressed!')}}
        currentItem={this.currentItem}
        onClose={() => {
          this.setState({...this.state, optionModalVisible:false})
        }} 
        visible={this.state.optionModalVisible} />
        </Screen>
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