import * as React from 'react';
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

import {
    NativeBaseProvider,
    Box,
    Heading,
    View,
    VStack,
    FormControl,
    Input,
    Button,
    ScrollView,
    Text,
    Spinner
} from 'native-base';


const mapStateToProps = state => {
    return {
        HelpRequests: state.HelpRequests,
        Projects: state.Projects
    }
}

const mapDispatchToProps = (dispatch) => ({
    //methods for requesting help
})

function Helps() {
    return (
        <View backgroundColor="#fff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Helps</Text>
        </View>
    )
}

function Settings() {
    return (
        <View backgroundColor="#fff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings</Text>
        </View>
    )
}
const Tab = createBottomTabNavigator()
class UserHome extends React.Component {
    render() {
        return (
            <NativeBaseProvider>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color }) => {
                            let icon;

                            if (route.name === 'Help Requests') {
                                icon = focused
                                    ? faHandHoldingHeart
                                    : faHandHoldingHeart;
                            } else if (route.name === 'Settings') {
                                icon = focused ? faCog : faCog;
                            }

                            // You can return any component that you like here!
                            return <FontAwesomeIcon icon={icon} size={32} color={color} />;
                        },
                        tabBarActiveTintColor: 'darkblue',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen  name='Help Requests' component={Helps} />
                    <Tab.Screen name='Settings' component={Settings} />
                </Tab.Navigator>
            </NativeBaseProvider>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)