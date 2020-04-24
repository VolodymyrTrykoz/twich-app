import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStreams, deleteStream} from '../../actions';
import {Link} from 'react-router-dom';

class StreamList extends Component {

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin = (userId, streamId) => {
        const { currentUserId }= this.props;
        if(currentUserId === userId && userId !== null){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${streamId}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${streamId}`} className="ui button negative">Delete</Link>
                </div>
            )
        }   
    }

    renderCreate = () => {
        const {isSignedIn} = this.props;
        if(isSignedIn){
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        const { streams }= this.props;

        return(
            <>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {
                        streams.map(({id, title, description, userId}) => (
                            <div
                                className="item"
                                key={id}>
                                    {this.renderAdmin(userId, id)}
                                    <i className="large middle aligned icon camera"/>
                                    {title}
                                <div className="description">{description}</div>
                            </div>
                        ))
                    }
                </div>
                {this.renderCreate()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams, deleteStream})(StreamList);