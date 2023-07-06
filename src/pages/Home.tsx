import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
        {t('title')}
        {/* PLACEHOLDER */}
    </div>
  )
  // TODO: Build Home Screen. Add recipes list
};

export default Home;
