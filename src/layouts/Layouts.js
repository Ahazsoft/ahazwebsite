import { useEffect } from "react";
import Head from "next/head";
import appData from "@data/app.json";
import Footer from "./footers/Index";
import Header from "./headers/Index";
import Preloader from "./Preloader";

import dynamic from "next/dynamic";
const SplitScrollAnimation = dynamic( () => import("@components/SplitScrollAnimation"), { ssr: false } );

const Layouts = ({
  children,
  header,
  footer,
  noHeader,
  noFooter,
  darkHeader,
  cartButton
}) => {
  useEffect(() => {
    // preloader
    if (typeof window !== 'undefined') {
      document.querySelector('body').classList.remove('ahaz--noscroll');
      const loader = document.getElementsByClassName('preloader');

      if (loader[0] && appData.settings.preloader){
        setTimeout(function(){
          loader[0].classList.add('closed');
          document.querySelector('body').classList.add('animated--swiper--active');
          loader[0].querySelector('.preloader__spinner').style.opacity = 0;
        }, 500);
        setTimeout(function(){
          loader[0].classList.add('loaded');
          document.querySelector('body').classList.add('animated--active');
        }, 1500);
      } else {
        loader[0].classList.add('loaded');
        document.querySelector('body').classList.add('animated--swiper--active');
        document.querySelector('body').classList.add('animated--active');
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Custom Software & Web Development in Ethiopia | Ahaz</title>
        <meta
          name="description"
          content="Ahaz builds custom software, websites, and digital solutions for businesses in Ethiopia. We create scalable, high-performance systems tailored to your goals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={noFooter ? "ahaz-page" : `ahaz-page footer--fixed`}>
        <Preloader />

        {!noHeader && (
          <Header
            header={2}
            darkHeader={darkHeader}
            cartButton={cartButton}
          />
        )}

        {/* Wrapper */}
		    <div className="wrapper">
          {children}
        </div>

        {!noFooter && <Footer footer={2} />}

        <SplitScrollAnimation />
      </div>
    </>
  );
};
export default Layouts;
