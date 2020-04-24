import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editStream, fetchStream} from '../../actions';
import StreamForm from './stream-form';

class StreamEdit extends Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {        
        this.props.editStream(formValues, this.props.match.params.id);      
    }

    editInput = stream => {        
        if(!stream){
            return (
                <div>Loading...</div> 
            )
        }
        return (
            <>
                <h3>Edit a stream</h3>
                <StreamForm 
                    onSubmit={this.onSubmit}
                    initialValues={{title: stream.title, description: stream.description}}
                />
            </>
        );
    }
       
    render() {
        const {stream} = this.props;
        return(
           <>
                { this.editInput(stream) }
           </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {  
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {editStream, fetchStream})(StreamEdit);
