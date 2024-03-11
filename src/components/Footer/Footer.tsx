import socialMedia from "../../assets/socialMedia.svg";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer id="footer-content" className="bg-primary text-white font-Roboto">
      <div className="pt-[51px] max-sm:px-4 sm:max-md:px-8 max-sm:pb-[62px] sm:max-md:pb-[67px] md:pt-[92px] md:pb-[54px]">
        <p className="text-sm text-left text-primary-25 font-light md:ml-[156px]">
          Powered by:
        </p>
        <img
          className="w-[302px] h-[39px] md:w-[377px] md:h-[49px] mt-1 md:ml-[151px]"
          src={logo}
          alt="Logo"
        />

        <p className="text-sm md:text-lg mt-5 lg:mt-4 md:ml-[156px] md:mr-[152px] text-start font-normal">
          Instant Risk Coverage is a trademark of Instant Risk Coverage Inc.
          Refer to your policy for the most detailed and accurate information
          about your coverage and terms of insurance. Your policy, which serves
          as your insurance contract, will always prevail if there's ever a
          conflict with the information found on this site.
        </p>
        <div className="flex justify-start md:justify-end mt-[47.5px] md:mr-[130px]">
          <a href="" target="_blank">
            <img
              className="w-[128px] h-[33.49px]"
              src={socialMedia}
              alt="Social Media"
            />
          </a>
        </div>
        <div className="mt-[38.5px] md:mt-3 md:ml-[134px] md:mr-[130px] ">
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
            Privacy policy
          </a>
          <p className="mt-[27px] md:mt-[33px] text-base font-medium">
            © 2022 instantriskcoverage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
