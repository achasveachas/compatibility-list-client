import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'


const form = reduxForm({
  form: 'application'
})

const renderField = field => (
    <input className="uk-input uk-width-small uk-margin-left uk-margin-right uk-form-controls" {...field.input}/>
)

const renderCheckbox = field => (
  <input type="checkbox" className="uk-checkbox uk-margin-right" defaultChecked={field.input.value} {...field.input}/>
)


class ApplicationForm extends Component {

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
      "elavon": currentApplication.elavon,
      "tsys": currentApplication.tsys,
      "other": currentApplication.other,
      "notes": currentApplication.notes,
      "agent": currentApplication.agent,
      "ticket": currentApplication.ticket
    }
    this.props.initialize(initData)
  }

  handleFormSubmit = data => this.props.onSubmit(data)

  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="uk-margin uk-position-center">
            <h1 className="uk-heading-line uk-text-center uk-padding"><span>Software Information</span></h1>
            <label className="uk-form-label">Software:</label>
            <Field
              name="software"
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
            <label className="uk-form-label">Other (please elaborate in the notes): </label>
            <Field
              name="other"
              component={renderCheckbox}
            />
            <h3 className="uk-heading-line uk-text-center uk-padding"><span>What are we doing?</span></h3>
            <label className="uk-form-label">Action:</label>
            <Field
              name="action"
              component={renderField}
            />
            <label className="uk-form-label">Completed?</label>
            <Field
              name="complete"
              component={renderCheckbox}
            />
            <h3 className="uk-heading-line uk-text-center uk-padding"><span>What kind of job is this for?</span></h3>
            <label className="uk-form-label">Job Title:</label>
            <Field
              name="job_title"
              component={renderField}
            />
            <label className="uk-form-label">Job URL:</label>
            <Field
              name="job_url"
              component={renderField}
            />
          <label className="uk-form-label">Notes:</label>
            <Field
              name="notes"
              type="textarea"
              component={renderField}
            />
          </div>
          <button action="submit" className="uk-button uk-position-bottom-center uk-margin-bottom uk-button-primary">Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentApplication: state.applications.currentApplication }
}

ApplicationForm = connect(mapStateToProps)(form(ApplicationForm))

export default ApplicationForm
