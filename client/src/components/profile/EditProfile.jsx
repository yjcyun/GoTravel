import React, { Component } from 'react'
import { Field } from 'redux-form'
import { editProfile } from '../../constants/profileFields'
import { connect } from 'react-redux'
import { loadUser, updateUserProfile } from '../../redux/actions/authActions'
import { reduxForm } from 'redux-form'
import { FormWrapper, ButtonWrapper, Button } from '../../globalStyle'
import FormInput from '../FormInput'
import styled from 'styled-components'

class EditProfile extends Component {
  // RENDER FormInput.jsx
  renderInput = props => <FormInput {...props} white />

  // FILEUPLOAD COMPONENT
  fileUpload = ({ input, type }) => {
    delete input.value;
    return (
      <input type={type} {...input} />
    )
  }

  // FORM ONSUBMIT HANDLER
  onSubmit = formValues => {
    this.props.updateUserProfile('profile', formValues)
  };

  // RENDER COMPONENT
  render() {
    if (!this.props.user.user) {
      return null;
    }
    return (
      <FormWrapper>
        <h2>Your Account Profile</h2>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {editProfile.map(profile => {
            return (
              <Field
                key={profile.name}
                name={profile.name}
                label={profile.label}
                type={profile.type}
                component={this.renderInput}
                placeholder={profile.name === 'name' ? this.props.user.user.name : this.props.user.user.email}
                disabled={profile.name === 'email'}
              />
            )
          })}
          <UploadAvatar>
            <img src={`/users/${this.props.user.user.photo}`} alt={this.props.user.user.name} />
            <Field
              name='photo'
              type='file'
              component={this.fileUpload}
              accept='image/*'
            />
          </UploadAvatar>
          <ButtonWrapper>
            <Button type='submit' login>save setting</Button>
          </ButtonWrapper>
        </form>
      </FormWrapper>
    )
  }
}

// STYLE
const UploadAvatar = styled.div`
  display: flex;
  margin-top: 2.5rem;
  align-items: center;

  img {
    width: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
`

// REDUX STATE
const mapStateToProps = state => {
  return { user: state.auth }
}

// FORM VALIDATE
const validate = () => {
  const errors = {};
  return errors;
}

// CONFIGURE REDUX-FORM
const editForm = reduxForm({
  form: 'profileForm',
  validate
})(EditProfile);

// EXPORT COMPONENT
export default connect(
  mapStateToProps, { loadUser, updateUserProfile }
)(editForm)