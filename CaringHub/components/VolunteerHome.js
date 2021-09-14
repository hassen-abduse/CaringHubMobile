import * as React from 'react';
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { logoutUser } from '../redux/ActionCreators/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    NativeBaseProvider,
    View,
    Button,
    Text,
} from 'native-base';
import { faAngular, faNodeJs, faReact, faVuejs } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { fetchProjects } from '../redux/ActionCreators/projectActions';
import { ProjectDetail } from './ProjectScreen';
import ProjectScreen from './ProjectScreen';
import Profile from './UserProfile';


const mapStateToProps = state => {
    return {
        HelpRequests: state.HelpRequests,
        Projects: state.Projects
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    fetchProjects: () => dispatch(fetchProjects())
})

function Apps() {
    return (
        <View backgroundColor="#fff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>My Applications</Text>
        </View>
    )
}
const ProjectStack = createNativeStackNavigator()
function Projects(props) {
    return (
        <ProjectStack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#000',
            }}
            initialRouteName='ProjectList'
        >
            <ProjectStack.Screen
                name='ProjectDetail'
                component={ProjectDetail}
            />
            <ProjectStack.Screen
                name='ProjectList'
                component={ProjectScreen}
            />
        </ProjectStack.Navigator>
    )
}

function Settings() {
    return (
        <Profile />
    )
}

function BestMatches() {
    return (
        <View backgroundColor="#fff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Best Matches</Text>
        </View>
    )
}


const Tab = createBottomTabNavigator()

class VolunteerHome extends React.Component {
    componentDidMount() {
        this.props.fetchProjects()
    }
    render() {
        return (
            <NativeBaseProvider>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color }) => {
                            let icon;

                            if (route.name === 'Best Matches') {
                                icon = focused
                                    ? faReact
                                    : faReact;
                            } else if (route.name === 'Applications') {
                                icon = focused ? faNodeJs : faNodeJs;
                            }
                            else if (route.name === 'Projects') {
                                icon = focused ? faVuejs : faVuejs;
                            }
                            else if (route.name === 'Profile') {
                                icon = focused ? faAngular : faAngular;
                            }

                            // You can return any component that you like here!
                            return <FontAwesomeIcon icon={icon} size={32} color={color} />;
                        },
                        tabBarActiveTintColor: 'darkblue',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name='Best Matches' options={{
                        headerRight: () => (
                            <Button
                                onPress={(event) => {
                                    this.props.logoutUser()
                                    
                                }}
                                backgroundColor="#fff"
                            >{<FontAwesomeIcon icon={faSignOutAlt} />}</Button>
                        ),
                    }} component={BestMatches} />
                    <Tab.Screen name='Applications'
                        options={{
                            
                            headerRight: () => (
                                <Button
                                    onPress={(event) => {
                                        this.props.logoutUser()
                                        
                                    }}
                                    backgroundColor="#fff"
                                >{<FontAwesomeIcon icon={faSignOutAlt} />}</Button>
                            ),
                        }} component={Apps} />
                    <Tab.Screen name='Projects'
                        options={{
                            headerRight: () => (
                                <Button
                                    onPress={(event) => {
                                        this.props.logoutUser()
                                        
                                    }
                                    }
                                    backgroundColor="#fff"
                                >{<FontAwesomeIcon icon={faSignOutAlt} />}</Button>
                            ),
                        }} component={Projects} />
                    <Tab.Screen name='Profile'
                        options={{
                            headerRight: () => (
                                <Button
                                    onPress={(event) => {
                                        this.props.logoutUser()
                                    }
                                    }
                                    backgroundColor="#fff"
                                >{<FontAwesomeIcon icon={faSignOutAlt} />}</Button>
                            ),
                        }} component={Settings} />
                </Tab.Navigator>
            </NativeBaseProvider>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerHome)