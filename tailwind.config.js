// tailwind.config.js
module.exports = {
  content: [
    './public/**/*.html',
    './dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  //variants는 Tailwind CSS에서 특정 상태(예: hover, focus)에서 스타일을 적용할 수 있도록 유틸리티 클래스의 변형을 확장하는 데 사용
  variants: {
    extend: {},
  },
  plugins: [],
}
