import '../styles/globals.css';
import Navbar from '../components/Navbar';
import BreadcrumbNav from '../components/BreadcurmbNav';
import {useState} from 'react'
import { useRouter } from 'next/router';
import Footer from "../components/Footer";
import FillerSection from "../components/FillerSection"; 
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import default styles or customize it

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  
  return (
    <>
      <Navbar />
    <BreadcrumbNav /> 
      <Component {...pageProps} />
      < FillerSection />
      <Footer />
    </>
  );
}

export default MyApp;
