import React from 'react';
import './Footer.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {
  return (
    <div>
      <div className="footer-basic">
        <div className="social_icon">
          <FacebookIcon />
          <YouTubeIcon />
          <TwitterIcon />
          <LinkedInIcon />
        </div>
        <footer>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="/">Contact Us</a>
            </li>
            <li className="list-inline-item">
              <a href="/">About Us</a>
            </li>
            <li className="list-inline-item">
              <a href="/">Subscribe</a>
            </li>
          </ul>
          <p className="copyright">Can Date © 2021</p>
        </footer>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Footer;
