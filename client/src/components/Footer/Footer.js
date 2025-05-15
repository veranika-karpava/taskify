import React from 'react';

import { FOOTER_TITLE } from '../../data/constants.js';

import './Footer.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon.js';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        {FOOTER_TITLE.RIGHT}
        <span className='footer__icon-wrapper'>
          <DynamicIcon name='FaHeart' className='footer__icon' />
        </span>
        {FOOTER_TITLE.LEFT}
      </p>
    </footer>
  );
};

export default Footer;
