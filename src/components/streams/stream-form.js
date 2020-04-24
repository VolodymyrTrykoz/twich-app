import React, {Component} from 'react';
import {Field, reduxForm } from 'redux-form';


class StreamForm extends Component {    
    renderInput = ({input, label, meta}) => { 
        const error = meta.touched && meta.error; 
                    
        return (
            <div className={error ? "field error" : "field"}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {error && (
                    <div className="ui error message">
                        <div className="header">{meta.error}</div>
                    </div>
                )}
            </div>   
        )
    }

    onSubmit = formValues => {        
        this.props.onSubmit(formValues);      
    }

    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field component={this.renderInput} name="title" label="Enter Title"/>
                <Field component={this.renderInput} name="description" label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = 'You must enter a title'
    }
    if(!formValues.description){
        errors.description = 'You must enter a description'
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate 
})(StreamForm);
