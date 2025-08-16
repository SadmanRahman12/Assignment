import React from 'react';
import { Card, Image, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import profilePic from '../assets/My_pic.jpg';

const Profile = () => {
  const author = {
    fullName: 'Sadman Rahman Arnab',
    email: 'sadman.cse.20230104012@aust.edu',
    profilePicture: profilePic,
    dateOfJoining: '2025-08-16',
    bio: 'Passionate on tech enthusiast. I love coding and sharing knowledge with others. Always eager to learn new technologies and improve my skills.',
    social: {
      facebook: 'https://www.facebook.com/sadmanrahman.arnab.1/',
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/%C5%9Badman-rahman-%C3%A5rnab-83ba3a2a2/',
    },
    stats: {
      articles: 25,
      views: '3.2M',
      followers: '20k',
    },
  };

  return (
    <Card className="p-4">
      <Row>
        <Col md={4} className="text-center">
          <Image
            src={author.profilePicture}
            roundedCircle
            width={150}
            height={150}
            className="mb-3"
          />
          <h3>{author.fullName}</h3>
          <p className="text-muted">Author</p>
          <div className="d-flex justify-content-center mb-3">
            <a href={author.social.facebook} className="me-3"><FaFacebook size={24} /></a>
            <a href={author.social.twitter} className="me-3"><FaTwitter size={24} /></a>
            <a href={author.social.linkedin}><FaLinkedin size={24} /></a>
          </div>
        </Col>
        <Col md={8}>
          <h4>About Me</h4>
          <p>{author.bio}</p>
          <hr />
          <h5>Contact Information</h5>
          <p><strong>Email:</strong> {author.email}</p>
          <p><strong>Date of Joining:</strong> {author.dateOfJoining}</p>
          <hr />
          <Row className="text-center">
            <Col>
              <h5>{author.stats.articles}</h5>
              <p className="text-muted">Articles</p>
            </Col>
            <Col>
              <h5>{author.stats.views}</h5>
              <p className="text-muted">Views</p>
            </Col>
            <Col>
              <h5>{author.stats.followers}</h5>
              <p className="text-muted">Followers</p>
            </Col>
          </Row>
          <Button variant="primary" className="mt-3">Edit Profile</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;