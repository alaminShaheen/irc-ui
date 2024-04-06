import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import Button from "@/components/ui/Button";
import { IconPosition } from "@/models/enums/ButtonVariant";

const IsThisYou = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet title={t("pages.isThisYou.seo.title")} />

      <h1>Is This You?</h1>
      <section>
        <Button
          className="flex gap-x-2"
          icon={<IsThisYou />}
          iconPosition={IconPosition.LEFT}
        >
          Back to sign up jsahd
        </Button>
      </section>
    </div>
  );
};

export default IsThisYou;
