import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/homepage/homepage.css';
import homepageImg from '../assets/images/homepageimg.jpg';
import ExplanationPage1 from '../assets/images/ExplanationPage1.png';
import ExplanationPage2 from '../assets/images/ExplanationPage2.png';
import YouTubeBackImg from '../assets/images/youtube_back_img.png';
import InStagramBackImg from '../assets/images/instagram_back_img.png';
import PlayStoreBackImg from '../assets/images/playstore_back_img.png';
import AppStoreBackImg from '../assets/images/appstore_back_img.png';
import NagnaeMascot from '../assets/images/nagnae_mococo.png';
import YouTubeLogoImg from '../assets/images/link_youtube_logo.png';
import InstagramLogoImg from '../assets/images/link_instagram_logo.png';


function HomePage() {
  const canvasRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const fadeRef1 = useRef(null);
  const fadeRef2 = useRef(null);
  const linkAllRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [slideInThreshold, setSlideInThreshold] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const { width, height } = windowDimensions;
    
    if (height <= 713) {
      setSlideInThreshold(600);
    } else if (width <= 566) {
      setSlideInThreshold(1200);
    } else if (width <= 920) {
      setSlideInThreshold(800);
    } else {
      setSlideInThreshold(1100);
    }
  }, [windowDimensions]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in2');
        } else {
          entry.target.classList.remove('fade-in2');
        }
      });
    }, options);

    const currentFadeRef1 = fadeRef1.current;
    const currentFadeRef2 = fadeRef2.current;

    if (currentFadeRef1) {
      observer1.observe(currentFadeRef1);
    }
    
    if (currentFadeRef2) {
      observer2.observe(currentFadeRef2);
    }

    return () => {
      if (currentFadeRef1) {
        observer1.unobserve(currentFadeRef1);
      }
      
      if (currentFadeRef2) {
        observer2.unobserve(currentFadeRef2);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      // 3번째 섹션에 도달했을 때 이미지 애니메이션 시작
      if (linkAllRef.current) {
        const images = linkAllRef.current.querySelectorAll('img');
        if (scrollPosition > slideInThreshold  && !hasAnimated) {
          images.forEach((img, index) => {
            setTimeout(() => {
              img.classList.add('animate');
            }, index * 400);
          });
          setHasAnimated(true);
        } else if (scrollPosition < slideInThreshold  && hasAnimated) {
          images.forEach((img) => {
            img.classList.remove('animate');
          });
          setHasAnimated(false);
        }
      }
    };
    
    const handleWheel = (e) => {
      e.preventDefault();
      const slowFactor = 3;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const newPosition = Math.min(Math.max(0, scrollPosition + e.deltaY / slowFactor), maxScroll);
      setScrollPosition(Math.max(0, newPosition));
      window.scrollTo(0, newPosition);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollPosition,hasAnimated,slideInThreshold]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const image = new Image();
    image.src = homepageImg;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let zoom = 1;
    let zoomDirection = 1;
    const zoomSpeed = 0.0005;
    const minZoom = 1;
    const maxZoom = 1.2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const aspectRatio = image.width / image.height;
      let imgWidth = canvas.width * zoom;
      let imgHeight = imgWidth / aspectRatio;

      if (imgHeight < canvas.height) {
        imgHeight = canvas.height * zoom;
        imgWidth = imgHeight * aspectRatio;
      }

      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;

      ctx.drawImage(image, x, y, imgWidth, imgHeight);

      zoom += zoomSpeed * zoomDirection;
      if (zoom >= maxZoom) {
        zoomDirection = -1;
      } else if (zoom <= minZoom) {
        zoomDirection = 1;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    image.onload = () => {
      animate();
    };

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <article className="contents">
      <section className="screen-all">
        <div className="screen">
          <div className="simple-introduce-box">
            <p className="si-1">A warm companion for those starting a new life in Korea</p>
            <p className="si-2">NAGNAE</p>
            <a href="/chatbotpage" className="start-btn">▶ START</a>
          </div>
        </div>
      </section>
      <section className="screen2" style={{ transform: `translateY(${Math.max(0, 100 - scrollPosition / 5)}%)` }}>
        <div className="simple-introduce-box2">
          <div ref={fadeRef1} className='main-explanation-1 fade-element'>
            <img src={ExplanationPage1} alt="설명 이미지1" className="main-explanation-1-1"/>
            <span className="main-explanation-1-2">
              <p className="main-explanation-1-2-big-writing">Provides you with information related to various laws</p>
              <p className="main-explanation-1-2-small-writing">Did you want to get information about Korean law, but had a hard time because it was written in difficult words? Don't worry anymore. The NAGNAE is with you.
              NAGNAE provides various languages through AI.</p>
            </span>
          </div>
          <div ref={fadeRef2} className="main-explanation-2 fade-element2">
            <span className="main-explanation-2-2">
              <p className="main-explanation-2-2-big-writing">Provides you with information related to various laws</p>
              <p className="main-explanation-2-2-small-writing">Did you want to get information about Korean law, but had a hard time because it was written in difficult words? Don't worry anymore. The NAGNAE is with you.
              NAGNAE provides various languages through AI.</p>
            </span>
            <img src={ExplanationPage2} alt="설명 이미지2" className="main-explanation-2-1"/>
          </div>
        </div>
      </section>
      <section className={`screen3 ${scrollPosition > slideInThreshold ? 'slide-in' : ''}`}>
        <div className="slide-in-content">
          <div className='link-all' ref={linkAllRef}> 
            <a href='https://www.youtube.com/channel/UC0ePoqlReJuWcP1PVSkto6A'>
              <img src={YouTubeLogoImg} alt='youtube_logo_img' className='youtube-logo-img' />
              <img src= {YouTubeBackImg} alt='youtube_back_img' className='link-back-img-common youtube-back-img' />
            </a>
            <a>
              <img src={InstagramLogoImg} alt='instagram_logo_img' className='instagram-logo-img' />
              <img src= {InStagramBackImg} alt='instagram_back_img' className='link-back-img-common instagram-back-img' />
            </a>
            <a>
              <img src= {PlayStoreBackImg} alt='platstore_back_img' className='link-back-img-common playstore-back-img' />
            </a>
            <a>
              <img src= {AppStoreBackImg} alt='appstore_back_img' className='link-back-img-common appstore-back-img' />
            </a>
            <img src= {NagnaeMascot} alt='nagnae_mascot' className='nagnae-mascot-img' />
          </div>
        </div>
      </section>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </article>
  );
}

export default HomePage;