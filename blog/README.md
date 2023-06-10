# Justin blog

## 실행 방법

- 실행 시 `gatsby build` 로 빌드하고, `gatsby serve` 로 빌드된 결과물을 가상서버에서 실행하여 로컬호스트(포트 9000)에서 확인
- `gatsby build` 시 NODE_ENV=production 또는 development 로 옵션을 주어 `.env.production` 또는 `.env.development` 에 해당하는 환경변수 사용 가능

### 환경변수

- `GATSBY_STRAPI_API_URL`: 스트라피가 배포된 서버 주소
- `GATSBY_STRAPI_TOKEN`: 스트라피 어드민에서 얻을 수 있는 API TOKEN

## 할일들

- Gatsby의 buildtime rendering (SSG) 적용 [ ]
- Markdown newline style 적용 [ ]
