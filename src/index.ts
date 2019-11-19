
const ANIMATION: any = {}

const isPlainObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const isUndefined = (val: any) => {
  return typeof val === 'undefined'
}

interface EaseFn {
  (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number
}

interface Options {
  current: number; // 当前值
  start: number; // 开始值
  end: number; // 结束值
  easeFn: EaseFn; // 缓冲动画函数
  form: any, // form对象
  to: any // to对象
}

/**
 * 动画函数
 * @param {Options} options
 */
ANIMATION.animation = (options: Options): any => {
  options = options || {}

  let result: any = {}
  let current = options.current
  let start = options.start
  let end = options.end
  let easeFn = options.easeFn
  let form = options.form
  let to = options.to

  if (start > end) {
    throw Error(`Start cannot be greater than the end`)
  }
  if (start < 0 || end < 0) {
    throw Error(`Start or end value cannot be less than 0`)
  }

  let elapsed = (current - start)
  let duration = (end - start)

  easeFn = easeFn || ANIMATION.Easing.linear

  // 处理undefined
  if (isUndefined(form) || isUndefined(to)) {
    let num = easeFn(elapsed, 0, 1, duration)
    if (num > 1) {
      num = 1
    }
    return num
  }

  // 处理不是对象
  if (!isPlainObject(form) || !isPlainObject(to)) {
    throw Error('form and to is not object')
  }

  // 处理对象
  for (const key in to) {
    if (to.hasOwnProperty(key)) {
      const formValue = Number(form[key])
      const toValue = Number(to[key])
      let num

      if (isNaN(formValue) || isNaN(toValue)) {
        throw Error('value is not number')
      }

      if (formValue < toValue) {
        const newFormValue = formValue - formValue
        const newToValue = toValue - formValue
        num = easeFn(elapsed, newFormValue, newToValue, duration)

        num = num + formValue

        if (num > toValue) {
          num = toValue
        }
      } else {
        const newFormValue = formValue - formValue
        const newToValue = (formValue - toValue)
        num = easeFn(elapsed, newFormValue, newToValue, duration)

        num = formValue - num

        if (num < toValue) {
          num = toValue;
        }
      }
      result[key] = num
    }
  }
  
  return result
}


// 缓冲动画函数对象
ANIMATION.Easing = {
  /**
   * 线性动画
   * @param {number} elapsed 当前值
   * @param {number} initialValue 初始值
   * @param {number} amountOfChange 结束值
   * @param {number} duration 动画时长
   */
  linear (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * elapsed / duration + initialValue
  },

  easeInQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
  },
  
  easeOutQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
  },
  
  easeInOutQuad(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if ((elapsed /= duration / 2) < 1) {
      return amountOfChange / 2 * elapsed * elapsed + initialValue;
    }
    return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
  },
  
  easeInCubic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
  },
  
  easeOutCubic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
  },
  
  easeInOutCubic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if ((elapsed /= duration / 2) < 1) {
      return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
  },
  
  easeInQuart(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
  },
  
  easeOutQuart(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
  },
  
  easeInOutQuart(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if ((elapsed /= duration / 2) < 1) {
      return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
  },
  
  easeInQuint(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
  },
  
  easeOutQuint(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
  },
  
  easeInOutQuint(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if ((elapsed /= duration / 2) < 1) {
      return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
  },
  
  easeInSine(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
  },
  
  easeOutSine(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
  },
  
  easeInOutSine(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
  },
  
  easeInExpo(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
  },
  
  easeOutExpo(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return elapsed === duration
      ? initialValue + amountOfChange
      : amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
  },
  
  easeInOutExpo(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if (elapsed === 0) {
      return initialValue;
    }
    if (elapsed === duration) {
      return initialValue + amountOfChange;
    }
    if ((elapsed /= duration / 2) < 1) {
      return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
    }
    return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
  },
  
  easeInCirc(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
  },
  
  easeOutCirc(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
  },
  
  easeInOutCirc(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if ((elapsed /= duration / 2) < 1) {
      return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
    }
    return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
  },
  
  easeInElastic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    let s = 1.70158;
    let p = 0;
    let a = amountOfChange;
    if (elapsed === 0) {
      return initialValue;
    }
    if ((elapsed /= duration) === 1) {
      return initialValue + amountOfChange;
    }
    if (!p) {
      p = duration * 0.3;
    }
    if (a < Math.abs(amountOfChange)) {
      a = amountOfChange;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
    }
    return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
  },
  
  easeOutElastic (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    let s = 1.70158;
    let p = 0;
    let a = amountOfChange;
    if (elapsed === 0) {
      return initialValue;
    }
    if ((elapsed /= duration) === 1) {
      return initialValue + amountOfChange;
    }
    if (!p) {
      p = duration * 0.3;
    }
    if (a < Math.abs(amountOfChange)) {
      a = amountOfChange;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
    }
    return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
  },
  
  easeInOutElastic(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    let s = 1.70158;
    let p = 0;
    let a = amountOfChange;
    if (elapsed === 0) {
      return initialValue;
    }
    if ((elapsed /= duration / 2) === 2) {
      return initialValue + amountOfChange;
    }
    if (!p) {
      p = duration * (0.3 * 1.5);
    }
    if (a < Math.abs(amountOfChange)) {
      a = amountOfChange;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
    }
    if (elapsed < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
    }
    return (
      a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue
    );
  },
  
  easeInBack(elapsed: number, initialValue: number, amountOfChange: number, duration: number, s: number = 1.70158): number {
    return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
  },
  
  easeOutBack(elapsed: number, initialValue: number, amountOfChange: number, duration: number, s: number = 1.70158): number {
    return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
  },
  
  easeInOutBack(
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number,
    s: number = 1.70158
  ): number {
    if ((elapsed /= duration / 2) < 1) {
      return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
  },
  
  easeInBounce(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    return amountOfChange - ANIMATION.Easing.easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
  },
  
  easeOutBounce(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if ((elapsed /= duration) < 1 / 2.75) {
      return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
    } else if (elapsed < 2 / 2.75) {
      return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
    } else if (elapsed < 2.5 / 2.75) {
      return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
    } else {
      return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
    }
  },
  
  easeInOutBounce(elapsed: number, initialValue: number, amountOfChange: number, duration: number): number {
    if (elapsed < duration / 2) {
      return ANIMATION.Easing.easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 + initialValue;
    }
    return ANIMATION.Easing.easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 + amountOfChange * 0.5 + initialValue;
  }
}

module.exports = ANIMATION