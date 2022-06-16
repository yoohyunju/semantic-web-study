import { useEffect, useState } from 'react';

export default function FunctionComponent() {
  const [color, setColor] = useState();

  const changeColor = (color) => {
    setColor(color);
  };

  // useEffect(() => {
  //   console.log('Component is loading');
  // }); // 안에 있는 함수나 코드가 렌더링 될 때마다 실행한다.

  // useEffect(() => {
  //   console.log('Component is loaded just once');
  // }, []);
  // // 이 컴포넌트가 로드 될 때 딱 한번만 실행하세요.

  // // 그렇다면 우리가 원할 때만 실행하고 싶다면 ???
  useEffect(() => {
    console.log('Color changed!!');
  }, [color]);
  // 여기서는 color라는 값에 변화가 있을 경우에만 안에 있는 코드를 실행하세요.
  // 배열 안에 여러가지 변수를 넣어도 된다! 넣은 변수 중에 하나의 값이 변경되면 안의 코드가 실행된다.

  // api 연결이나 네트워크 연결을 해체할때 즉, 해당 컴포넌트가 해체될 때 청소를 해줘야할때!
  useEffect(() => {
    console.log('Color changed!!');

    return () => {
      // 청소 원하는 코드
    };
  }, [color]);

  return (
    <div>
      <div
        style={{
          width: '200px',
          height: '100px',
          margin: '12px auto',
          backgroundColor: color,
          border: 'solid 1px #ccc',
        }}
      ></div>
      <div>
        <button onClick={() => changeColor('#f00')}>Red</button>
        <button onClick={() => changeColor('#000')}>Black</button>
        <button onClick={() => changeColor('#0f0')}>Green</button>
        <button onClick={() => changeColor('#f0f')}>Pink</button>
      </div>
    </div>
  );
}
