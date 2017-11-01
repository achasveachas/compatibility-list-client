import React, { Component} from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { editApplication, deleteApplication } from '../../redux/modules/Applications/actions'
import ApiServices from '../../redux/services/Api'
import ApplicationForm from '../components/Forms/application'
import EditApplicationButton from '../components/EditApplicationButton'
import CommentView from '../components/CommentView'
import DeleteApplicationButton from '../components/DeleteApplicationButton'

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
    return ApiServices.patch("/applications/" + this.props.currentApplication.id, data, this.props.token)
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

  handleDelete = () => {
    const app_id = this.props.currentApplication.id
    if (confirm("Are you sure you want to delete this application?\nThis action can not be undone.")) {
      return ApiServices.delete("/applications/" + app_id, this.props.token)
        .then(() => {
          this.props.deleteApplication(app_id)
        })
        .then(() => this.props.history.push("/dashboard"))
        .catch((errors) => {
          console.log(errors);
        })
    }
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

    const RenderedComments = application.comments.sort((a, b) => b.id - a.id)
      .map((comment, index) => <CommentView key={index} comment={comment} />)

    return (
      <div>
        <h1 className="uk-heading-line uk-text-center uk-padding"><span>{ application.software }</span></h1>
        <p className="uk-text-large uk-text-center"><span className="uk-text-bold ">Works with the following gateway(s):</span> {application.gateway ? application.gateway : "N/A"}</p>
        <p className="uk-text-large uk-text-center"><span className="uk-text-bold ">Through the following front-end(s):</span> {frontEnds.length > 0 ? frontEnds.join(", ") + "." : "N/A"}</p>
        <p className="uk-text uk-text-center"><span className="uk-text-bold ">Source:</span> {application.source ? application.source : "N/A"}</p>
        <p className="uk-text uk-text-center"><span className="uk-text-bold ">Ticket Number(s):</span> {application.ticket ? application.ticket : "N/A"}</p>
        <h3 className="uk-heading-line uk-text-center uk-padding uk-text-center"><span>Notes:</span></h3>
        
        <div className="uk-text uk-text-center">{RenderedComments}</div>
        <div className="uk-margin-auto">
          {this.props.currentUser.admin ? <EditApplicationButton onClick={this.openApplicationForm} /> : null}
          {this.props.currentUser.admin ? <DeleteApplicationButton onClick={this.handleDelete} /> : null}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Modal"
          onRequestClose={this.closeModal}
          style={modalStyle}>
          <ApplicationForm onSubmit={this.handleEditApplication} />
          <button type="button" className="uk-button uk-margin-top uk-margin-right uk-button-secondary uk-position-top-right" onClick={this.closeModal}>X</button>
        </Modal>
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
export default withRouter(connect(mapStateToProps, { editApplication, deleteApplication, reset })(ApplicationView))
