"use strict";
class Dog {
    speak() {
        console.log("Woof Woof!");
    }
}
class Cat {
    speak() {
        console.log("Meow Meow!");
    }
}
class AnimalFactory {
    static getAnimal(type) {
        if (type.toLowerCase() === "dog") {
            return new Dog();
        }
        else if (type.toLowerCase() === "cat") {
            return new Cat();
        }
        return null;
    }
}
const animal1 = AnimalFactory.getAnimal("Dog");
animal1 === null || animal1 === void 0 ? void 0 : animal1.speak(); // Output: Woof Woof!
const animal2 = AnimalFactory.getAnimal("Cat");
animal2 === null || animal2 === void 0 ? void 0 : animal2.speak(); // Output: Meow Meow!
