export function csl() {
    require(['./bar.js'], function (module) {
        // console.log(module)
        module.test();
        console.log(11);
    });
}