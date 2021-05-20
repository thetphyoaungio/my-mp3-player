import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PalyList from '../screens/PlayList';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator=()=> {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AudioList" component={AudioList} 
            options={{
                tabBarIcon:({color, size})=>{return <Ionicons name="headset" size={size} color={color} />}
            }}/>
            <Tab.Screen name="Player" component={Player} 
            options={{
                tabBarIcon:({color, size})=>{return <FontAwesome5 name="compact-disc" size={size} color={color} />}
            }}/>
            <Tab.Screen name="PlayList" component={PalyList} 
            options={{
                tabBarIcon:({color, size})=>{return <MaterialIcons name="library-music" size={size} color={color} />}
            }}/>
        </Tab.Navigator>
    );
}

export default AppNavigator;