import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{error}</span> }
  </fieldset>
)

class Signup extends Component {
  handleFormSubmit(values) {
    // Call action creator to sign up the user
    this.props.signupUser(values);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Uh oh!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={renderField} type="email" label="Email"/>
        <Field name="password" component={renderField} type="password" label="Password"/>
        <Field name="passwordConfirm" component={renderField} type="password" label="Password Confirmation"/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  // Condense with 4each
  if (!values.email) {
    errors.email = 'Please enter an email'
  }

  if (!values.password) {
    errors.password = 'Please enter a password'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (values.password != values.passwordConfirm) {
    errors.password = "Passwords must match"
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const reduxFormSignUp = reduxForm({
  form: 'signup',
  validate
})(Signup)

export default connect(mapStateToProps, actions)(reduxFormSignUp);