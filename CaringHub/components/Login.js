import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../redux/ActionCreators/authActions'
import {
	Heading, Text, Box, FormControl, Button, ScrollView, VStack,
	Input, TouchableOpacity, Spinner, NativeBaseProvider, Modal, IconButton, Alert, CloseIcon
} from "native-base"
import { TextInput } from 'react-native'

import jwtDecode from 'jwt-decode'

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => ({
	loginUser: (creds) => dispatch(loginUser(creds)),
})


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			open: false
		}
		this.login = this.login.bind(this);

	}
	async login() {
		await	this.props.loginUser({
			username: this.state.username,
			password: this.state.password
		})

	 if(this.props.auth.isAuthenticated === false) {
				this.setState({open: true})
	 }

	}
	
	render() {

		return (
			<NativeBaseProvider>
				<ScrollView backgroundColor='#fff' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
					<Box justifyContent='center' alignItems='center' >
						<Box
							m={4}
							py={4}
							px={3}
							alignSelf='center'
							width='95%'
						>
							<Heading mb={2} alignSelf='center' fontFamily='cursive' fontSize='6xl' color='blue.800'>CaringHub</Heading>
							<Text fontFamily='cursive' mb={4} fontSize='lg' textAlign='center' alignSelf={"center"}>Joining hands and hearts to give hope!</Text>
							<VStack space={2} mt={5} justifyContent='center'
								alignItems='center'>
								<Text mb={4} fontSize='2xl' bold textAlign='center'>Login to CaringHub</Text>
								<FormControl isRequired>
									<TextInput
										underlineColorAndroid='darkblue'
										value={this.state.username}
										p={2}
										m={2}
										placeholder="Username"
										onChangeText={username => this.setState({ username: username })} />
									<FormControl.ErrorMessage>Error Name</FormControl.ErrorMessage>
									<TextInput
										underlineColorAndroid='darkblue'
										p={2}
										m={2}
										placeholder="Password"
										value={this.state.password}
										secureTextEntry={true}
										onChangeText={password => this.setState({ password: password })} />
								</FormControl>
							</VStack>
							<VStack space={2} mt={5}>
								
								<Modal
									isOpen={this.state.open}>
									<Alert
										w={'80%'}
										status="error"
										action={
											<IconButton
												icon={<CloseIcon size="xs" />}
												onPress={() => this.setState({ open: false })}
											/>}
										actionProps={{
											alignSelf: "center",
										}}
									>
										<Alert.Icon />
										<Alert.Title flexShrink={1}>{this.props.auth.errMess}</Alert.Title>
									</Alert>
								</Modal>
								<Button
									m={2}
									colorScheme='blue'
									onPress={this.login}
									borderRadius='full'
								>{this.props.auth.isLoading === true ? <Spinner size='sm' color='#fff' /> : 'Login'}</Button>
								<Text
									mt={8}
									colorScheme='blue.600'
									textAlign='center'
									color='blue.600'
									onPress={() => this.props.navigation.navigate('Register')}>New to CaringHub? Create Account</Text>
							</VStack>
						</Box>
					</Box>
				</ScrollView>
			</NativeBaseProvider>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)