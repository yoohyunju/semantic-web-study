const { readFileSync } = require('fs')
const { JSDOM } = require('jsdom')
const { expect } = require('chai')
const { window } = new JSDOM(readFileSync(__dirname + '/../src/index.html').toString())
const script = readFileSync(__dirname + '/../src/script.js').toString()
const validator = readFileSync(__dirname + '/../src/validator.js').toString()
const { document, KeyboardEvent, Element } = window;
global.Element = Element
require('geteventlisteners');

eval(validator) // 스크립트 실행
eval(script) // 스크립트 실행

const separator = () => console.log('\n-----------------------------------------')

describe('💡 테스트가 잘 작동하는지 확인합니다', () => {
  after(separator)

  it('index.html과 body가 있는지 체크합니다', () => {
    expect(document.querySelector('body')).to.exist
  })
})

describe('💡 실습을 잘 따라했는지 확인합니다', () => {
  after(separator)

  it('아이디 입력창 `#username`가 있어야 합니다', () => {
    expect(document.querySelector('input[type=text]#username')).to.exist
  })

  it('성공 메시지 `.success-message`가 있어야 합니다', () => {
    expect(document.querySelector('.success-message')).to.exist
  })

  it('실패 메시지 `.failure-message`가 있어야 합니다', () => {
    expect(document.querySelector('.failure-message')).to.exist
  })

  it('아이디 입력창 `#username`에 네 글자 이하를 입력하면, 실패 메시지가 보여야 합니다', () => {
    const elInputUsername = document.querySelector('#username')
    elInputUsername.value = ''
    const e = new KeyboardEvent('keyup')
    elInputUsername.dispatchEvent(e)
    expect(document.querySelector('.failure-message').classList.contains('hide')).to.be.false
    expect(document.querySelector('.success-message').classList.contains('hide')).to.be.true
  })

  it('아이디 입력창 `#username`에 네 글자 이상를 입력하면, 성공 메시지가 보여야 합니다', () => {
    const elInputUsername = document.querySelector('#username')
    elInputUsername.value = 'code'
    const e = new KeyboardEvent('keyup')
    elInputUsername.dispatchEvent(e)
    expect(document.querySelector('.failure-message').classList.contains('hide')).to.be.true
    expect(document.querySelector('.success-message').classList.contains('hide')).to.be.false
  })
})

describe('💡 Bare Minimum Requirements - HTML을 이용해 목업을 만드세요', () => {
  after(separator)

  it('비밀번호 입력창 `#password`가 있어야 합니다', () => {
    expect(document.querySelector('#password')).to.exist
  })

  it('비밀번호 확인 입력창 `#password-retype`가 있어야 합니다', () => {
    expect(document.querySelector('#password-retype')).to.exist
  })

  it('비밀번호 입력창과, 비밀번호 확인 입력창의 값이 다를 때에 표시할 시각적 피드백 `.mismatch-message`를 제공해야 합니다', () => {
    expect(document.querySelector('.mismatch-message')).to.exist
  })

  it('처음 페이지를 띄울 때 시각적 피드백은 화면에 보이지 않습니다', () => {
    expect(document.querySelector('.mismatch-message').classList.contains('hide')).to.be.true
  })
})


describe('💡 Bare Minimum Requirements - 유효성 검사 함수를 작성하세요', () => {
  after(separator)

  it('두 개의 값을 입력으로 받아 일치 여부를 판단하는 함수 `isMatch`가 있어야 합니다', () => {
    expect(isMatch).to.exist
  })

  it('두 개의 값을 입력해서 일치하면 true를 반환합니다', () => {
    expect(isMatch('supersecret', 'supersecret')).to.be.true
  })

  it('두 개의 값을 입력해서 일치하지 않으면 false를 반환합니다', () => {
    expect(isMatch('supersecret', 'wrongpassword')).to.be.false
  })
})

describe('💡 Bare Minimum Requirements - 비밀번호 일치 여부를 확인하고 시각적 피드백을 제공하세요', () => {

  it('비밀번호 확인창에 keyup 이벤트 핸들러가 존재해야 합니다', () => {
    const elInputPasswordRetype = document.querySelector('#password-retype')
    if (elInputPasswordRetype.onkeyup) {
      expect(elInputPasswordRetype.onkeyup).to.exist
    }
    else {
      const handlers = elInputPasswordRetype.getEventListeners('keyup')
      expect(handlers).to.exist
      expect(handlers).not.to.empty
    }
  })

  it('비밀번호 확인창에 값이 입력될 때, 비밀번호 값이 서로 일치하지 않으면 `.mismatch-message` 메시지가 보여야 합니다', () => {
    const elInputPassword = document.querySelector('#password')
    const elInputPasswordRetype = document.querySelector('#password-retype')
    elInputPassword.value = 'supersecret'
    elInputPasswordRetype.value = 'wrongpassword'

    const e = new KeyboardEvent('keyup')
    elInputPasswordRetype.dispatchEvent(e)
    expect(document.querySelector('.mismatch-message').classList.contains('hide')).to.be.false
  })

  it('비밀번호 확인창 값과 비밀번호 값이 서로 일치하면 메시지가 더이상 보이지 않아야 합니다', () => {
    const elInputPassword = document.querySelector('#password')
    const elInputPasswordRetype = document.querySelector('#password-retype')
    elInputPassword.value = 'supersecret'
    elInputPasswordRetype.value = 'supersecret'

    const e = new KeyboardEvent('keyup')
    elInputPasswordRetype.dispatchEvent(e)
    expect(document.querySelector('.mismatch-message').classList.contains('hide')).to.be.true
  })
})