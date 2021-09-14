import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchApplications } from '../redux/ActionCreators/appActions'
import { fetchCauses } from '../redux/ActionCreators/causeActions'
import { fetchHelps } from '../redux/ActionCreators/helpActions'
import { fetchOrgs } from '../redux/ActionCreators/orgActions'
import { fetchProjects } from '../redux/ActionCreators/projectActions'
import { fetchSkills } from '../redux/ActionCreators/skillActions'
import { fetchUsers } from '../redux/ActionCreators/userActions'
import { fetchVolunteers } from '../redux/ActionCreators/volActions'
import jwtDecode from 'jwt-decode'
import CaringHub from './Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Signup';
import UserHome from './UserHome'
import VolunteerHome from './VolunteerHome'
import Login from './Login'





const mapStateToProps = state => {
	return {
		auth: state.auth,
		Organizations: state.Organizations,
		Volunteers: state.Volunteers,
		Applications: state.Applications,
		HelpRequests: state.HelpRequests,
		Users: state.Users,
		Skills: state.Skills,
		Causes: state.Causes,
		Projects: state.Projects,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchApplications: () => dispatch(fetchApplications()),
	fetchProjects: () => dispatch(fetchProjects()),
	fetchCauses: () => dispatch(fetchCauses()),
	fetchSkills: () => dispatch(fetchSkills()),
	fetchUsers: () => dispatch(fetchUsers()),
	fetchOrgs: () => dispatch(fetchOrgs()),
	fetchVolunteers: () => dispatch(fetchVolunteers()),
	fetchHelps: () => dispatch(fetchHelps()),


})

const Stack = createNativeStackNavigator()

class Main extends Component {
	componentDidMount() {
		this.props.fetchApplications()
		this.props.fetchCauses()
		this.props.fetchOrgs()
		this.props.fetchHelps()
		this.props.fetchSkills()
		this.props.fetchUsers()
		this.props.fetchVolunteers()
		this.props.fetchProjects()
	}

	render() {
		const decoded = this.props.auth.token
			? jwtDecode(this.props.auth.token)
			: { role: "" };
		return (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						headerStyle: {
							backgroundColor: '#fff',
						},
						headerTintColor: '#000',
						
					}}
					initialRouteName='CaringHub'
				>
					{this.props.auth.isAuthenticated === false ?
						(
							<>
								< Stack.Screen
									name="CaringHub"
									component={CaringHub} />
								<Stack.Screen
									name="Register"
									component={SignUp} />

								<Stack.Screen
									name='Login'
									component={Login}
								/>
							</>
						) : (
							<>
								{
									decoded.role === 'User' &&
									<Stack.Screen
										name="UserHome"
										component={UserHome} />
								}
								{
									decoded.role === 'Vol' &&
									<Stack.Screen
										name='VolunteerHome'
										component={VolunteerHome} />
								}
							</>
						)
					}
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)