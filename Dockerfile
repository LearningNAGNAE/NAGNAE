# 1. Node.js를 사용하여 애플리케이션을 빌드
FROM node:18 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 5. Nginx를 사용하여 정적 파일을 서빙
FROM nginx:alpine

# 6. 빌드된 파일을 Nginx 컨테이너로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 7. Nginx가 3000번 포트에서 리스닝하도록 설정
EXPOSE 3000

# 8. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]