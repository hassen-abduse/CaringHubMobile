import * as React from 'react';
import { connect } from 'react-redux'
import { registerUser, registerVolunteer } from '../redux/ActionCreators/registrationActions'
import MultiSelect from 'react-native-multiple-select';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  ScrollView,
  Text,
  Spinner,
  View,
  Checkbox,
  Alert,
  Collapse,
  IconButton,
  CloseIcon,
  Modal
} from 'native-base';
import { TextInput, ViewBase } from 'react-native';


const mapStateToProps = state => {
  return {
    Registration: state.Registration,
    Skills: state.Skills,
    Causes: state.Causes,
  }
}


const mapDispatchToProps = (dispatch) => ({
  registerUser: (data) => dispatch(registerUser(data)),
  registerVolunteer: (data) => dispatch(registerVolunteer(data))
})

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      city: '',
      volunteer: false,
      selectedSkills: [],
      selectedCauses: [],
      open: false

    }

    this.register = this.register.bind(this);
  }
  onSkillSelectionChange = (selectedSkills) => {
    this.setState({ selectedSkills: selectedSkills })
  }
  onCauseSelectionChange = (selectedCauses) => {
    this.setState({ selectedCauses: selectedCauses })
  }
  async register() {
    if (this.state.volunteer === true) {
      await this.props.registerVolunteer(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
          address: { city: this.state.city },
          emailAddress: this.state.email,
          skillSets: this.state.selectedSkills,
          causeAreas: this.state.selectedCauses
        }
      )
    }
    else {
      await this.props.registerUser(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
          address: { city: this.state.city },
          emailAddress: this.state.email,
        }
      )

    }
    if (this.props.Registration.success) {
      this.props.navigation.navigate('Login')
    }
    if (this.props.Registration.success === false) {
      this.setState({ open: true })
    }
  }
  render() {
    const selectedSkills = this.state.selectedSkills
    const selectedCauses = this.state.selectedCauses
    return (
      <NativeBaseProvider>

        <ScrollView backgroundColor='#fff' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Box
            safeArea
            p={2}
            w="95%"
            mx='auto'
            backgroundColor='#fff'
          >

            <VStack space={2}>
              <Text my={2} fontSize='2xl' bold textAlign='center'>Create New Account</Text>

              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  placeholder='First Name (Required)'
                  value={this.state.firstName}
                  onChangeText={firstName => this.setState({ firstName: firstName })} />
              </FormControl>
              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  placeholder='Last Name (Required)'
                  value={this.state.lastName}
                  onChangeText={lastName => this.setState({ lastName: lastName })} />
              </FormControl>
              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  placeholder='Phone Number (Required)'
                  value={this.state.phoneNumber}
                  onChangeText={phoneNumber => this.setState({ phoneNumber: phoneNumber })} />
              </FormControl>
              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  placeholder='Username (Required)'
                  value={this.state.username}
                  onChangeText={username => this.setState({ username: username })} />
              </FormControl>
              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  placeholder='Email (Required)'
                  value={this.state.email}
                  onChangeText={email => this.setState({ email: email })} />
              </FormControl>
              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  secureTextEntry={true}
                  placeholder='Password (Required)'
                  value={this.state.password}
                  onChangeText={password => this.setState({ password: password })} />
              </FormControl>
              <FormControl>
                <TextInput
                  underlineColorAndroid='darkblue'
                  placeholder='City (Required)'
                  value={this.state.city}
                  onChangeText={city => this.setState({ city: city })} />
              </FormControl>
              <FormControl>
                <Checkbox size='sm' value={this.state.volunteer} onChange={volunteer => this.setState({ volunteer: !this.state.volunteer })}>I want to Volunteer</Checkbox>
              </FormControl>
              {this.state.volunteer === true ?
                <View>
                  <FormControl>
                    {
                      this.props.Skills.isLoading === true ?
                        <View>
                          <Spinner size='sm' />
                          <Text fontSize='xxs' textAlign='center'>Loading skills...</Text>
                        </View>
                        :
                        <MultiSelect

                          hideSubmitButton
                          items={this.props.Skills.skills}
                          uniqueKey="_id"
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={this.onSkillSelectionChange}
                          selectedItems={selectedSkills}
                          selectText="Select skills"
                          searchInputPlaceholderText="Search skills..."
                          altFontFamily="ProximaNova-Light"
                          tagRemoveIconColor="#CCC"
                          tagBorderColor="#CCC"
                          tagTextColor="#CCC"
                          //selectedItemTextColor="#CCC"
                          //selectedItemIconColor="#CCC"
                          //itemTextColor="#000"
                          displayKey="name"
                          //searchInputStyle={{ color: '#CCC' }}
                        />


                    }
                  </FormControl>
                  <FormControl>
                    {
                      this.props.Causes.isLoading === true ?
                        <View>
                          <Spinner size='sm' />
                          <Text fontSize='xxs' textAlign='center'>Loading causes...</Text>
                        </View>
                        :
                        <MultiSelect
                          hideTags
                          hideSubmitButton
                          items={this.props.Causes.causes}
                          uniqueKey="_id"
                          ref={(component) => { this.multiSelect = component }}
                          onSelectedItemsChange={this.onCauseSelectionChange}
                          selectedItems={selectedCauses}
                          selectText="Select cause areas"
                          searchInputPlaceholderText="Search causes..."
                          altFontFamily="ProximaNova-Light"
                          tagRemoveIconColor="#CCC"
                          tagBorderColor="#CCC"
                          tagTextColor="#CCC"
                          selectedItemTextColor="#CCC"
                          selectedItemIconColor="#CCC"
                          itemTextColor="#000"
                          displayKey="name"
                          searchInputStyle={{ color: '#CCC' }}
                          submitButtonColor="#CCC"
                          submitButtonText="Submit"
                        />
                    }
                  </FormControl>
                </View>
                : null
              }

              <VStack space={2} mt={2}>
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
                    <Alert.Title flexShrink={1}>{this.props.Registration.errMess}</Alert.Title>
                  </Alert>
                </Modal>

                <Button
                  colorScheme="blue"
                  borderRadius='full'
                  _text={{ color: 'white' }}
                  onPress={this.register} >
                  {this.props.Registration.isLoading === true ? <Spinner size='sm' color='#fff' /> : 'Create New Account'}
                </Button>
              </VStack>
              <Text mt={4} textAlign='center'>By creating an account, you accept CaringHub's Terms of Service and Privacy Policy.</Text>
            </VStack>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)