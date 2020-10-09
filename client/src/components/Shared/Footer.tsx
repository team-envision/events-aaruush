import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { IconType } from "react-icons";

import logo from "../../assets/Shared/envisionLogo.png";

interface Sitemap {
  name: string;
  to: string;
}

interface Socials {
  icon: IconType;
  href: string;
}

const Footer = () => {
  const sitemapOne: Sitemap[] = [
    {
      name: "About Us",
      to: "https://aaruush.org/about-us",
    },
    {
      name: "Flagships",
      to: "https://aaruush.org/flagships",
    },
    // {
    //   name: "Highlights",
    //   to: "https://aaruush.org/",
    // },
    {
      name: "Events",
      to: "https://aaruush.org/events",
    },
    // {
    //   name: "T-Summit",
    //   to: "https://aaruush.org/",
    // },
    {
      name: "Orchestrate",
      to: "https://aaruush.org/orchestrate",
    },
  ];

  const sitemapTwo: Sitemap[] = [
    {
      name: "Blogs",
      to: "https://aaruush.org/blogs",
    },
    {
      name: "Campus Ambassador",
      to: "https://aaruush.org/campus-ambassador",
    },
    {
      name: "Sponsors & Partners",
      to: "https://aaruush.org/sponsors",
    },
    {
      name: " Team",
      to: "https://aaruush.org/team",
    },
  ];

  const sitemapThree: Sitemap[] = [
    {
      name: "Be a Campus Ambassador",
      to: "https://aaruush.org/campus-ambassador",
    },
    {
      name: "Sponsor Us",
      to: "https://aaruush.org/contact-us",
    },
    {
      name: "Partner for an Initiative",
      to: "https://aaruush.org/contact-us",
    },
  ];

  const socials: Socials[] = [
    {
      icon: FaTwitter,
      href: "https://twitter.com/aaruushsrmist",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/aaruush_srm",
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/aaruush.srm/",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/channel/UC6mwWpwkZchii-oyWz0v3dw",
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/aaruush-srm-ist/mycompany/",
    },
  ];

  return (
    <div className="w-full bg-black py-10 text-white">
      <div className="flex flex-wrap w-10/12 mx-auto">
        <div className="flex flex-wrap w-full lg:w-1/5 mx-auto mb-auto mt-5 lg:mt-0">
          <h3 className="w-full text-3xl mb-6">Aaruush</h3>
          <ul className="w-full">
            {sitemapOne.map((redirect, index) => (
              <li key={index}>
                <a href={redirect.to} target="_blank" rel="noopener noreferrer">
                  {redirect.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap w-full lg:w-1/5 mx-auto mt-5 lg:mt-0">
          <h3 className="hidden lg:block w-full text-3xl mb-6"> </h3>
          <ul className="w-full">
            {sitemapTwo.map((redirect, index) => (
              <li key={index}>
                <a href={redirect.to} target="_blank" rel="noopener noreferrer">
                  {redirect.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap w-full lg:w-1/5 mx-auto mb-auto mt-5 lg:mt-0">
          <h3 className="w-full text-3xl mb-6">Join Us</h3>
          <ul className="w-full mb-auto">
            {sitemapThree.map((redirect, index) => (
              <li key={index}>
                <a href={redirect.to} target="_blank" rel="noopener noreferrer">
                  {redirect.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/5 mx-auto mb-auto mt-5 lg:mt-0">
          <h3 className="w-full text-3xl mb-6">Contact Us</h3>
          <ul className="w-full m-auto">
            <li>
              <a href="mailto:sec@aaruush.org">sec@aaruush.org</a>
            </li>
            <li>
              <a href="tel:9140808656">Karan : +91 91408 08656</a>
            </li>
            <li>
              <a href="tel:8490877095">Harsh: +91 84908 77095</a>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/5 mx-auto mb-auto mt-5 lg:mt-0">
          <h3 className="w-full text-3xl mb-6">Reach Us</h3>
          <div className="flex flex-wrap w-full mx-auto">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap w-8 md:w-10 h-8 md:h-10 mx-auto rounded-md"
              >
                <social.icon className="text-3xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full mt-10 text-gray-500">
        <div className="flex flex-wrap mx-auto">
          <div className="w-full sm:w-auto text-center lg:text-right mt-auto">
            Contact & Services
          </div>
          <div className="w-64 mx-auto sm:mx-5">
            <img src={logo} alt="envision" />
          </div>
          <div className="w-full sm:w-auto text-center lg:text-right mt-auto">
            © Team Envision
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
