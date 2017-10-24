import React from 'react'

const NewApplicationButton = (props) => {
  return (
    <button
    className="uk-button uk-button-primary uk-margin-medium uk-margin-left"
    onClick={props.onClick}>
      Edit
    </button>
  )
}

export default NewApplicationButton
