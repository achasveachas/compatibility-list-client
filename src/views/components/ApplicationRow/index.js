import React from 'react'
import { NavLink } from 'react-router-dom'

function ApplicationRow(props){
  const handleClick = () => props.onClick(props.application.id)

  return (
        <tr>
          <td>{props.application.software}</td>
          <td>{props.application.gateway}</td>
          <td>{props.application.omaha ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.nashville ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.north ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.buypass ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.elavon ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.tsys ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.other ? <span>&#x2713;</span> : <span> </span>}</td>
          <td>{props.application.notes}</td>
          <td onClick={handleClick}><NavLink to="/application" className="uk-button uk-button-default">View</NavLink></td>
        </tr>)
}
export default ApplicationRow
