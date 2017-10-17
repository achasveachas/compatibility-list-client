import React from 'react'

const ExportToExcelButton = (props) => {
  return (
    <button
    className="uk-button uk-button-secondary uk-margin-medium uk-margin-left"
    onClick={props.onClick}>
      Export To Excel
    </button>
  )
}

export default ExportToExcelButton
