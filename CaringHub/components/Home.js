import React, { Component } from "react"
import { Heading, Text, Box, Button, View, ScrollView, VStack, NativeBaseProvider, StatusBar } from "native-base"
import { TouchableOpacity } from "react-native";
import ImageCarousel from "./ImageCarousel";

class CaringHub extends Component {
	render() {
		return (
			<NativeBaseProvider>
				<StatusBar backgroundColor="#fff" translucent barStyle='dark-content'></StatusBar>
				<ScrollView backgroundColor='#fff' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
					<Box justifyContent='center' alignItems='center' >
						<Box
							//m={4}
							//py={4}
							//px={3}
							alignSelf='center'
							width='100%'

						>
							<Heading mb={10} alignSelf='center' fontFamily='cursive' fontSize='6xl' color='blue.800'>CaringHub</Heading>
							{/* <Text fontFamily='cursive' mb={8} fontSize='lg' textAlign='center' alignSelf={"center"}>Joining hands and hearts to give hope!</Text> */}
							<ImageCarousel />
							<VStack>
								<Button
									mx={5}
									colorScheme='blue'
									onPress={() => this.props.navigation.navigate('Login')}
									borderRadius='full'
								>Login</Button>

								<TouchableOpacity>
									<Text
										mt={10}
										colorScheme='blue.600'
										textAlign='center'
										color='blue.600'
										onPress={() => this.props.navigation.navigate('Register')}>New to CaringHub? Create Account</Text>
								</TouchableOpacity>
							</VStack>
						</Box>
					</Box>
				</ScrollView>
			</NativeBaseProvider >
		)
	}
}

export default CaringHub
