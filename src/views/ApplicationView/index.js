import React, { Component} from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';

import { editApplication } from '../../redux/modules/Applications/actions'
import ApiServices from '../../redux/services/Api'
import ApplicationForm from '../components/Forms/application'

class ApplicationView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }

  }

  openModal = () => this.setState({modalIsOpen: true})
  closeModal = () => this.setState({modalIsOpen: false})

  openApplicationForm = () => {
    this.openModal()
  }

  handleEditApplication = (data) => {
    return ApiServices.patch("/applications", data, this.props.token)
      .then(response => {
        const { application } = response
        this.props.editApplication(application)
        this.props.reset('application')
        this.closeModal()
      })
      .catch((errors) => {
        console.log(errors)
        throw new SubmissionError(errors)
      })

  }

  render() {
    const modalStyle = {
      overlay: {
        "position": "absolute",
        "overflow": "auto",
        "minHeight": "825px",
      }
    }

    const application = this.props.currentApplication
    let frontEnds = []

    if (application.omaha)
      frontEnds.push("Omaha")
    if (application.nashville)
      frontEnds.push("Nashville")
    if (application.north)
      frontEnds.push("North")
    if (application.buypass)
      frontEnds.push("BuyPass")
    if (application.elavon)
      frontEnds.push("Elavon")
    if (application.tsys)
      frontEnds.push("TSYS")

    return (
      <div>
        <h1 className="uk-heading-line uk-text-center uk-padding"><span>{ application.software }</span></h1>
        <div className="uk-margin uk-position-center">
          <p className="uk-text-large"><span className="uk-text-bold ">Works with the following gateway(s):</span> {application.gateway ? application.gateway : "N/A"}</p>
          <p className="uk-text-large"><span className="uk-text-bold ">Through the following frontend(s):</span> {frontEnds.length > 0 ? frontEnds.join(", ") + "." : "N/A"}</p>
          <p className="uk-text"><span className="uk-text-bold ">Ticket Number(s):</span> {application.ticket ? application.ticket : "N/A"}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    token: state.auth.token,
    currentApplication: state.applications.currentApplication
  }
}
export default connect(mapStateToProps, { editApplication, reset })(ApplicationView)
