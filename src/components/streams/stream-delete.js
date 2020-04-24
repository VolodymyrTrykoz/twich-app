import React, {Component} from 'react';
import Modal from '../modal';
import history from '../../history';
import {connect} from 'react-redux';
import{fetchStream, deleteStream} from '../../actions';


class StreamDelete extends Component {
    streamId = this.props.match.params.id;

    componentDidMount(){
        this.props.fetchStream(this.streamId);
    }

    closeModal = () => { history.push('/') };

    handleDelete = () => { this.props.deleteStream(this.streamId) };

    renderActions = () => {
        return (
            <div className="actions">
                <button className="ui primary button" onClick={this.handleDelete}>Delete</button>
                <button className="ui button" onClick={this.closeModal}>Cancel</button>
            </div>
        )
    }

    render(){
        const {stream} = this.props;
        if(!stream){
            return <div>Loading</div>
        }
        return(
            <Modal
                title='Delete stream'
                content={`Are you sure you want to delete the "${stream.title}" stream?`}
                actions={this.renderActions()}
                onDismiss={this.closeModal}
            />                
        )
    }
}

const mapStateToProps = (state, ownProps) => {    
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
