import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'

const KarmaStory = (props) => (
  <div className="karma-story">
    <Avatar
      style={props.styles}
      className="helperAvatar"
      src={props.story && props.story.offUser.picture}/>
    <p>{`${props.story.offUser.name} helped ${props.story.req.reqUser.name}`}</p>
    <Avatar
      style={props.styles}
      className="requesterAvatar"
      src={props.story.req.reqUser.picture}/>
    <p>{props.story.date}</p>
    <p>{props.story.req.title}</p>
    <FlatButton className="likes" label="Like" labelColor="#533BD7"/>
  </div>
)

KarmaStory.propTypes = {
  styles: PropTypes.object,
  story: PropTypes.object
}

export default KarmaStory
