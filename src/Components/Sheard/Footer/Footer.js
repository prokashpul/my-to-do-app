import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by TodoApp
        </p>
      </div>
    </footer>
  );
};

export default Footer;
