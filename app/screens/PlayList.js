import React from 'react';
import {View, StyleSheet,Text} from 'react-native'

const PalyList=()=> {
    
        return (
            <View style={styles.container}>
                <Text>Play List</Text>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default PalyList;