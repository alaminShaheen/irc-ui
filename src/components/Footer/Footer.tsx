import { IFooterProps } from "./Footer.d";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import Icon from "@/components/ui/Icon";
import Logo from "../AppIcons/Logo";

const Footer = ({ content }: IFooterProps) => {
  const { poweredBy, body, privacyPolicy, copyright, logoAltText } = content;
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer id="footer-content" className="font-Roboto bg-primary text-white">
      <div className="pt-[51px] max-sm:px-4 max-sm:pb-[62px] sm:max-md:px-8 sm:max-md:pb-[67px] md:pb-[54px] md:pt-[92px]">
        <p className="text-left text-sm font-light text-primary-25 md:ml-[156px]">
          {poweredBy}
        </p>
        {/* <img
          className="mt-1 h-[39px] w-[302px] md:ml-[151px] md:h-[49px] md:w-[377px]"
          src={logo}
          alt={logoAltText}
        /> */}
        {/* <span className="ml-[151px]"> */}
        <Icon
          className="md:ml-[151px]"
          src={<Logo />}
          alt={logoAltText}
          size={200}
        />
        {/* </span> */}

        <p className="mt-5 text-start text-sm font-normal md:ml-[156px] md:mr-[152px] md:text-lg lg:mt-4">
          {body}
        </p>
        <div className="mt-[47.5px] flex justify-start md:mr-[130px] md:justify-end">
          <div className="flex w-28 justify-evenly">
            <a href="#" target="_blank">
              <div className="flex h-6 w-6 items-end justify-center rounded-full bg-white text-primary">
                <FaFacebookF size={20} />
              </div>
            </a>
            <a href="#" target="_blank">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-graphite-600">
                <FaInstagram />
              </div>
            </a>
            <a href="#" target="_blank">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-graphite-600">
                <FaXTwitter />
              </div>
            </a>
          </div>
        </div>

        <div className="mt-7 md:ml-[134px] md:mr-[130px] md:mt-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1176 1"
            fill="none"
            className="h-auto w-full"
          >
            <path d="M0 0.5H1176" stroke="white" />
          </svg>
        </div>

        <div className="flex justify-between md:mr-[137.88px] md:pl-[144px]">
          <a
            className="mt-[27px] text-base font-normal text-white underline decoration-white underline-offset-4 md:mt-[23.5px] md:text-lg"
            href=""
            target="_blank"
          >
            {privacyPolicy}
          </a>
          <p className="mt-[27px] text-base font-medium md:mt-[33px]">
            {copyright.replace("{{year}}", currentYear)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
