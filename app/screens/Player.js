import React, {useContext} from 'react';
import {View, StyleSheet,Text, Dimensions, ImageBackground} from 'react-native';
import Screen from '../components/Screen';
import color from '../misc/color';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import {AudioContext} from '../context/AudioProvider';
import { pause, play, playNext, resume } from '../misc/audioController';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width} = Dimensions.get('window');

const Player = () => {
    const context = useContext(AudioContext);

    const {playbackPosition, playbackDuration} = context;

    const calculateSeekBar = () => {
        if(playbackPosition && playbackDuration){
            return playbackPosition/playbackDuration;
        }
        return 0;
    }

    handlePlayPause = async () => {
        //play
        if(!context.soundObj){
            const audio = context.currentAudio;
            const status = await play(context.playbackObj,audio.uri);
            context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
            return context.updateState(context,{
                soundObj:status,
                currentAudio:audio,
                isPlaying:true,
                currentAudioIndex:context.currentAudioIndex,
            });
        }

        //pause
        if(context.soundObj && context.soundObj.isPlaying){
            const status = await pause(context.playbackObj);
            return context.updateState(context,{
                soundObj:status,
                isPlaying:false,
            });
        }

        //resume
        if(context.soundObj && !context.soundObj.isPlaying){
            const status = await resume(context.playbackObj);
            return context.updateState(context,{
                soundObj:status,
                isPlaying:true,
            });
        }
    }

    handleNext = async () => { 
        const {isLoaded} = await context.playbackObj.getStatusAsync();
        const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
        let audio = context.audioFiles[context.currentAudioIndex + 1];
        let index, status;

        if(!isLoaded && !isLastAudio){
            index = context.currentAudioIndex + 1;
            status = await play(context.playbackObj, audio.uri);
        }

        if(isLoaded && !isLastAudio){
            index = context.currentAudioIndex + 1;
            status = await playNext(context.playbackObj, audio.uri);
        }

        if(isLastAudio){
            index = 0;
            audio = context.audioFiles[0];

            if(isLoaded){
                status = await playNext(context.playbackObj, audio.uri);
            }else{
                status = await play(context.playbackObj, audio.uri);
            }
            
        }

        context.updateState(context,{
            currentAudio:audio,
            playbackObj:context.playbackObj,
            soundObj:status,
            isPlaying:true,
            currentAudioIndex:index,
            playbackPosition:null,
            playbackDuration:null,
        });
    }

    handlePrevious = async () => { 
        const {isLoaded} = await context.playbackObj.getStatusAsync();
        const isFirstAudio = context.currentAudioIndex === 0;
        let audio = context.audioFiles[context.currentAudioIndex - 1];
        let index, status;

        if(!isLoaded && !isFirstAudio){
            index = context.currentAudioIndex - 1;
            status = await play(context.playbackObj, audio.uri);
        }

        if(isLoaded && !isFirstAudio){
            index = context.currentAudioIndex - 1;
            status = await playNext(context.playbackObj, audio.uri);
        }

        if(isFirstAudio){
            index = context.totalAudioCount-1;
            audio = context.audioFiles[index];

            if(isLoaded){
                status = await playNext(context.playbackObj, audio.uri);
            }else{
                status = await play(context.playbackObj, audio.uri);
            }
        }

        context.updateState(context,{
            currentAudio:audio,
            playbackObj:context.playbackObj,
            soundObj:status,
            isPlaying:true,
            currentAudioIndex:index,
            playbackPosition:null,
            playbackDuration:null,
        });
    }

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text>
                <View style={styles.midBannerContainer}>
                    {context.currentAudio.artwork?<ImageBackground source={context.currentAudio.artwork} style={styles.backageImg} /> : 
                    <MaterialCommunityIcons name="music-circle" size={300} color={color.FONT_MEDIUM} />}
                </View>

                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.title}</Text>
                    <Slider
                    style={{width: width, height: 40}}
                    minimumValue={0}
                    maximumValue={1} 
                    value={calculateSeekBar()}
                    minimumTrackTintColor={color.FONT_MEDIUM}
                    maximumTrackTintColor={color.ACTIVE_BG} 
                    />
                    <View style={styles.audioControllers}>
                        <PlayerButton 
                        onPress={handlePrevious}
                        iconType='PREV' />

                        <PlayerButton 
                        onPress={handlePlayPause}
                        style={{marginHorizontal:25}}
                        iconType={context.isPlaying?'PLAY':'PAUSE'} />

                        <PlayerButton 
                        onPress={handleNext} 
                        iconType='NEXT' />
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    audioCount:{
        textAlign:'right',
        padding:15,
        color: color.FONT_LIGHT,
        fontSize:14,
    },
    midBannerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    audioPlayerContainer:{},
    audioTitle:{
        fontSize:16,
        color:color.FONT,
        padding:15,
    },
    audioControllers:{
        width,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:20,
    },
    backageImg:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        position:'absolute',
    }
})

export default Player;