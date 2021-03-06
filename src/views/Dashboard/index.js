import React, { Component} from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';

import { addApplication, clearCurrentApplication, gotApplications } from '../../redux/modules/Applications/actions'
import ApiServices from '../../redux/services/Api'
import ApplicationsTable from '../components/ApplicationsTable'
import NewApplicationButton from '../components/NewApplicationButton'
import ApplicationForm from '../components/Forms/application'
import Loading from '../Loading'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentApplication: null,
      modalIsOpen: false
    }

  }

  componentDidMount() {

    return ApiServices.get("/applications", this.props.token)
      .then(response => {
        this.props.gotApplications(response.applications)
      })
      .catch((errors) => {
        console.log(errors);
      })
  }

  openModal = () => this.setState({modalIsOpen: true})
  closeModal = () => this.setState({modalIsOpen: false})

  openApplicationForm = () => {
    this.props.clearCurrentApplication()
    this.openModal()
  }

  handleNewApplication = (data) => {
    return ApiServices.post("/applications", data, this.props.token)
      .then(response => {
        const { application } = response
        this.props.addApplication(application)
        this.props.reset('application')
        this.closeModal()
      })
      .catch((errors) => {
        console.log(errors)
        throw new SubmissionError(errors)
      })

  }

  getExcel = () => {
    return ApiServices.getExcel("/applications", this.props.token)
      .then(response => window.open(response.file))
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
    return (
      <div>
        <h1 className="uk-heading-line uk-text-center uk-padding"><span>Software Compatibility Requests</span></h1>
        <NewApplicationButton onClick={this.openApplicationForm} /><br/>
        {this.props.gettingApplications ? <Loading /> : <ApplicationsTable />}
        <NewApplicationButton onClick={this.openApplicationForm} />
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Modal"
          onRequestClose={this.closeModal}
          style={modalStyle}>
          <ApplicationForm onSubmit={this.handleNewApplication}/>
          <button type="button" className="uk-button uk-margin-top uk-margin-right uk-button-secondary uk-position-top-right" onClick={this.closeModal}>X</button>
        </Modal>

      </div>
    )}
  }

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    token: state.auth.token,
    currentApplication: state.applications.currentApplication,
    gettingApplications: state.applications.gettingApplications
  }
}
export default connect(mapStateToProps, { addApplication, gotApplications, clearCurrentApplication, reset })(Dashboard)
