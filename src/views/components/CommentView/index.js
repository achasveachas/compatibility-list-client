import React from 'react'

function CommentView(props){

  return (
    <div>
      <span className="uk-text uk-text-small uk-text-bold">{props.comment.user} added at: {new Date(props.comment.created_at).toLocaleDateString()}</span><br/>
      {props.comment.body}
      <div className="uk-divider-icon" />
    </div>
  )
}
export default CommentView
