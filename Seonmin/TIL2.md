_비동기가 돌아가는 방식과 setTimeout 함수_

# 비동기란?

동시에 여러 작업을 해볼 수 있다!

자바스크립트는단일 스레드 기반의 언어로 한 순간 하나의 작업만을 처리할 수 있다.하지만 자바스크립트는비 동기로 동작하기 때문에 단일 스레드에도 불구하고동시에 많은 작업을 수행한다. => 비동기=> 주의할 점! 자바스크립트 언어 자체가 비동기 동작을 지원하는 것은 아니다.

비 동기로 동작하는 핵심요소는 자바스크립트 언어가 아니라브라우저가 가지고 있다.브라우저는Web APIs,Event Table,Callback Queue,Event Loop 등으로 구성되며 자바스크립트 코드가 실행될 때 브라우저와의 동작은 아래 그림으로 표현할 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c48e1088-d95d-4e02-9949-905824229da5/Untitled.png)

- Web APIs: setTimeout이 Call Stack에 들어와 실행되면 Browser API인 timer를 호출한다.
- Event Table: 특정 event(timeout, click, mouse move 등등)가 발생했을 때어떤 callback 함수가 호출되야 하는지를 알고 있다.
- Callback Queue:이벤트 발생 시 실행해야 할 callback 함수가Callback Queue에 추가된다.
- Event Loop:Call Stack이비어있을 경우, Callback queue에서 함수를 꺼내 Call Stack에 추가한다.

---

---

# setTimeout 함수

setTimeout 함수의 첫번째 인자는 기다린 후에 실행시킬 함수, 그 다음은 기다릴 밀리초(delay) 이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7214e877-c2e1-4bf4-825e-ff00758c06c7/Untitled.png)

**하지만** setTimeout의 delay인자가delay ms 후에 실행 되는 것을보장하지 않는다.

**정확히**는 delay ms 후에Callback Queue에 들어가는 것을 보장한다.

⇒ 왜냐하면! setTimeout의 delay ms 후에 이미 call stack에 다음 함수가 들어가 있다면, 즉 call stack이 비어있지 않다면 Event Loop는 callback queue에 있는 setTimeout의 결과 함수를 거들떠보지 않는다.

참조

