"use strict";
class SimpleCoffee {
    cost() {
        return 50;
    }
    description() {
        return "Simple coffee";
    }
}
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    cost() {
        return this.coffee.cost();
    }
    description() {
        return this.coffee.description();
    }
}
class MilkDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    cost() {
        return super.cost() + 10;
    }
    description() {
        return super.description() + ", Milk";
    }
}
class SugarDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    cost() {
        return super.cost() + 5;
    }
    description() {
        return super.description() + ", Sugar";
    }
}
// Simple coffee
let coffee = new SimpleCoffee();
console.log(coffee.description(), "₹" + coffee.cost());
// Simple coffee + Milk
coffee = new MilkDecorator(coffee);
console.log(coffee.description(), "₹" + coffee.cost());
// Simple coffee + Milk  + Sugar
coffee = new SugarDecorator(coffee);
console.log(coffee.description(), "₹" + coffee.cost());
