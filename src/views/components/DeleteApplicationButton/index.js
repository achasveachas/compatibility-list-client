import React from 'react'

const DeleteApplicationButton = (props) => {
  return (
    <button
      className="uk-button uk-button-primary uk-margin-medium uk-margin-left"
      onClick={props.onClick}>
      Delete Request
    </button>
  )
}

export default DeleteApplicationButton
