# 저스틴블로그를 위한 Strapi CMS 서버

## 실행

개발 환경에서는 `npm run dev` 을 입력하면 됩니다.

개발환경에서 production의 데이터베이스를 불러와 사용하고 싶을 경우
config/env/production에서 사용되는 환경변수를 설정한 후 `npm run prod` 을 입력하면 됩니다.

### 환경변수

개발 환경의 환경변수는 config/..에 각각 설정할 수 있고, 아래와 같이 환경에 따라 다르게 설정합니다.

```
  DATABASE_NAME
  DATABASE_USERNAME
  DATABASE_PASSWORD
  APP_KEYS
  API_TOKEN_SALT
  ADMIN_JWT_SECRET
  JWT_SECRET
```

production의 환경변수 중 데이터베이스와 관련된 변수들은 `DATABASE_URL` 로 통합하였습니다. URL에 포함된 정보들을 파싱하여 사용합니다.

그리고 배포된 주소에 해당하는 `MY_HEROKU_URL` (헤로쿠로 배포하였습니다) 이 추가됩니다. 나머지는 동일.
