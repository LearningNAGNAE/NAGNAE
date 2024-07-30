import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/homepage/homepage.css';
import homepageImg from '../assets/images/homepageimg.jpg';
import ExplanationPage1 from '../assets/images/ExplanationPage1.png';
import ExplanationPage2 from '../assets/images/ExplanationPage2.png';

function HomePage() {
  const canvasRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const fadeRef1 = useRef(null);
  const fadeRef2 = useRef(null);
  const fadeRef3 = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    // 두 개의 IntersectionObserver 인스턴스 생성
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

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
        } else {
          entry.target.classList.remove('slide-in');
        }
      });
    }, options);

    // 각 ref 요소를 관찰
    const currentFadeRef1 = fadeRef1.current;
    const currentFadeRef2 = fadeRef2.current;
    const currentFadeRef3 = fadeRef3.current;

    if (currentFadeRef1) {
      observer1.observe(currentFadeRef1);
    }
    
    if (currentFadeRef2) {
      observer2.observe(currentFadeRef2);
    }

    if (currentFadeRef3) {
      observer3.observe(currentFadeRef3);
    }

    // 컴포넌트 언마운트 시 관찰 중지
    return () => {
      if (currentFadeRef1) {
        observer1.unobserve(currentFadeRef1);
      }
      
      if (currentFadeRef2) {
        observer2.unobserve(currentFadeRef2);
      }

      if (currentFadeRef3) {
        observer3.unobserve(currentFadeRef3);
      }
    };
  }, []);

  useEffect(() => {

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      // 스크롤 속도 조절 (숫자가 클수록 느려짐)
      const slowFactor = 3;
      
      const newPosition = scrollPosition + e.deltaY / slowFactor;
      setScrollPosition(Math.max(0, newPosition));
      
      window.scrollTo(0, newPosition);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollPosition]);

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

      // Zoom 값을 자연스럽게 증가 및 감소하도록 변경
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
      <section ref={fadeRef3} className="screen3 fade-element3" style={{ transform: `translateY(${Math.max(0, 200 - scrollPosition / 5)}%)` }}>
        <div className="slide-in-content">
          <p>This is the new content that slides in from the left.</p>
        </div>
      </section>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </article>
  );
}

export default HomePage;
