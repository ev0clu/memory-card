import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../assets/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright © Laszlo Kis {new Date().getFullYear()}</p>
      <a className="reflink" href="https://github.com/ev0clu" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
    </footer>
  );
};

export default Footer;
