import React from 'react'

function ApplicationRow(props){
  const handleClick = () => props.onClick(props.application.id)
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this application?\nThis action can not be undone.")) {
      props.onDelete(props.application.id)
    }
  }

  return (
        <tr>
          <td onClick={handleClick}>{props.application.software}</td>
          <td onClick={handleClick}>{props.application.gateway}</td>
          <td onClick={handleClick}>{props.application.omaha ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.nashville ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.north ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.buypass ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.elavon ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.tsys ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.other ? <span>&#x2713;</span> : <span> </span>}</td>
          <td onClick={handleClick}>{props.application.notes}</td>
          <td><button className="uk-button uk-button-danger uk-button-small" onClick={handleDelete}>Delete</button></td>
        </tr>)
}
export default ApplicationRow
