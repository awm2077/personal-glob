import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Footer = ({ isDarkMode }) => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt="footer"
          className="w-36 mx-auto mb-2"
        />

        <div className="w-max flex items-center gap-2 mx-auto">
          <Image
            src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
            alt="mail"
            className="w-6"
          />
          yuduchen37@gmail.com
        </div>
      </div>

      <div className="text-center sm:flex items-center justify-between border-t-2 border-gray-400 mt-12 py-6 mx-[10%]">
        <p>&copy; 2025 Yudu Chen. All rights reserved.</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          <li>
            <a target="_blank" href="http://www.github.com/awm2077">
              GitHub
            </a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="https://x.com/chen_du59416">X</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
