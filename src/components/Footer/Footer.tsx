import { IFooterProps } from "./Footer.d";
import FacabookIcon from "@/components/AppIcons/FacebookIcon";
import LinkedinIcon from "@/components/AppIcons/LinkedinIcon";

import Icon from "@/components/ui/Icon";
import footerLogo from "../../assets/images/footer-logo.png";
import instaIcon from "../../assets/images/insta-icon.png";

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
    <footer
      id="footer-content"
      className="font-Roboto z-10 bg-primary text-white"
    >
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
        <p className="mt-4 self-center text-base font-medium md:ml-[130px]">
          {copyright.replace("{{year}}", currentYear)}
        </p>
        <div className="mt-[46px] flex justify-start md:mr-[130px] md:mt-[14.5px] md:justify-end">
          <div className="flex w-32 justify-between">
            <a data-testid="social-icon" href="#" target="_blank">
              <Icon src={<FacabookIcon />} />
            </a>
            <a data-testid="social-icon" href="#" target="_blank">
              <Icon className="h-[35px] w-[35px]" src={instaIcon} />
            </a>
            <a data-testid="social-icon" href="#" target="_blank">
              <Icon src={<LinkedinIcon />} />
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
        <div className="flex flex-row justify-between md:ml-[130px] md:max-w-[270px] md:gap-x-6">
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
      </div>
    </footer>
  );
};

export default Footer;
