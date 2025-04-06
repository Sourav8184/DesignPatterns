"use strict";
class SingletonClass {
    constructor() { }
    static getInstance() {
        if (!SingletonClass.instance) {
            SingletonClass.instance = new SingletonClass();
        }
        return SingletonClass.instance;
    }
}
// const instance1 = new SingletonClass(); because constructor is private
const instance1 = SingletonClass.getInstance();
const instance2 = SingletonClass.getInstance();
const instance3 = SingletonClass.getInstance();
if (instance1 === instance2 &&
    instance2 === instance3 &&
    instance3 === instance1) {
    console.log("All instance are same");
}
else {
    console.log("All instance are not same");
}
