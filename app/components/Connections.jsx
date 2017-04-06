import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

const Connections = props => {
  const user = props.user
  const connectionsObj = user ? user.network : {}
  let connections = []

  for (let key in connectionsObj) connections.push(connectionsObj[key])

  return (
    <div>
      <div className="flex-row">
        <h1 className="feed-header">Connections</h1>
      </div>
      <Divider />
      { connections && connections.map(connection => (
          <div key={connection.uid}>
            <Row className="feed-story">
              <Col xs={4} sm={4} md={4} lg={4}>
                <Avatar className="feed-avatar" size={30} src={connection.picture} />
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                <Link to={`/profile/${connection.uid}`}>
                  <p className="p-color-white italic">
                    {connection.name}
                  </p>
                </Link>
              </Col>
            </Row>
            <Divider />
          </div>
        )) }
    </div>
  )
}

Connections.propTypes = {
  user: PropTypes.object.isRequired
}

export default Connections
