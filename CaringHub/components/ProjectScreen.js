import React from 'react';
import { Box, NativeBaseProvider, Text, View, Button, Spinner, Pressable, ScrollView, Heading } from 'native-base';
import { ImageBackground, StatusBar, } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { postApplication } from '../redux/ActionCreators/appActions'
function RenderProjectItem(props) {
	const navigation = useNavigation()
	return (
		<NativeBaseProvider>

			<Pressable
				onPress={() => navigation.navigate('ProjectDetail', {
					project: props.project
				})}>
				<Box
					m={2}
					width='92%'
					backgroundColor="#000"
					shadowColor='#000'
					shadowOpacity={0.5}
					shadowOffset={{ width: 0, height: 2 }}
					shadowRadius={2}
					elevation={10}
					alignSelf='center'>
					<View >
						<ImageBackground

							style={{
								width: '100%',
								height: 200,
								justifyContent: 'flex-end'
							}}
							source={{ uri: props.project.image }}
							alt='Project'
							resizeMode='stretch'
						>
							<View backgroundColor="#ffffffa6">
								<Text fontSize='xl' px={2} py={1} color='#000' >{props.project.name}</Text>
								<Text px={2} fontSize='xs' color='#000' >{props.project.ownerOrg.name}</Text>
								{/* <Text px={2} fontSize='xs' >{new Date(Date.parse(props.project.createdAt)).toDateString()}</Text> */}
							</View>
						</ImageBackground>
					</View>
					<View style={{ width: '100%' }} alignSelf='flex-end'>
						<Box style={{ backgroundColor: '#e4f5f1' }}>
							<Text p={4}>
								{props.project.description.substring(0, 75) + '...'}
							</Text>
							<Button
								onPress={() => navigation.navigate('ProjectDetail', { project: props.project })}
								backgroundColor='#09120b' alignSelf='flex-end' width='45%' borderRadius='full' mb={2} mx={2}> Learn More</Button>
						</Box>
					</View>
				</Box>
			</Pressable>
		</NativeBaseProvider>
	);
}

const mapStateToProps = state => {
	return {
		Projects: state.Projects
	}
}
function ProjectList(props) {
	if (props.Projects.isLoading) {
		return (
			<NativeBaseProvider>
				<Spinner alignSelf='center' size='large' />
			</NativeBaseProvider>
		)
	}
	else if (props.Projects.errMess) {
		return (
			<NativeBaseProvider>
				<Text alignSelf='center' textAlign='center' color='red.500'>Error Loading Projects</Text>
			</NativeBaseProvider>
		)
	}
	else if (props.Projects.projects) {
		const projects = props.Projects.projects.map(project => {
			return <RenderProjectItem key={project._id} project={project} />
		})
		return (
			<NativeBaseProvider>
				<StatusBar barStyle='dark-content' backgroundColor='#fff'></StatusBar>
				<ScrollView backgroundColor='#fff' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
					{projects}
				</ScrollView>
			</NativeBaseProvider>
		)
	}
}
const mapNetStateToProps = state => {
	return {
		NetRequest: state.NetRequest
	}
}
const mapDispatchToProps = (dispatch) => ({
	postApplication: (data) => dispatch(postApplication(data)),
})

function ProjectDetailScreen(props) {
	const project = props.route.params.project
	return (
		<NativeBaseProvider>
			<ScrollView backgroundColor='#fff' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
				<Box
				// backgroundColor="#000"
				// shadowColor='#000'
				// shadowOpacity={0.5}
				// shadowOffset={{ width: 0, height: 2 }}
				// shadowRadius={2}
				// elevation={10}
				// alignSelf='center'
				>
					<View >
						<ImageBackground

							style={{
								width: '100%',
								height: 200,
								justifyContent: 'flex-end'
							}}
							source={{ uri: project.image }}
							alt='Project'
							resizeMode='stretch'
						>
							<View backgroundColor="#ffffffa6">
							<Text fontSize='3xl' px={2} py={1} >{project.name}</Text>
							<Text px={2} fontSize='xs' >{project.ownerOrg.name}</Text>
							<Text px={2} fontSize='xs' >Starts on: {new Date(Date.parse(project.startDate)).toDateString()}</Text>
						</View>
						</ImageBackground>
					</View>
					<View style={{ width: '100%' }} alignSelf='flex-end'>
						<Box style={{ backgroundColor: '#e4f5f1' }}>
							<Heading fontSize='2xl' px={2}>About the Project</Heading>
							{/* s<Text px={4} fontSize='xs' >{project.ownerOrg.name}</Text>
							<Text px={4} fontSize='xs' >{new Date(Date.parse(project.createdAt)).toDateString()}</Text> */}

							<Text p={4}>
								{project.description}
							</Text>
							<Heading fontSize='xl' px={4}>Skills</Heading>
							{
								project.skillSets.map(skill => {
									return <Text key={skill._id} px={8}>{skill.name}</Text>
								})
							}
							<Heading fontSize='xl' px={4}>Causes</Heading>
							{
								project.causeAreas.map(cause => {
									return <Text key={cause._id} px={8}>{cause.name}</Text>
								})
							}
							<Heading fontSize='xl' px={4}>Dates</Heading>
							<Text px={8} >Starts:	{new Date(Date.parse(project.startDate)).toDateString()}</Text>
							<Text px={8} >Ends:		 {new Date(Date.parse(project.endDate)).toDateString()}</Text>
							
							{
								props.NetRequest.errMess &&
								<Text color='#f00'>{props.NetRequest.errMess}</Text>
							}
							{
								props.NetRequest.success === true ?
								<Text color="#00f">Successfully Applied!</Text>
								:null
							}
							<Button 
								backgroundColor='#09120b' 
								alignSelf='flex-end' 
								width='45%' 
								borderRadius='full' 
								mt={2} mb={4} mx={2}
								onPress={() => props.postApplication({
									project: project._id
								})}
								>{props.NetRequest.isLoading === true ?<Spinner size='sm' color='#fff'/> : 'Apply'}</Button>
						</Box>
					</View>
				</Box>
			</ScrollView>
		</NativeBaseProvider>
	);
}
export const ProjectDetail = connect(mapNetStateToProps, mapDispatchToProps)(ProjectDetailScreen)
export default connect(mapStateToProps)(ProjectList)