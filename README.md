# 🌍 World Dashboard

전 세계 국가들의 현재 날씨 정보를 확인할 수 있는 대시보드 애플리케이션입니다.

## ✨ 주요 기능

- **국가 목록 조회**: 추천 국가 및 전체 국가 목록을 제공합니다.
- **국가 검색**: 원하는 국가를 이름으로 검색할 수 있습니다.
- **날씨 정보 확인**: 선택한 국가의 현재 기온, 습도, 풍속 등 상세한 날씨 정보를 표시합니다.
- **주간 예보**: 앞으로 7일간의 최고/최저 기온 및 강수량 예보를 차트로 보여줍니다.
- **테마 변경**: 라이트 모드와 다크 모드를 지원합니다.

## 🛠️ 기술 스택

- **프레임워크**: Next.js (React)
- **스타일링**: Tailwind CSS, shadcn/ui
- **데이터 시각화**: Recharts
- **API**
  - [REST Countries](https://restcountries.com/): 국가 정보
  - [Open-Meteo](https://open-meteo.com/): 날씨 정보

## 🚀 시작하기

### 1. 프로젝트 복제

```bash
git clone https://github.com/your-username/world-dashboard.git
cd world-dashboard
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.
