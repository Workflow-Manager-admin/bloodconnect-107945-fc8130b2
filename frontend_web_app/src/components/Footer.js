import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer for BloodConnect — displays contact info and copyright.
 * Uses accent color for links, brand style.
 */
function Footer() {
  return (
    <footer className="bc-footer" role="contentinfo">
      <div>
        <span>
          <strong>BloodConnect</strong> &mdash; Save lives, connect communities.
        </span>
        <br />
        <span>
          Contact: <a href="mailto:info@bloodconnect.org" tabIndex={0}>info@bloodconnect.org</a>
        </span>
        <br />
        <span>
          &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
