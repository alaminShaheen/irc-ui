import { IFooterProps } from "./Footer.d";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import Icon from "@/components/ui/Icon";
import footerLogo from "../../assets/images/footer-logo.png";

const Footer = ({ content }: IFooterProps) => {
  const {
    poweredBy,
    body,
    privacyPolicy,
    copyright,
    brokerWebPage,
    logoAltText,
  } = content;
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer id="footer-content" className="font-Roboto bg-primary text-white">
      <div className="pt-[51px] max-sm:px-[30px] max-sm:pb-[62px] sm:max-md:px-8 sm:max-md:pb-[67px] md:pb-[54px] md:pt-[92px]">
        <p className="text-left text-sm font-light text-primary-25 md:ml-[130px]">
          {poweredBy}
        </p>
        <Icon
          className="mt-1 h-[39px] w-[302px] md:ml-[128px] md:h-[49px] md:w-[377px]"
          src={footerLogo}
          alt={logoAltText}
        />
        <p className="mt-5 text-start text-sm font-normal md:ml-[130px] md:mr-[152px] md:text-lg lg:mt-4">
          {body}
        </p>
        <div className="mt-[47.5px] flex justify-start md:mr-[130px] md:justify-end">
          <div className="flex w-24 justify-between">
            <a href="#" target="_blank">
              <div className="flex h-6 w-6 items-end justify-center rounded-full bg-white text-primary">
                <FaFacebookF size={22} />
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
        <div className="mt-7 md:mx-[125px] md:mt-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1176 1"
            fill="none"
            className="h-auto w-full"
          >
            <path d="M0 0.5H1176" stroke="white" />
          </svg>
        </div>
        <div className="flex flex-col justify-between md:ml-[130px] md:mr-[130px] md:flex-row">
          <div className="flex justify-between md:basis-[55%]">
            <a
              className="mt-[27px] text-base font-normal text-white underline decoration-white underline-offset-4 md:mt-[23.5px] md:text-lg"
              href=""
              target="_blank"
            >
              {privacyPolicy}
            </a>
            <a
              className="mt-[27px] text-base font-normal text-white underline decoration-white underline-offset-4 md:mt-[23.5px] md:text-lg"
              href=""
              target="_blank"
            >
              {brokerWebPage}
            </a>
          </div>
          <p className="mt-[27px] self-center text-base font-medium md:mt-[23.5px]">
            {copyright.replace("{{year}}", currentYear)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
