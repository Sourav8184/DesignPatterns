interface Animal {
  speak(): void;
}

class Dog implements Animal {
  speak(): void {
    console.log("Woof Woof!");
  }
}

class Cat implements Animal {
  speak(): void {
    console.log("Meow Meow!");
  }
}

class AnimalFactory {
  static getAnimal(type: string): Animal | null {
    if (type.toLowerCase() === "dog") {
      return new Dog();
    } else if (type.toLowerCase() === "cat") {
      return new Cat();
    }
    return null;
  }
}

const animal1 = AnimalFactory.getAnimal("Dog");
animal1?.speak(); // Output: Woof Woof!

const animal2 = AnimalFactory.getAnimal("Cat");
animal2?.speak(); // Output: Meow Meow!
