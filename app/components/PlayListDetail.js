import React from 'react';
import {View, StyleSheet, Modal, FlatList, Text, Dimensions} from 'react-native';
import color from '../misc/color';
import AudioListItem from '../components/AudioListItem';

const PlayListDetail = ({visible, playList, onClose}) => {
    return(
        <Modal 
        visible={visible} 
        animationType='fade' 
        transparent 
        onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{playList.title}</Text>
                <FlatList 
                contentContainerStyle={styles.listContainer} 
                data={playList.audios} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item})=> (
                    <View style={{marginBottom:10}}>
                        <AudioListItem 
                        title={item.title} 
                        duration={item.duration} />
                    </View>
                )} />
            </View>
            <View style={[StyleSheet.absoluteFillObject, styles.modalBG]}></View>
        </Modal>
    )
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom: 0,
        alignSelf:'center',
        height: height - 150,
        width: width - 15,
        backgroundColor:'#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalBG:{
        backgroundColor:color.MODAL_BG,
        zIndex:-1  
    },
    listContainer:{
        padding: 20,
    },
    title:{
        textAlign:'center',
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: color.ACTIVE_BG
    },
})

export default PlayListDetail;