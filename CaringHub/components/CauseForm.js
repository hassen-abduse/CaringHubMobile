import * as React from 'react';
import { connect } from 'react-redux'
import { postCause } from '../redux/ActionCreators/causeActions';
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
    Card,
    Spinner,
    TextArea,
    Container,
    View
} from 'native-base';
import CardItemBordered from './ProjectScreen';

const mapStateToProps = state => {
    return {
        Causes: state.Causes,
        NetRequest: state.NetRequest
    }
}
const mapDispatchToProps = (dispatch) => ({
    postCause: (data) => dispatch(postCause(data))
})

class CauseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
        this.postCause = this.postCause.bind(this);
    }

    postCause() {
        this.props.postCause({
            name: this.state.name,
            description: this.state.description
        })
    }

    render() {
        return (
            <NativeBaseProvider>
                <ScrollView backgroundColor='#fff' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Box
                        safeArea
                        flex={1}
                        p={2}
                        w="95%"
                        mx='auto'
                        backgroundColor='#fff'
                    >

                        <Heading mb={2} alignSelf='center' fontFamily='cursive' fontSize='4xl' color='blue.800'>CaringHub</Heading>
                        <Text fontSize='xs' textAlign='center' alignSelf={"center"}>Post Cause</Text>
                        <VStack space={2} mt={4}>
                            <FormControl>
                                <Input
                                    placeholder='Name (Required)'
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name: name })} />
                            </FormControl>
                            <FormControl>
                                <TextArea
                                    placeholder='Description (Required)'
                                    value={this.state.description}
                                    onChangeText={description => this.setState({ description: description })} />
                            </FormControl>
                            {
                                this.props.NetRequest.isLoading === true ?
                                    <Spinner /> : null
                            }

                            {this.props.NetRequest.errMess &&
                                <Text color='red.500' textAlign='center'>{this.props.NetRequest.errMess}</Text>
                            }
                            {this.props.NetRequest.status &&
                                <Text color='green.500' textAlign='center'>{this.props.NetRequest.status}</Text>
                            }
                            <VStack space={2} mt={2}>
                                <Button
                                    colorScheme="blue"
                                    borderRadius='full'
                                    _text={{ color: 'white' }}
                                    onPress={this.postCause} >
                                    Post Cause
                                </Button>
                            </VStack>

                        </VStack>
                    </Box>
                </ScrollView>
            </NativeBaseProvider>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CauseForm)