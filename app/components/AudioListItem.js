import React from 'react';
import {View, Text, StyleSheet,Dimensions, TouchableWithoutFeedback} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';

const getThumbnailText = (title) => title[0];

const timeFormatSToMS=(time)=> {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

const renderPlayPauseIcon = isPlaying => {
    if(isPlaying){
        return <Entypo name="controller-paus" size={24} color={color.ACTIVE_FONT} />
    }else{
        return <Entypo name="controller-play" size={24} color={color.ACTIVE_FONT} />
    }
}

const AudioListItem = ({title,duration, onOptionPress, onAudioPress, isPlaying, activeListItem})=> {
    return (
        <View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onAudioPress}>
                    <View style={styles.leftContainer}>
                        <View style={[styles.thumbnail, {backgroundColor:activeListItem?color.ACTIVE_BG:color.FONT_LIGHT}]}>
                            <Text style={styles.thumbnailText}>
                                {activeListItem?renderPlayPauseIcon(isPlaying):getThumbnailText(title)}
                            </Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>{title}</Text>
                            <Text style={styles.timeText}>{timeFormatSToMS(duration)}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.rightContainer}>
                    <Entypo 
                    name="dots-three-vertical" 
                    size={20} 
                    color={color.FONT_MEDIUM} 
                    onPress={onOptionPress} />
                </View>
            </View>
            <View style={styles.separator}></View>
        </View>
    );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignSelf:'center',
        width:width-80,
        
    },
    leftContainer:{
        flexDirection:'row',
        alignItems:'center',
        flex:1
    },
    rightContainer:{
        flexBasis:50,
        justifyContent:'center',
        alignItems:'center'
    },
    thumbnail:{
        height:50,
        flexBasis:50,
        backgroundColor:color.FONT_LIGHT,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
    },
    thumbnailText:{
        fontSize:22,
        fontWeight:'bold',
        color:color.FONT
    },
    titleContainer:{
        width:width-180,
        paddingLeft:10
    },
    title:{
        fontSize:16,
        color:color.FONT
    },
    separator:{
        width:width-80,
        backgroundColor:'#333',
        opacity:0.3,
        height:0.5,
        alignSelf:'center',
        marginTop:10
    },
    timeText:{
        fontSize:14,
        color:color.FONT_LIGHT
    }
})

export default AudioListItem;