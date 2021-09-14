import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { baseUrl } from '../redux/shared/baseUrl';
import {
    StyleSheet,
} from 'react-native';
import { Heading, Text, View, Image } from 'native-base';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { style } from 'styled-system';
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

function UserProfileView(props) {
    const decoded = props.auth.token
        ? jwtDecode(props.auth.token)
        : { role: "" };

    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch(baseUrl + 'volunteers/' + decoded._id)
            .then(response => {
                if (response.ok) {
                    return response
                }
                else {
                    const error = new Error('Error ' + response.status + ':' + response.statusText)
                    error.response = response
                    throw error
                }
            },
                error => {
                    const errorM = new Error(error.message)
                    throw errorM
                })
            .then(response => response.json())
            .then(response => {
                setUser(response)
                setIsLoaded(true)
            })
            .catch(error => {
                setError(error.message)
                setIsLoaded(true)
            })
    }, [])
    if (error) return (
        <Text>{error}</Text>
    )
    else if (!isLoaded) return (
        <Text>Loading...</Text>
    )
    else return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image 
                        alt='avatar'
                        style={styles.avatar}
                        source={{ uri: user.profilePicture ? user.profilePicture : 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                        
                    <Text style={styles.name}>{user.firstName + ' ' + user.lastName} </Text>
                    <Text style={styles.userInfo}>{user.emailAddress}</Text>
                    <Text style={styles.userInfo}>{user.address.city}</Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <Heading fontSize='2xl'>About Me</Heading>
                        <Text style={styles.info}>I have worked and am workgin on a lot of projects in different areas of types of projects and scales. I have worked and am workgin on a lot of projects in different areas of types of projects and scales.</Text>
                        <Heading fontSize='2xl' px={4}>Skills</Heading>
							{
								user.skillSets.map(skill => {
									return <Text style={styles.info}  key={skill._id} px={8}>{skill.name}</Text>
								})
							}
							<Heading fontSize='2xl' px={4}>Causes</Heading>
							{
								user.causeAreas.map(cause => {
									return <Text style={styles.info} key={cause._id} px={8}>{cause.name}</Text>
								})
							}
                    </View>
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#DCDCDC",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "#778899",
        height: 500,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        padding:4
    },
    infoContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 16,
        //marginTop: 20,
        color: "#FFFFFF",
    }
});

export default connect(mapStateToProps)(UserProfileView)