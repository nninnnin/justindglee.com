# 저스틴의 블로그와 포트폴리오

개인적인 학습 내용과 이야기들을 정리하기 위한 블로그와 포트폴리오 웹사이트입니다.

### 블로그

![Gatsby](https://img.shields.io/badge/Gatsby-%23663399.svg?style=for-the-badge&logo=gatsby&logoColor=white)
![Strapi](https://img.shields.io/badge/strapi-%232E7EEA.svg?style=for-the-badge&logo=strapi&logoColor=white)

  - `createPage` 액션을 통한 빌드타임 페이지생성(SSG)으로 원활한 페이지탐색 경험 제공
  - markdown 형식의 문서에서 풍부한 컨텐츠 제공을 위해 비디오 또는 외부 페이지를 iframe으로 첨부 가능
    - `react-markdown`, `rehype-raw`
  - sass의 @mixin과 @include등 문법 사용으로 효율적인 반응형 디자인코드 작성
  - 좋은 가독성을 위한 함수형 프로그래밍 적용
    - `fxjs`, `fxts`
  - Strapi에서 포스트를 관리하는 불편함을 대체하기 위한 에디팅모드 구현으로 [포스트 작성](https://github.com/nninnnin/justindglee.com/pull/8) 및 [포스트 수정](https://github.com/nninnnin/justindglee.com/pull/3) 가능
    - [x] 저장되었으나 공개되지 않은(draft) 글 리스트 확인 및 수정 기능
    - [ ] 빌드 트리거로 새로운 글 공개 기능
    - 에디터에서 구현된 기능들
      - [x] [탭키를 이용한 들여쓰기와 내어쓰기](https://github.com/nninnnin/justindglee.com/pull/5/files)
      - [x] [줄바꿈시 자동 들여쓰기 수준 맞추기](https://github.com/nninnnin/justindglee.com/pull/9)
      - [ ] 컨텍스트 메뉴를 통한 간편한 태그 생성, 등록, 제거 및 삭제
      - [ ] 드래그-드랍을 통한 이미지 업로드
      - [ ] 이미지 스타일(크기, 경계선, 둥글기..) 프리셋 생성 및 적용
      - [ ] 실시간 자동저장 기능 (Socket, Redis)

### 포트폴리오

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

  - [webpack에서의 빌드타임 gif 최적화 설정을 위해 CRA eject](https://github.com/nninnnin/justindglee.com/commit/a7fd8710bcde80ea603dffc846a8cce7e17ea09e)

---
