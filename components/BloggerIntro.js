import { Row, Col, Media, Image } from "react-bootstrap"

export default function BloggerIntro() {
  return (
    <Row>
      <Col md="8">
        <Media className="mb-4 admin-intro">
          <Image roundedCircle width={64} height={64} className="mr-3" src="https://pbs.twimg.com/profile_images/1287002918239916032/3EN5YjPM_400x400.jpg" alt="Generic placeholder" />
          <Media.Body>
            <h5 className="font-weight-bold mb-0">Hey there, this is Janelle Tamayo.</h5>
            <p className="welcome-text">I write to recall stuff, nothing fancy. So curious that it landed me a title of an entry level developer</p>
          </Media.Body>
        </Media>
      </Col>
    </Row>
  )
}
