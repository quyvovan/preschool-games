import dynamic from 'next/dynamic';

const LazyLandingMainPageContainer = dynamic(
  () =>
    import('@/containers/landing-home').then(
      (mod) => mod.LandingMainPageContainer
    ),
  { ssr: false }
);
const LandingWelcomePage = () => {
  return <LazyLandingMainPageContainer />;
};

export default LandingWelcomePage;
