# Unit 1. 고차함수(HOF) 추가 학습

## 맵리듀스(MapReduce)

- 정의 : 구글에서 대용량 데이터 처리를 분산 병렬 컴퓨팅에서 처리하기 위한 목적으로 제작해 2004년 발표한 SW 프레임워크
    - 함수형 프로그래밍에서 사용되는 Map과 Reduce라는 함수 기반으로 구성된다.
    - Map 단계에서는 흩어져있는 key, value로 데이터를 묶어주고, Reduce 단계에서는 Map단계의 key 중심으로 필터링 및 정렬을 진행한다.
    - 이를 오픈소스화하여 구현한 것이 하둡(Hadoop)이다.

## 커링(**Currying**)과 클로저(**Closure**)의 차이

- 클로저(Closure) : 외부 함수의 변수에 접근할 수 있는 내부 함수
    
    ```jsx
    function outerFunc() {
      let outerVal = 2;
    
      function innerFunc() { // 클로저 함수 (지역, 외부, 전역 변수 모두 접근 가능)
        let innerVal = 1;
        return globalVal + outerVal + innnerVal;
      }
      return innerVal;
    }
    let globalVal = 3;
    let innerF = outerFunc();
    innerF();
    ```
    

- 커링(Currying) : 함수를 리턴하는 함수, 여러개의 인자를 한번의 호출로 처리하던 함수를 인자를 하나씩 받는 여러개의 함수로 만드는 기술 (`f(a, b, c)`처럼 단일 호출로 처리하는 함수를 `f(a)(b)(c)`
와 같이 각각의 인수가 호출 가능한 프로세스로 호출된 후 병합되도록 변환하는 것)
    
    ```jsx
    // 예제 1
    function sum(x) { 
    	return function(y) { 
    		return x+y; 
    		} 
    	} 
    
    sum(2)(3); //5 
    
    let sum100 = sum(100);
    sum100(50); //150 
    
    // 예제 2
    function multiply(x) {
      return function(y) {
        return function(z){
          return x*y*z;
        }
      }
    }
    
    let multiply3 = multiply(3);   // 3이 고정됨
    let multiply3And5 = multiply3(5);  // 3과 5가 고정됨
    let multiply3And2 = multiply3(2);  // 3과 2가 고정됨
    console.log(multiply3And5(7));
    console.log(multiply3And5(8));
    console.log(multiply3And2(1));
    ```
    
    - 커링을 쓰는 이유는 커링은 여러 인자 중 일부만 고정시켜 사용할 수 있기 때문이다. (ex. html 태그를 추가해 줄 때)
    - 커링은 클로저와 완전히 별개인 개념이 아니라 클로저의 특징을 이용한 기법으로 볼 수 있다.

## 절차형(명령형) 프로그래밍과 선언형 프로그래밍 차이(imperative vs declarative)

### 명령형 프로그래밍 (How to do)

- 정의 : 선언형 프로그래밍과 반대되는 개념으로, 프로그래밍의 상태와 상태를 변경시키는 구문의 관점에서 연산을 설명하는 프로그래밍 패러다임의 일종이다. → 컴퓨터가 수행할 명령을 순서대로 써 놓은 것이다.

### 선언형 프로그래밍 (What to do)

- 정의 : 프로그램이 어떤 방법으로 해야 하는지를 나타내기보다 무엇과 같은지를 설명하는 경우에 선언형이라고 한다. (웹페이지는 선언형이다 → 무엇이 나타나야하는지를 묘사하는 것이지 어떤 방법으로 나타나야 하는지가 아니기 때문)

## 함수의 조합(function composition)

- 정의 : 함수들을 조합하여 새로운 함수를 만드는 것으로, 한 함수의 결과가 다른 함수로 전달되고 최종 함수가 실행될 때 까지 다른 함수로 전달되는 접근 방식이다.
    
    ```jsx
    // 예제 1
    const double = x => x * 2
    const square = x => x * x
    
    // Tradition approach
    var output1 = double(2); // 2
    var output2 = square(output1); // 16 (4 * 4)
    console.log(output2);
    
    // variant two
    var output_final = square(double(2));
    console.log(output_final);
    
    // 예제 2
    function add2(num) {
    	return num+2;
    }
    function multiply3(num) {
    	return num*3;
    }
    
    multiply3(add2(5)); // 21
    ```
    
    - 굳이 이렇게 써야하는 이유? → 프로그램 유지보수 측면에서 함수를 쪼개서 만드는 것이 재활용성을 높이기 때문이다.