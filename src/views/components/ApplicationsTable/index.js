import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { reset, SubmissionError } from 'redux-form';

import { gotApplications, setCurrentApplication, deleteApplication, editApplication } from '../../../redux/modules/Applications/actions'
import ApiServices from '../../../redux/services/Api'
import ApplicationRow from '../ApplicationRow'
import DeleteApplicationButton from '../DeleteApplicationButton'
import ApplicationForm from '../../components/Forms/application'


class ApplicationsTable extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modalIsOpen: false,
      filter: ""
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

  setApplication = (id) => this.props.setCurrentApplication(id)
  openModal = () => this.setState({modalIsOpen: true})
  closeModal = () => this.setState({modalIsOpen: false})

  handleRowClick = (id) => {
    this.setApplication(id)
    this.openModal()
  }


  removeItem = (app_id) => {
    return ApiServices.delete("/applications/" + app_id, this.props.token)
      .then(() => {
        this.props.deleteApplication(app_id)
      })
      .then(() => this.closeModal())
      .catch((errors) => {
        console.log(errors);
      })
  }

  handleDelete = () => {
    if (confirm("Are you sure you want to delete this application?\nThis action can not be undone.")) {
      this.removeItem(this.props.currentApplication.id)
    }
  }

  handleUpdateApplication = (data) => {
    const app_id = this.props.currentApplication.id
    return ApiServices.patch("/applications/" + app_id, data, this.props.token)
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

  filteredApplications = () => {
    const filter = this.state.filter
    if (filter && filter.length > 0) {
      return this.props.applications.filter(app => app.software.toLowerCase().includes(filter.toLowerCase()))
    } else {
      return this.props.applications
    }
  }

  handleFilterChange = (event) => this.setState({filter: event.target.value})

  render() {

    let RenderedRows = <tr><td className="uk-text-bold uk-text-muted uk-text-center">No Applications Match The Current Criteria </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>

    if (this.filteredApplications().length > 0) {

      RenderedRows = this.filteredApplications()
          .sort((a, b) => {
              const softwareA = a.software.toUpperCase()
              const softwareB = b.software.toUpperCase()
              if (softwareA < softwareB) {
                  return -1
              }
              if (softwareA > softwareB) {
                  return 1
              }
              return 0
          })
        .map((app, index) => <ApplicationRow key={index} application={app} onClick={this.handleRowClick}/>)
    }

    const modalStyle = {
      overlay: {
        "position": "absolute",
        "overflow": "auto",
        "minHeight": "825px",
      }
    }

    return (
      <div className="uk-overflow-auto">
        {this.props.applications.length > 0 ?
          <div>
            <form>
              <div className="uk-margin-left">
                <input
                  className="uk-input uk-width-medium"
                  type="text"
                  placeholder="Filter By Software Name"
                  value={this.state.filter}
                  onChange={this.handleFilterChange}
                />
              </div>
            </form>
            <table className="uk-table uk-table-hover uk-table-divider">
              <thead>
                <tr>
                  <th className="uk-table-middle">Software</th>
                  <th className="uk-table-middle">Gateway</th>
                  <th className="uk-table-shrink uk-table-middle">Omaha</th>
                  <th className="uk-table-shrink uk-table-middle">Nashville</th>
                  <th className="uk-table-shrink uk-table-middle">North</th>
                  <th className="uk-table-shrink uk-table-middle">Buypass</th>
                  <th className="uk-table-shrink uk-table-middle">Elavon</th>
                  <th className="uk-table-shrink uk-table-middle">TSYS</th>
                  <th className="uk-table-shrink uk-table-middle">Other</th>
                  <th className="uk-table-expand uk-table-middle">Notes</th>
                  <th className="uk-table-expand uk-table-middle">Source</th>
                  <th className="uk-table-shrink uk-table-middle">Last Updated At:</th>
                </tr>
              </thead>
              <tbody>
                {RenderedRows}
              </tbody>

            </table>
          </div>
        :
          <div>
            <h2 className="uk-heading-line uk-text-center uk-text-capitalize"><span>There are no Compatibility Requests at this time</span></h2>
            <h3 className="uk-heading-line uk-text-center uk-text-capitalize"><span>Click on the "New Request" button to add a new application</span></h3>
          </div>
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Modal"
          onRequestClose={this.closeModal}
          style={modalStyle}>
          <ApplicationForm onSubmit={this.handleUpdateApplication}/>
          <button type="button" className="uk-button uk-margin-top uk-margin-right uk-button-secondary uk-position-top-right" onClick={this.closeModal}>X</button>
          {this.props.currentUser.admin ?
            <DeleteApplicationButton onClick={this.handleDelete} />
            :
            null
          }
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applications.applications,
    currentApplication: state.applications.currentApplication,
    currentUser: state.auth.currentUser,
    token: state.auth.token
  }
}


export default connect(mapStateToProps, { gotApplications, setCurrentApplication, deleteApplication, editApplication, reset })(ApplicationsTable)
