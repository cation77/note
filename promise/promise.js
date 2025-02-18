/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new TypeError('Chaining cycle detected for promise');
  }
  if (x instanceof myPromise) {
    x.then((y) => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then;
    try {
      then = x.then;
    } catch (e) {
      return reject(e);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}

class myPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    this.state = myPromise.PENDING;
    this.result = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result) {
    if (this.state === myPromise.PENDING) {
      this.state = myPromise.FULFILLED;
      this.result = result;
      this.onFulfilledCallbacks.forEach((callback) => {
        callback(result);
      });
    }
  }
  reject(reason) {
    if (this.state === myPromise.PENDING) {
      this.state = myPromise.REJECTED;
      this.result = reason;
      this.onRejectedCallbacks.forEach((callback) => {
        callback(reason);
      });
    }
  }
  then(onFulfilled, onRejected) {
    const promise2 = new myPromise((resolve, reject) => {
      if (this.state === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.result);
              } else {
                const x = onFulfilled(this.result);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.result);
              } else {
                const x = onRejected(this.result);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
      } else if (this.state === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.result);
            } else {
              const x = onFulfilled(this.result);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.result);
            } else {
              const x = onRejected(this.result);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(callback, callback);
  }

  static resolve(value) {
    if (value instanceof myPromise) {
      return value;
    } else if (value instanceof Object && 'then' in value) {
      return new myPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }
    return new myPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new myPromise((_, reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let count = 0;
        if (promises.length === 0) {
          return resolve(promises);
        }

        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              count++;
              result[index] = value;
              count === promises.length && resolve(result);
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }
  static allSettled(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let count = 0;
        if (promises.length === 0) {
          return resolve(promises);
        }
        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              count++;
              result[index] = { status: 'fulfilled', value };
              count === promises.length && resolve(result);
            },
            (reason) => {
              count++;
              result[index] = { status: 'rejected', reason };
              count === promises.length && resolve(result);
            }
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static race(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        // 如果传入的迭代promises是空的，则返回的 promise 将永远等待。
        if (promises.length) {
          promises.forEach((item, index) => {
            myPromise.resolve(item).then(resolve, reject);
          });
        }
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static any(promises) {
    return new myPromise((resolve, reject) => {
      let errors = [];
      let count = 0;

      if (promises.length === 0) {
        return reject(new AggregateError('All promises were rejected'));
      }

      if (Array.isArray(promises)) {
        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              errors[index] = reason;
              count++;
              count === promises.length && reject(new AggregateError(errors));
            }
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }
}

myPromise.deferred = function () {
  const result = {};
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = myPromise;

// 数组全是非Promise值，测试通过
let p1 = myPromise.race([1, 3, 4]);
setTimeout(() => {
  console.log('p1 :>> ', p1);
});

// 空数组，测试通过
let p2 = myPromise.race([]);
setTimeout(() => {
  console.log('p2 :>> ', p2);
});

const p11 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const p22 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

// // 数组里有非Promise值，测试通过
myPromise.race([p11, p22, 10]).then((value) => {
  console.log('p3 :>> ', value);
  // Both resolve, but p22 is faster
});
// expected output: 10

// 数组里有'已解决的Promise' 和 非Promise值 测试通过
let p12 = myPromise.resolve('已解决的Promise');
setTimeout(() => {
  myPromise.race([p12, p22, 10]).then((value) => {
    console.log('p4 :>> ', value);
  });
  // expected output:已解决的Promise
});

// Promise.race的一般情况 测试通过
const p13 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const p14 = new myPromise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

myPromise.race([p13, p14]).then((value) => {
  console.log('p5 :>> ', value);
  // Both resolve, but promise2 is faster
});
