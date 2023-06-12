# 저스틴블로그를 위한 Strapi CMS 서버

## 실행

개발 환경에서는 `npm run dev` 을 입력하면 됩니다.

개발 중 production의 데이터베이스를 불러와 사용하고 싶을 경우
`NODE_ENV=production npm run dev` 을 입력하면 됩니다.

### 환경변수

개발 환경의 환경변수는 config/..에 각각 설정할 수 있고, 아래와 같이 따로 설정합니다.

```
  DATABASE_NAME
  DATABASE_USERNAME
  DATABASE_PASSWORD
  APP_KEYS
  API_TOKEN_SALT
  ADMIN_JWT_SECRET
  JWT_SECRET
```

production의 환경변수 중 데이터베이스 관련은 URL로 퉁칩니다.

`DATABASE_URL`

그리고 `MY_HEROKU_URL` 이 추가됩니다. 나머지는 동일.
