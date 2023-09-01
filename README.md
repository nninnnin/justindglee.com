# 저스틴의 블로그와 포트폴리오

개인적인 학습 내용과 이야기들을 정리하기 위한 블로그와 포트폴리오 웹사이트 입니다.

### 블로그

[Gatsby](https://www.gatsbyjs.com/)와 [Strapi](https://strapi.io/)를 사용해 만들어졌습니다.

  - `createPage` 액션을 통한 빌드타임 페이지생성(SSG)
  - `react-markdown` 과 `rehype-raw` 를 사용해 마크다운에 첨부된 HTML iframe 비디오 해석
  - sass의 @mixin과 @include를 사용한 반응형 디자인 구현
  - `fxjs`와 `fxts` 를 사용해 함수형코드 작성으로 좋은 가독성
  - strapi에서 수정하는 불편함을 보조하기 위한 [에디팅모드 구현](https://github.com/nninnnin/justindglee.com/pull/8)
    - 에디터 기능
      - [x] [탭키를 이용한 들여쓰기와 내어쓰기](https://github.com/nninnnin/justindglee.com/pull/5/files)
      - [ ] 줄바꿈시 자동 들여쓰기 수준 맞추기
    - [ ] 저장되었으나 공개되지 않은(draft) 글 리스트 확인 및 수정 기능
    - [ ] 빌드 트리거로 새로운 글 공개 기능

### 포트폴리오

Create React App을 기반으로 만들어졌습니다.

  - [webpack에서의 빌드타임 gif 최적화 설정을 위해 CRA eject](https://github.com/nninnnin/justindglee.com/commit/a7fd8710bcde80ea603dffc846a8cce7e17ea09e)

---

템플릿 디자인의 무단도용을 금지합니다.
