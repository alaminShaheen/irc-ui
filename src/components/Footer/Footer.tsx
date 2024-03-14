import { useTranslation } from "react-i18next";

import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import socialMedia from "@/assets/socialMedia.svg";
import logo from "@/assets/logo.svg";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-content" className="bg-primary text-white font-Roboto">
      <div className="pt-[51px] max-sm:px-4 sm:max-md:px-8 max-sm:pb-[62px] sm:max-md:pb-[67px] md:pt-[92px] md:pb-[54px]">
        <p className="text-sm text-left text-primary-25 font-light md:ml-[156px]">
          {t("common.poweredBy")}
        </p>
        <img
          className="w-[302px] h-[39px] md:w-[377px] md:h-[49px] mt-1 md:ml-[151px]"
          src={logo}
          alt="Logo"
        />

        <p className="text-sm md:text-lg mt-5 lg:mt-4 md:ml-[156px] md:mr-[152px] text-start font-normal">
          {t("common.footerBody")}
        </p>
        {/* <div className="flex justify-start md:justify-end mt-[47.5px] md:mr-[130px]">
          <a href="" target="_blank">
            <img
              className="w-[128px] h-[33.49px]"
              src={socialMedia}
              alt="Social Media"
            />
          </a>
        </div> */}
        <div className="flex justify-start md:justify-end mt-[47.5px] md:mr-[130px]">
          <div className="flex justify-evenly w-28">
            <a href="#" target="_blank">
              <div className="bg-white text-primary w-6 h-6 flex justify-center items-end rounded-full">
                <FaFacebookF size={20} />
              </div>
            </a>
            <a href="#" target="_blank">
              <div className="bg-white text-graphite-600 w-6 h-6 flex justify-center items-center rounded-full">
                <FaInstagram />
              </div>
            </a>
            <a href="#" target="_blank">
              <div className="bg-white text-graphite-600 w-6 h-6 flex justify-center items-center rounded-full">
                <FaXTwitter />
              </div>
            </a>
          </div>
        </div>

        <div className="mt-7 md:mt-3 md:ml-[134px] md:mr-[130px] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1176 1"
            fill="none"
            className="w-full h-auto"
          >
            <path d="M0 0.5H1176" stroke="white" />
          </svg>
        </div>

        <div className="flex justify-between md:pl-[144px] md:mr-[137.88px]">
          <a
            className="mt-[27px] md:mt-[23.5px] text-base md:text-lg text-white font-normal underline underline-offset-4 decoration-white"
            href=""
            target="_blank"
          >
            {t("common.privacyPolicy")}
          </a>
          <p className="mt-[27px] md:mt-[33px] text-base font-medium">
            {t("common.copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
