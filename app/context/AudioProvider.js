import React, { Component, createContext } from 'react';
import {DataProvider} from 'recyclerlistview';
import tracks from '../../tracks/tracks.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Audio}from 'expo-av';
import {storeAudioForNextOpening} from '../misc/helper';
import {play, pause, resume, playNext} from '../misc/audioController';

export const AudioContext = createContext();

class AudioProvider extends Component {
    constructor(props){
        super(props);

        this.state = {
            audioFiles:[],
            playList:[],
            addToPlayList:null,
            dataProvider:new DataProvider((r1,r2)=>r1!==r2),
            playbackObj:null,
            soundObj:null,
            currentAudio:{},
            isPlaying:false,
            currentAudioIndex:0,
            playbackPosition:null,
            playbackDuration:null
        }

        this.totalAudioCount = 0;
    }

    onPlaybackStatusUpdate = async (playbackStatus) => {
        if(playbackStatus.isLoaded && playbackStatus.isPlaying){
          this.updateState(this,{
            playbackPosition:playbackStatus.positionMillis,
            playbackDuration:playbackStatus.durationMillis,
          })
        }
    
        if(playbackStatus.didJustFinish){
          const nextAudioIndex = this.state.currentAudioIndex + 1;
    
          //if there is no next audio or current audio is the last
          if(nextAudioIndex >= this.totalAudioCount){
            
            await this.state.playbackObj.unloadAsync();
            return this.updateState(this, {
              soundObj:null, 
              currentAudio:this.state.audioFiles[0], 
              isPlaying:false, 
              currentAudioIndex:0, 
              playbackPosition:null,
              playbackDuration:null
            });
    
            //return await storeAudioForNextOpening(this.state.audioFiles[0], 0);
          }
    
          //otherwise we want to select another audio
          const audio = this.state.audioFiles[nextAudioIndex];
          const status = await playNext(this.state.playbackObj, audio.uri);
    
          this.updateState(this, {
            soundObj:status, 
            currentAudio:audio, 
            isPlaying:true, 
            currentAudioIndex:nextAudioIndex
          });
    
          //await storeAudioForNextOpening(audio, nextAudioIndex);
        }
    }

    componentDidMount(){
        const {dataProvider,audioFiles} = this.state;

        this.setState({...this.state, dataProvider:dataProvider.cloneWithRows([...audioFiles, ...tracks]), audioFiles:[...audioFiles, ...tracks]});

        this.totalAudioCount = tracks.length;

        this.setState({...this.state, dataProvider:dataProvider.cloneWithRows([...audioFiles, ...tracks]), audioFiles:[...audioFiles, ...tracks]});
    }

    updateState = (prevState, newState={}) => {
        this.setState({...prevState, ...newState})
    }

    loadPreviousAudio = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio');
        let currentAudio, currentAudioIndex;

        if(!previousAudio){
            currentAudio = this.state.audioFiles[0];
            currentAudioIndex = 0;
        }else{
            previousAudio=JSON.parse(previousAudio);
            currentAudio = previousAudio.audio;
            currentAudioIndex = previousAudio.index;
        }

        this.setState({...this.state, currentAudio, currentAudioIndex})
    }

    render() {
        const {
            audioFiles,
            playList,
            addToPlayList,
            dataProvider, 
            playbackObj, 
            soundObj, 
            currentAudio, 
            isPlaying, 
            currentAudioIndex, 
            playbackPosition, 
            playbackDuration
        } = this.state;

        return (
            <AudioContext.Provider value={{
                audioFiles, 
                playList,
                addToPlayList,
                dataProvider, 
                playbackObj, 
                soundObj, 
                currentAudio,
                isPlaying,
                currentAudioIndex,
                totalAudioCount:this.totalAudioCount,
                playbackPosition,
                playbackDuration,
                updateState:this.updateState,
                loadPreviousAudio:this.loadPreviousAudio,
                onPlaybackStatusUpdate:this.onPlaybackStatusUpdate,
            }}>
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export default AudioProvider;