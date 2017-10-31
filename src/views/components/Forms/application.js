import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {};

  if (!values.notes) {
    errors.notes = 'You must add a note';
  } 
  if (!values.software) {
    errors.software = 'Software name is required';
  }

  return errors;
}

const form = reduxForm({
  form: 'application',
  validate
})


const renderField = field => (
    <input className="uk-input uk-width-small uk-margin-left uk-margin-right uk-form-controls" {...field.input}/>
)

const renderTextBox = field => (
  <textarea className="uk-textarea uk-form-width-large uk-margin-left uk-margin-bottom uk-margin-right uk-form-controls" rows="5" {...field.input} />
)

const renderCheckbox = field => (
  <input type="checkbox" className="uk-checkbox uk-margin-right" defaultChecked={field.input.value} {...field.input}/>
)


class ApplicationForm extends Component {

    constructor(props) {
    super(props)

    this.state = {
      softwareErrors: {},
      notesErrors: {}
    }
  }

  componentWillMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    const currentApplication = this.props.currentApplication
    const initData = {
      "software": currentApplication.software,
      "gateway": currentApplication.gateway,
      "omaha": currentApplication.omaha,
      "nashville": currentApplication.nashville,
      "north": currentApplication.north,
      "buypass": currentApplication.buypass,
      "elavon": currentApplication.elavon,
      "tsys": currentApplication.tsys,
      "source": currentApplication.source,
      "agent": currentApplication.agent,
      "ticket": currentApplication.ticket
    }
    this.props.initialize(initData)
  }

  handleChange(event) {
    if (event.target.name === 'software') {
      this.setState({
        softwareErrors: validate({ software: event.target.value }),
        software: event.target.value
      })
    } else if (event.target.name === 'notes') {
      this.setState({
        notesErrors: validate({ notes: event.target.value }),
        notes: event.target.value
      })
    }
  }

  handleFormSubmit = data => this.props.onSubmit(data)

  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset disabled={!this.props.admin} style={{border: 0}}>
            <div className="uk-margin uk-position-center">
              <h1 className="uk-heading-line uk-text-center uk-padding"><span>Software Information</span></h1>
              {!!this.state.softwareErrors.software ? <small className="uk-alert-danger">{this.state.softwareErrors.software}</small> : <small><font color="white">.</font></small>}<br/>
              <label className="uk-form-label">Software:</label>
              <Field
                name="software"
                onChange={this.handleChange.bind(this)}
                component={renderField}
              />
              <label className="uk-form-label">Works Through Gateway:</label>
              <Field
                name="gateway"
                component={renderField}
              />
              <h3 className="uk-heading-line uk-text-center uk-padding"><span>Compatible With The Following Processors:</span></h3>
              <label className="uk-form-label">Omaha: </label>
              <Field
                name="omaha"
                component={renderCheckbox}
              />
              <label className="uk-form-label">Nashville: </label>
              <Field
                name="nashville"
                component={renderCheckbox}
              />
              <label className="uk-form-label">North: </label>
              <Field
                name="north"
                component={renderCheckbox}
              />
              <label className="uk-form-label">BuyPass: </label>
              <Field
                name="buypass"
                component={renderCheckbox}
              />
              <label className="uk-form-label">Elavon: </label>
              <Field
                name="elavon"
                component={renderCheckbox}
              />
              <label className="uk-form-label">TSYS: </label>
              <Field
                name="tsys"
                component={renderCheckbox}
              />
              <h3 className="uk-heading-line uk-text-center uk-padding"><span>Additional Info</span></h3>
              {!!this.state.notesErrors.notes ? <small className="uk-alert-danger">{this.state.notesErrors.notes}</small> : <small><font color="white">.</font></small>}<br />
              <label className="uk-form-label">Add A Note:</label>
              <Field
                name="notes"
                onChange={this.handleChange.bind(this)}
                component={renderTextBox}
              />
              <label className="uk-form-label">Source:</label>
              <Field
                name="source"
                component={renderField}
              />
              <label className="uk-form-label">Agent Requesting:</label>
              <Field
                name="agent"
                component={renderField}
              />
              <label className="uk-form-label">Ticket Number:</label>
              <Field
                name="ticket"
                component={renderField}
              />
            </div>
            <button action="submit" className="uk-button uk-position-bottom-right uk-margin-bottom uk-margin-right uk-button-primary">Save</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    currentApplication: state.applications.currentApplication,
    admin: state.auth.currentUser.admin 
  }
}

ApplicationForm = connect(mapStateToProps)(form(ApplicationForm))

export default ApplicationForm
