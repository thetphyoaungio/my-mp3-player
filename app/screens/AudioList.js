import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import { AudioContext } from '../context/AudioProvider';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal  from '../components/OptionModal';
import {Audio} from 'expo-av';
import {play, pause, resume, playNext} from '../misc/audioController';
import { storeAudioForNextOpening } from '../misc/helper'

class AudioList extends Component { 
  static contextType = AudioContext;

  constructor(props){
    super(props);

    this.state = {
      optionModalVisible:false,
    }

    this.currentItem = {}
  }

  componentDidMount(){
    this.context.loadPreviousAudio();
  }

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

  rowRenderer = (type,item, index, extendedState) => {
    return (
      <AudioListItem 
      title={item.title} 
      duration={item.duration } 
      onOptionPress={()=>{
        this.currentItem = item;
        this.setState({...this.state, optionModalVisible:true})
      }}
      onAudioPress={()=>this.handleAudioPress(item)} 
      isPlaying={extendedState.isPlaying}
      activeListItem={this.context.currentAudioIndex===index} />
    )
  };

  /* onPlaybackStatusUpdate = async (playbackStatus) => {
    if(playbackStatus.isLoaded && playbackStatus.isPlaying){
      this.context.updateState(this.context,{
        playbackPosition:playbackStatus.positionMillis,
        playbackDuration:playbackStatus.durationMillis,
      })
    }

    if(playbackStatus.didJustFinish){
      const nextAudioIndex = this.context.currentAudioIndex + 1;

      //if there is no next audio or current audio is the last
      if(nextAudioIndex >= this.context.totalAudioCount){
        
        await this.context.playbackObj.unloadAsync();
        this.context.updateState(this.context, {
          soundObj:null, 
          currentAudio:this.context.audioFiles[0], 
          isPlaying:false, 
          currentAudioIndex:0, 
          playbackPosition:null,
          playbackDuration:null
        });

        return await storeAudioForNextOpening(this.context.audioFiles[0], 0);
      }

      //otherwise we want to select another audio
      const audio = this.context.audioFiles[nextAudioIndex];
      const status = await playNext(this.context.playbackObj, audio.uri);

      this.context.updateState(this.context, {
        soundObj:status, 
        currentAudio:audio, 
        isPlaying:true, 
        currentAudioIndex:nextAudioIndex
      });

      await storeAudioForNextOpening(audio, nextAudioIndex);
    }
  } */

  handleAudioPress = async (audio) => {
    const {
      playbackObj, 
      soundObj, 
      currentAudio, 
      updateState, 
      audioFiles
    } = this.context;
    
    //play first time
    if(!soundObj){
      const playbackObj = new Audio.Sound();
      
      const status = await play(playbackObj,audio.uri);
      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        playbackObj:playbackObj, 
        soundObj:status, 
        currentAudio:audio, 
        isPlaying:true, 
        currentAudioIndex:index
      });

      playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate);

      return storeAudioForNextOpening(audio, index);
    }

    //pause the audio
    if( soundObj.isLoaded &&  soundObj.isPlaying && currentAudio.id===audio.id){
      const status = await pause(playbackObj);
      
      return updateState(this.context, {
        soundObj:status, 
        isPlaying:false
      });
    }

    //resume the audio
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id===audio.id){
      const status = await resume(playbackObj);
      
      return updateState(this.context, {
        soundObj:status, 
        isPlaying:true
      });
    }

    //play next
    if(soundObj.isLoaded && currentAudio.id!==audio.id){
      const status = await playNext(playbackObj,audio.uri);
      
      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        soundObj:status, 
        currentAudio:audio, 
        isPlaying:true, 
        currentAudioIndex:index
      });

      return storeAudioForNextOpening(audio, index);
    }

  }

  render() {
    return (
      <AudioContext.Consumer>
        {({dataProvider, isPlaying})=>{
          return(
            <Screen>
              <RecyclerListView 
              dataProvider={dataProvider} 
              layoutProvider={this.layoutProvider}
              rowRenderer={this.rowRenderer}
              extendedState={{isPlaying}} />

              <OptionModal 
              onPlayPress={()=>{console.log('Play Pressed!')}} 
              onPlayListPress={()=>{console.log('PlayList Pressed!')}}
              currentItem={this.currentItem}
              onClose={() => {
                this.setState({...this.state, optionModalVisible:false})
              }} 
              visible={this.state.optionModalVisible} />
            </Screen>
          ) 
        }}
      </AudioContext.Consumer>
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