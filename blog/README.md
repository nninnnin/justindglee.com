# Justin blog

## 소개

개발자 이동규의 블로그 입니다.

## 실행 방법

- 실행 시 `gatsby build` 로 빌드하고, `gatsby serve` 로 빌드된 결과물을 가상서버에서 실행하여 로컬호스트(포트 9000)에서 확인
- `gatsby build` 시 NODE_ENV=production 또는 development 로 옵션을 주어 `.env.production` 또는 `.env.development` 에 해당하는 환경변수 사용 가능

- `/___graphiql` 에서 쿼리테스트 가능, strapi와의 연동으로 strapi document node 또한 쿼리할 수 있습니다.

### 환경변수

- `GATSBY_STRAPI_API_URL`: 스트라피가 배포된 서버 주소
- `GATSBY_STRAPI_TOKEN`: 스트라피 어드민에서 얻을 수 있는 API TOKEN
- `AWS_ACCESS_KEY_ID`: S3 access key id
- `AWS_SECRET_ACCESS_KEY`: S3 secret access key

## 할일들

- [ ] 마크다운 스타일 적용
- [ ] 이미지 저장 및 보이기

---

### Issues

- gatsby-source-strapi로 graphql schema를 연동할 수 없었고, graphql-source-strapi-graphql 플러그인을 사용해 해결하였음
