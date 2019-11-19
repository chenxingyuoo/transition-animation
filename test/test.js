'use strict';
const expect = require('chai').expect;
const animation = require('../dist/index').animation;

describe('function animation', () => {
  it('should return 0.9', () => {
    const current = 9
    const start = 0
    const end = 10
    const result = animation({
      current, start, end
    });
    expect(result).to.equal(0.9);
  });

  it('should return {x:90 y:180}', () => {
    const current = 9
    const start = 0
    const end = 10
    const result = animation({
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
    
    expect(result.x).to.equal(90);
    expect(result.y).to.equal(180);
  });
});