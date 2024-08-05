my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/           // 이미지, 폰트, 스타일 등 정적 파일
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   │       └── global.css
│   ├── components/       // 재사용 가능한 컴포넌트
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── chatbot/
│   │   │   └── Record_Modal.js
│   │   └── Button.js
│   ├── pages/            // 페이지별 컴포넌트
│   │   ├── HomePage.js
│   │   ├── AboutPage.js
│   │   └── ContactPage.js
│   ├── hooks/            // 커스텀 훅
│   │   └── useAuth.js
│   ├── contexts/         // Context API 관련 파일
│   │   └── AuthContext.js
│   ├── services/         // API 호출 등 비즈니스 로직
│   │   └── api.js
│   ├── utils/            // 유틸리티 함수
│   │   └── helpers.js
│   ├── redux/            // Redux 관련 파일
│   │   ├── actions/      // 액션 정의
│   │   │   └── authActions.js
│   │   ├── reducers/     // 리듀서 정의
│   │   │   └── authReducer.js
│   │   └─── store.js      // Redux 스토어 설정
│   ├── App.js            // 루트 컴포넌트
│   ├── index.js          // 엔트리 포인트
│   └── setupTests.js     // 테스트 설정 파일
├── .gitignore
├── package.json
└── README.md



React Project
│
├── contexts
│   │   (전역 상태 및 데이터 관리 - api)
│   └── ↓ ↓ ↓ (제공)
│
├── hooks
│   │   (재사용 가능한 로직)
│   └── ↓ ↓ (사용)
│
├── components
│   │   (재사용 가능한 UI 요소)
│   └── ↓ (조합)
│
└── pages
    │   (라우트별 페이지 컴포넌트)
    └── (최종 렌더링)