[https://medium.com/sjk5766/javascript-비동기-핵심-event-loop-정리-422eb29231a8](https://medium.com/sjk5766/javascript-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%95%B5%EC%8B%AC-event-loop-%EC%A0%95%EB%A6%AC-422eb29231a8)

[https://shinystarforever.tistory.com/120](https://shinystarforever.tistory.com/120)

---

---

_nvm,npm, npx, yarn를 알아보자!_

# 🤔nvm이란?

**nvm(Node Version Manager)**= Node.js 를 설치하는 툴이자, Node.js의 다양한 버전을 관리하는 프로그램 (Node.js의 다양한 버전을 쉽게 설치할 수 있다. )

# nvm을 왜 쓰지?

OS에 특정 버젼의 Node.js 를 설치하면, 여러 버전의 Node.js 를 설치해야 할 경우에 대응을 할 수가 없게 된다. 그렇기 때문에 먼저 nvm 을 설치하고, 설치한 nvm 을 통하여 원하는 특정 버젼의 Node.js 를 원하는 조건에 따라 복수로 설치하는 방법이 나중을 위해서는 더 좋은 방법이 된다.

⭕️ **nvm 설치 후 ➝ Node.js 설치 후➝ npm 설치!**

---

---

# 🤔npm이란?

**npm(Node Package Manager)** = Node.js 로 개발된 프로그램을(npm 패키지) 편리하게 설치, 업데이트 및 삭제를 해 주는 프로그램. 즉, 필요한 모듈을 다운로드할 수 있는, 모듈들이 모여있는 모듈 스토어라고 생각하자! (🤓참고 이에 대한 정보를 담아둔 곳이 package.json 이다.)

npm 은 Node.js 를 OS 에 직접 설치하였든 nvm 으로 설치하였든지에 관계없이, Node.js 가 설치된 상태에서(Node.js 를 설치하면 npm 도 같이 설치됨.) `npm`명령어를 이용하여 [npm 서비스](https://www.npmjs.com/)에 등록된 Node.js 로 작성된 패키지를 관리하는 프로그램 입니다.

## npm 명령어

- **npm init** : package.json 생성
- **npm install** : package.json 파일 및 해당 종속성에 나열된 모든 모듈을 설치
- **npm install package_name@버전** : 특정 패키지의 특정 버전 설치
- **npm install 주소** : 특정 저장소 내 패키지 설치. 주로 github을 이와 같이 설치합니다.
- **npm install package_name -g** : 옵션. 글로벌로 설치. 로컬의 다른 프로젝트도 이 패키지를 사용 가능하게 됩니다.
- **npm uninstall** : 패키지 삭제 명령어입니다.
- **npm update** : 설치한 패키지들을 업데이트해줍니다.
- **npm dedupe** : 중복 설치된 패키지들을 정리해주는 명령어입니다.

### 🤓 package.json이란?

package.json은 프로젝트 정보와 의존성(dependencies)을 관리하는 문서입니다.우리가 어떤 패키지(오픈소스)를 사용하는지, 어떤 버전을 사용하는지 등을 기록함으로써 어느 곳에서도 동일한 개발 환경을 구축할 수 있게 해줍니다.

# 정리하면!

(1)nvm을 설치하고 설치한 nvm 을 이용하여 원하는 조건으로,

(2)Node.js를 설치한 후에,

(3)npm을 이용하여 필요한 패키지를 추가 설치한다.

---

---

# 🤔npx란?

**npx**는 자바스크립트 패키지 관리 모듈인 **npm(Node Package Module)**의 5.2.0 버전부터 새로 추가된 도구이다. (새로운 패키지 관리 모듈이 아님!)

⇒ npm과 비교대상이 아니고, npm을 좀 더 편하게 사용하기 위해서 npm에서 제공해주는 하나의 도구이다.

⇒ *npm@5.2.0* 이상 버전만 깔려 있다면 npx 명령어를 사용할 수 있습니다.

- **npx 는 패키지를 임시 설치해서 "실행"하는 용도입니다!**

npx는 설치가 불가능하기 때문에 npx 로 react를 설치할거라면 create-react-app 라는 명령어로 사용해서

CRA가 알아서 react 를 설치하게 만들어야 한다.

- **npm은 패키지를 관리만 하고 실행은 할 수 없다.**

npm을 사용하여 패키지를 실행하려면 package.json파일 에서 해당 패키지를 지정해야 한다.

### 결론**👉 npx는 npm 패키지 실행기이다.**

### 결론**👉 npm은 패키지 매니저이고 관리만 한다.**

---

---

# 🤔yarn이란?

페이스북에서 만든 자바스크립트 패키지 매니저이다. npm과 같은 기능을 수행한다.

npm의 단점인 **속도(performance), 안정성(stability), 보안성(security)** 측면을 개선하였다.

- 속도(perfomance)

yarn은 다운받은 패키지 데이터를 캐시(cache)에 저장하여, 중복된 데이터는 다운로드하지않고, 캐시에 저장된 파일을 활용하여 npm에 비해 패키지 설치속도가 매우 빠르다. 그리고 여러개의 **패키지를 설치할 때 병렬로 처리하기 때문에 performance와 speed가 증가!** (npm은 순차적)

- 안정성(stability)과 보안성(security)

npm은 패키지가 설치될 때 자동으로 코드와 의존성을 실행할 수 있도록 허용하여 편리하기도 하지만 안정성을 위협할 수 있다는 단점이 있다. 특히 보장된 정책 없이 등록한 패키지가 존재할 수 있다는 점에서 더욱 위험도가 높다고 한다.

반면 **yarn은 yarn.lock이나 package.json으로부터 설치만 하며, yarn.lock은 모든 디바이스에 같은 패키지를 설치하는 것을 보장하기 때문에 버전의 차이로 인해 생기는 버그를 방지해줄 수 있다.**

# npm vs. yarn 둘 중에 무엇을 사용해야할까?

아무리 yarn이 좋다고 한들, 원조는 이길 수 없다고 한다!!

yarn이 npm의 단점을 보안하여 나온 것이기는 하지만. **npm 또한 몇년간 발전을 거듭하며 단점을 많이 보완했기 때문에 현재 npm/yarn의 performance와 stability 차이는 그리 크지 않다고 봐도 무방하다고 한다.**

⇒ **'각자에게 편한 것을 사용하는 것이 가장 좋지만 만약 둘다 사용해보지 않은 상황이라면 npm을 사용해보는 것을 추천한다.'**

참고

[https://velog.io/@kysung95/개발상식-npm과-yarn](https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-npm%EA%B3%BC-yarn)

[https://lynmp.com/ko/article/tb585d114096490055](https://lynmp.com/ko/article/tb585d114096490055)

[https://basemenks.tistory.com/232](https://basemenks.tistory.com/232)
