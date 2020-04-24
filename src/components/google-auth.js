import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions'

class GoogleAuth extends Component{
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '655987167351-0o0tbn1qtcnosjh0edqtrat42dtscbhr.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    } 

    onAuthChange = (isSignedIn) => {
        isSignedIn ? 
        this.props.signIn(this.auth.currentUser.get().getId()) : 
        this.props.signOut()
    }

    signInClick = () => {this.auth.signIn()}

    signOutClick = () => {this.auth.signOut()}

    render(){
        const { isSignedIn } = this.props;
        if (isSignedIn === null){
            return <button disabled>Loading status </button>
        }

        return (
            <>
                { isSignedIn ? 
                    <button onClick={this.signOutClick}>Log out</button> :
                    <button onClick={this.signInClick}>Log in</button> 
                }
            </>
        );
    }
}


const mapStateToProps = state => {    
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
