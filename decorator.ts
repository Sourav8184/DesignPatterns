interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 50;
  }

  description(): string {
    return "Simple coffee";
  }
}

class CoffeeDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 10;
  }

  description(): string {
    return super.description() + ", Milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 5;
  }

  description(): string {
    return super.description() + ", Sugar";
  }
}

// Simple coffee
let coffee: SimpleCoffee = new SimpleCoffee();
console.log(coffee.description(), "₹" + coffee.cost());

// Simple coffee + Milk
coffee = new MilkDecorator(coffee);
console.log(coffee.description(), "₹" + coffee.cost());

// Simple coffee + Milk  + Sugar
coffee = new SugarDecorator(coffee);
console.log(coffee.description(), "₹" + coffee.cost());
