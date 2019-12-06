# 补间动画库 + easing函数

### 安装
```
yarn add transition-animation
```
或
```
npm install transition-animation
```

### 使用
```js
import ANIMATION from 'transition-animation'
const current = 9
const start = 0
const end = 10
const result = ANIMATION.animation({
  current,
  start,
  end,
  easeFn: ANIMATION.Easing.linear // default
});
// result -> 0.9

const result = ANIMATION.animation({
  current,
  start,
  end,
  form: {
    x: 0,
    y: 0
  },
  to: {
    x: 100,
    y: 200
  }
});

// result -> { x: 90, y: 180}
```

### easing函数
* linear
* easeInQuad
* easeOutQuad
* easeInOutQuad
* easeInCubic
* easeOutCubic
* easeInOutCubic
* easeInQuart
* easeOutQuart
* easeInOutQuart
* easeInQuint
* easeOutQuint
* easeInOutQuint
* easeInSine
* easeOutSine
* easeInOutSine
* easeInExpo
* easeOutExpo
* easeInOutExpo
* easeInCirc
* easeOutCirc
* easeInOutCirc
* easeInElastic
* easeOutElastic
* easeInOutElastic
* easeInBack
* easeOutBack
* easeInOutBack
* easeInBounce
* easeOutBounce
* easeInOutBounce

函数效果查看 http://easings.net