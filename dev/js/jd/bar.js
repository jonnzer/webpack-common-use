async function test() {
    console.time('async timeout');
    let result = await new Promise((resolve, reject) => {
        console.log('in Promise');
        setTimeout(() => {
            resolve('Promise resolve');
        }, 1000);
    });
    console.log(result);
    console.timeEnd('async timeout');
}

// 以下两种写法都可以
// module.exports = {
//     test
// }
export { test };