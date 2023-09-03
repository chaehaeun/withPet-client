# 🐶 withPet

![withPet](https://user-images.githubusercontent.com/73949086/228266936-b836e543-d022-4b26-a64d-c554bf0e8759.png)

## 📕 프로젝트 정보

- 주제 : 반려동물의 하루 일기를 작성할 수 있는 sns 서비스
- 프로젝트 작업 기간 : ![project_start](https://img.shields.io/badge/Project%20start-2023--03--09-green) ![project_end](https://img.shields.io/badge/Project%20end-2023--03--28-orange)
- 프로젝트 인원 : 5명
- 주요 기능 :
  1. Firebase Authentication을 활용한 로그인, 회원가입, 소셜로그인(구글), 회원탈퇴 기능
  2. 프로필 등록, 수정 기능
  3. 반려동물 일기 작성(사진 첨부 가능), 수정, 삭제 기능
  4. 피드 형식으로 다른 작성자들의 일기를 열람하는 기능
  5. chatGPT API를 활용한 챗봇 기능
  6. 현재 날씨, 미세먼지 API를 통한 산책지수 측정 기능
  7. 다이어리 히스토리를 관리할 수 있는 마이페이지 기능

> 🚩 URL : https://withpet-230313.web.app/

<br/>

## 🎨 Environment

### Skill

<div align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
</div>

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white)
![ESlint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-FF7262?style=flat-square&logo=Figma&logoColor=white)

### Communication

🔗 [GitHub Issue](https://github.com/withPet-team/withPet-client/issues) : 프로젝트 이슈 관리 <br>
🔗 [GitHub Projects](https://github.com/orgs/withPet-team/projects/1) : 프로젝트 백로그 및 진행상황 관리 <br>
🔗 [GitHub Wiki](https://github.com/withPet-team/withPet-client/wiki) : 스프런트 회의/회고, 코딩 컨벤션, 커밋 메세지 컨벤션 <br>
🔗 [GitHub Discussions](https://github.com/withPet-team/withPet-client/discussions) : 질문 및 토론, 진행 상황 공유, 정보 공유 <br>
💬 Discord - 리액트 최종프로젝트 <br>
💬 Kakao talk

<br/>

## 🧨 Get Start

### Develop

저장소 클론하기

```bash
$ git clone https://github.com/withPet-team/withPet-client.git
```

패키지 설치 및 빌드하기

```bash
$ npm install
// 로컬 환경 실행
$ npm start
// 빌드 실행
$ npm run build
// 배포 진행
$ firebase deploy
```

### File Tree

```
📦withPet-client
 ┣ 📂.github
 ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┃ ┣ 📜feature.md
 ┃ ┃ ┣ 📜bug.md
 ┣ 📂build
 ┃ ┣ 📜index.html
 ┣ 📂withpet
 ┃ ┣ 📂.firebase
 ┃ ┣ 📂build
 ┃ ┣ 📂public
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┣ 📂Logo
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂App
 ┃ ┃ ┃ ┣ 📂Chat
 ┃ ┃ ┃ ┣ 📂Diary
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┃ ┣ 📂PetInfo
 ┃ ┃ ┃ ┣ 📂Setting
 ┃ ┃ ┃ ┣ 📂SignIn
 ┃ ┃ ┃ ┣ 📂SignUp
 ┃ ┃ ┃ ┣ 📂Story
 ┃ ┃ ┃ ┣ 📂UI
 ┃ ┃ ┃ ┣ 📂WalkIndex
 ┃ ┃ ┃ ┣ 📂Welcome
 ┃ ┃ ┣ 📂redux
 ┃ ┃ ┃ ┣ 📂Slice
 ┃ ┃ ┃ ┣ 📜store.tsx
 ┃ ┃ ┣ 📂router
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┣ 📜firebase-config.js
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┣ 📜.env
 ┃ ┣ 📜.eslintrc.js
 ┃ ┣ 📜.firebaserc
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜.prettierrc
 ┃ ┣ 📜firebase.json
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜README.md
 ┃ ┣ 📜tailwind.config.js
 ┃ ┣ 📜tsconfig.json
 ┣ 📜.firebaserc
 ┣ 📜.gitignore
 ┣ 📜firebase.json
 ┗ 📜README.md
```

<br>

## 💻 담당 기능 구현 내용

1. Welcome Page

| 초기 화면                        |
| -------------------------------- |
| ![welcome](./assets/welcome.gif) |

- useEffect, setTimeout을 활용한 인트로 애니메이션을 구현했습니다.

2. 로그인

| 로그인                       |
| ---------------------------- |
| ![login](./assets/login.gif) |

- Firebase Authentication을 활용하여 로그인 기능을 구현했습니다.
- 소셜 로그인(구글) 기능을 구현했습니다.
- 유효성 검사 통과 시에만 로그인 버튼이 활성화 되도록 구현했습니다.

3. Story
   | Story | 댓글 |
   | ---------------- | ---------------- |
   | ![메인](./assets/story.gif) | ![댓글](./assets/comment.gif) |

- firestore에서 story 정보 불러와 렌더링하는 기능을 구현했습니다.
- 데이터를 카드 컴포넌트에 보여주는 기능을 구현했습니다.
- 사진이 여러장일 경우 스와이퍼 슬라이드를 이용하여 슬라이드 형식으로 보여주는 기능을 구현했습니다.
- 본문의 내용이 길 경우 더보기 버튼을 눌러 전체 내용을 볼 수 있도록 구현했습니다.
- uid 정보를 이용하여 현재 로그인 되어있는 유저의 uid와 일치할 시 수정 / 삭제 버튼이 보이도록 했습니다.
- 댓글을 누르면 스토리 상세 페이지로 이동하고, 댓글 CRUD가 가능합니다.

## 🧑 Contributors : LAB9

<table align="left">
  <tr>
    <th>백승연</th>
    <th>김성은</th>
    <th>박재석</th>
    <th>이원준</th>
    <th>채하은</th>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/qorbaxk">@qorbaxk</a></td>
    <td align="center"><a href="https://github.com/sungeunnn">@sungeunnn</a></td>
    <td align="center"><a href="https://github.com/jaesukpark77">@jaesukpark77</a></td>
    <td align="center"><a href="https://github.com/copiCat0">@copiCat0</a></td>
    <td align="center"><a href="https://github.com/chaehaeun">@chaehaeun</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/qorbaxk.png" width="100"></td>
    <td align="center"><img src="https://github.com/sungeunnn.png" width="100"></td>
    <td align="center"><img src="https://github.com/jaesukpark77.png" width="100"></td>
    <td align="center"><img src="https://github.com/copiCat0.png" width="100"></td>
    <td align="center"><img src="https://github.com/chaehaeun.png" width="100"></td>
  </tr>
</table>

<br/>
