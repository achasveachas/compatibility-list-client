import React from 'react'

const EditApplicationButton = (props) => {
  return (
    <button
      className="uk-button uk-button-primary uk-button-small uk-margin uk-margin-top uk-margin-right"
      onClick={props.onClick}>
      Edit
    </button>
  )
}

export default EditApplicationButton
