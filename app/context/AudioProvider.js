// import React, { Component, createContext } from 'react';
// import {Alert} from 'react-native';
// import * as MediaLibrary from 'expo-media-library';

// export const AudioContext = createContext();

// const mediaAssets = [
//     {
//       "id": "1111",
//       "uri": require('../../tracks/00.mp3'),
//       "title": "Longing",
//       "artist": "David Chavez",
//       "artwork": "",
//       "duration": 143
//     },
//     {
//       "id": "2222",
//       "uri": require('../../tracks/01.mp3'),
//       "title": "Soul Searching (Demo)",
//       "artist": "David Chavez",
//       "artwork": "",
//       "duration": 77
//     },
//   ];

// class AudioProvider extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             audioFiles:this.mediaAssets
//         }
//     }

//     // permissionAlert = () => {
//     //     Alert.alert('Permission Required', 'This app needs to read audio files!', [
//     //         {text:'I\'m ready', onPress:()=>{this.getPermission()}},
//     //         {text:'Cancel', onPress:()=>{this.permissionAlert()}},
//     //     ])
//     // }

//     // getAudioFiles = async () => {
//     //     // const media = await MediaLibrary.getAssetsAsync({
//     //     //     mediaType:'audio'
//     //     // });
//     //     // console.log(media);

//     //     // const media = await MediaLibrary.getAssetsAsync({
//     //     //     mediaType:'audio',
//     //     //     first:media.totalCount
//     //     // });

//     //     const media = {
//     //         assets: Array [
//     //         //   Object {
//     //         //     "albumId": "-983182191",
//     //         //     "creationTime": 0,
//     //         //     "duration": 119.96,
//     //         //     "filename": "900-2105061514.amr",
//     //         //     "height": 0,
//     //         //     "id": "101899",
//     //         //     "mediaType": "audio",
//     //         //     "modificationTime": 1620290803000,
//     //         //     "uri": "file:///storage/emulated/0/Recordings/Call Recordings/900-2105061514.amr",
//     //         //     "width": 0,
//     //         //   },
//     //         mediaAssets
//     //         ],
//     //         endCursor: 1,
//     //         hasNextPage: false,
//     //         totalCount: 1,
//     //       }

//     //     this.setState({...this.state, audioFiles:media.assets})
//     // }

//     // getPermission = async () => {
//     //     const permission = await MediaLibrary.getPermissionsAsync()
//     //     // {
//     //     //     "canAskAgain": true,
//     //     //     "expires": "never",
//     //     //     "granted": false,
//     //     //     "status": "undetermined",
//     //     // }
//     //     if(permission.granted){
//     //         // we want to get all audio files
//     //         this.getAudioFiles();
//     //     }

//     //     if(!permission.granted && permission.canAskAgain){
//     //         const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();

//     //         if(status==='denied' && canAskAgain){
//     //             // alert to user that must allow to work app
//     //             this.permissionAlert();
//     //         }

//     //         if(status==='granted'){
//     //             // we want to get all audio files
//     //             this.getAudioFiles();
//     //         }

//     //         if(status==='denied' && !canAskAgain){
//     //             // alert to user that some error
//     //         }
//     //     }
//     // }

//     componentDidMount(){
//         //this.getPermission();
//     }

//     render() {
//         return (
//             <AudioContext.Provider value={{audioFiles:this.state.audioFiles}}>
//                 {this.props.children}
//             </AudioContext.Provider>
//         );
//     }
// }

// export default AudioProvider;