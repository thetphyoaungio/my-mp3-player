import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import color from '../misc/color';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.APP_BG,
        paddingTop:10,
        paddingBottom: 10
    },
})

const Screen = ({children}:{children:any}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

export default Screen;