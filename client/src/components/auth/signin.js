import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Handle the sign in
    this.props.signinUser({ email, password });
  } 

  fieldInput(field){
    return(
      <div>
        <input {...field.input } type={field.type} className="form-control" />
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Uh-oh!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field type="text" name="email" component={this.fieldInput} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field type="password" name="password" component={this.fieldInput} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignIn = reduxForm({
  form: 'signin'
})(Signin)

export default connect(mapStateToProps, actions)(reduxFormSignIn);