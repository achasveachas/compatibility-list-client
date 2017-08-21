import React from 'react'

function ApplicationRow(props){
  const handleClick = () => props.onClick(props.application.id)

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
          <td onClick={handleClick}>{props.application.source}</td>
          <td onClick={handleClick}>{new Date(props.application.updated_at).toLocaleDateString()}</td>
        </tr>)
}
export default ApplicationRow
