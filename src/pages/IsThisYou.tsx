import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const IsThisYou = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("pages.isThisYou.seo.title")}</title>
      </Helmet>

      <h1>Is This You?</h1>
    </div>
  );
};

export default IsThisYou;
