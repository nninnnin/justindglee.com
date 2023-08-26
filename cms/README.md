# [저스틴 블로그](https://justindglee.com) 를 위한 Strapi CMS 서버

## 실행

- 개발환경에서는 `npm run dev` 을 입력하면 됩니다.
- 개발중, 실제 이용중인 데이터를 이용하기 위해 배포된 production 데이터베이스를 불러와 사용하고 싶을 경우 `.env.development`에 `DATABASE_URL` 환경변수를 설정한 후 `npm run prod` 을 입력하면 됩니다.

### 환경변수

1. development

`.env.development` 에서 설정하며,
`config/..` 에서 사용됩니다.

```
  DATABASE_NAME
  DATABASE_USERNAME
  DATABASE_PASSWORD
  DATABASE_URL (optional)
  APP_KEYS
  API_TOKEN_SALT
  ADMIN_JWT_SECRET
  JWT_SECRET
```

2. production

헤로쿠 등 배포환경에서 주어지는 설정환경 또는 `.env.production` 에서 설정하며,
`config/env/production/..` 에서 사용됩니다.

```
  DATABASE_URL
  APP_KEYS
  API_TOKEN_SALT
  ADMIN_JWT_SECRET
  JWT_SECRET
  MY_HEROKU_URL
```

기본적으로는 개발환경과 동일하지만 다음과 같은 차이점이 있습니다.

- 프로덕션 환경에서는 데이터베이스와 관련된 변수들을 `DATABASE_URL` 로 통합하였습니다.
- 그리고 배포된 주소에 해당하는 `MY_HEROKU_URL` (헤로쿠로 배포하였습니다)이 추가됩니다.
