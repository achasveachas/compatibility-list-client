import React from 'react'

const DeleteApplicationButton = (props) => {
  return (
    <button
      className="uk-button uk-button-danger uk-button-small uk-position-bottom-center"
      onClick={props.onClick}>
      Delete Request
    </button>
  )
}

export default DeleteApplicationButton
