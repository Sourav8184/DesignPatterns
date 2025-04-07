# 🧩 Singleton Design Pattern

- The Singleton Design Pattern is a creational design pattern that ensures a class has only one instance and provides a global access point to that instance.

### Why Use the Singleton Pattern?

- Control Object Creation: Ensures only one instance of the class is created, preventing unnecessary memory usage.

- Global Access Point: Provides a single access point to the instance throughout the application.

- Thread Safety: The Singleton pattern ensures that the creation of the instance is thread-safe, preventing multiple threads from creating multiple instances simultaneously.

- Resource Management: Useful for managing shared resources like database connections, logging systems, and configuration settings.

#### 1️⃣ Database Connection Manager

- A database connection should be created once and shared to prevent multiple expensive connections.

```typescript
class DBConnectionPool {
  private static instance: DBConnectionPool;

  // Private constructor to prevent direct instantiation
  private constructor() {
    // Initialize connection pool (e.g., create pool, configure connections)
    console.log("🔧 Initializing DB Connection Pool...");
  }

  // Static method to get the single instance
  public static getInstance(): DBConnectionPool {
    if (!DBConnectionPool.instance) {
      DBConnectionPool.instance = new DBConnectionPool();
    }
    return DBConnectionPool.instance;
  }

  // Sample method to simulate getting a connection
  public getConnection(): void {
    console.log("🔌 Getting a DB connection from the pool...");
  }
}
```

#### 2️⃣ Logger (Logging System)

A single logger instance ensures that all logs are written to the same file or output stream.

```typescript
class Logger {
  private static instance: Logger;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to get the single shared instance
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Logging method
  public log(msg: string): void {
    console.log(`[LOG] ${msg}`);
  }
}
```

#### 3️⃣ Thread Safety in Singleton Pattern

- Problem: Multiple Threads Creating Multiple Instances
  When multiple threads access a singleton class at the same time, it may break the singleton rule and create multiple instances, leading to unexpected behavior.

- Example Scenario
  Imagine a scenario where multiple threads are trying to access a Database Connection Manager:

```java
public class Singleton {
    private static Singleton instance;

    private Singleton() { }

    public static Singleton getInstance() {
        if (instance == null) {  // Thread 1 and Thread 2 both pass this check
            instance = new Singleton();  // Thread 1 and Thread 2 both create instances
        }
        return instance;
    }
}
```

#### Problem

- Suppose Thread-1 and Thread-2 both check if (instance == null) at the same time.

- Since instance is not yet created, both threads pass the condition.

- Both threads create separate instances, violating the Singleton rule.

#### Solution: Making Singleton Thread-Safe

- Method : Synchronized Method
- The synchronized keyword ensures that only one thread can access the method at a time.

- This prevents multiple instances from being created.

```java
public class Singleton {
    private static Singleton instance;

    private Singleton() { }

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

### Steps to Implement Singleton Pattern

#### 1️⃣ Make the constructor private

- This prevents other classes from creating new instances.

#### 2️⃣ Create a static instance variable

- This will hold the single instance of the class.

#### 3️⃣ Provide a public static method (getInstance())

- This method returns the single instance, creating it if necessary.

#### 4️⃣ Ensure Thread Safety (if needed)

- Use synchronized, double-checked locking, or eager initialization to prevent multiple threads from creating multiple instances.

### Types of Implementation:

#### 1️⃣ Basic Singleton (Lazy Initialization)

```java
public class Singleton {
    private static Singleton instance;  // Step 2: Static instance

    private Singleton() { }  // Step 1: Private constructor

    public static Singleton getInstance() {  // Step 3: Public method to get instance
        if (instance == null) {
            instance = new Singleton();  // Create only if not created
        }
        return instance;
    }

    public void showMessage() {
        System.out.println("Singleton Instance Accessed!");
    }
}
```

#### 2️⃣ Thread-Safe Singleton (Using synchronized Method)

```java
public class Singleton {
    private static Singleton instance;

    private Singleton() { }

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

#### 3️⃣ Best Practice: Thread-Safe Singleton (Double-Checked Locking)

```java
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() { }

    public static Singleton getInstance() {
        if (instance == null) {  // First Check
            synchronized (Singleton.class) {
                if (instance == null) {  // Second Check
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

#### 4️⃣ Eager Initialization (Simple & Safe)

```java
public class Singleton {
    private static final Singleton instance = new Singleton(); // Step 2: Create instance immediately

    private Singleton() { }  // Step 1: Private constructor

    public static Singleton getInstance() {  // Step 3: Public method
        return instance;
    }
}
```

# 🧩 Factory Design Pattern

- The Factory Design Pattern is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. Instead of using the new keyword, the Factory Method is used to create objects.

### Why Use Factory Design Pattern?

#### 1️⃣ Encapsulation of Object Creation – Hides the object creation logic from the client.

- The client (user of the class) doesn't need to know how the object is created. The factory hides the complex logic of creating an object.

#### 🎯 Why it’s useful:

- Reduces complexity in the main code

- Keeps object creation logic in one place

- Makes your code cleaner and easier to manage

#### 📦 Example:

- Instead of this in client code:

```typescript
Shape shape = new Circle(); // tight coupling
```

- You do this:

```typescript
Shape shape = ShapeFactory.getShape("circle"); // factory handles creation
```

#### 2️⃣ Loose Coupling – The client code depends on an interface, not specific implementations.

- The client code only knows about the interface or abstract class, not the specific class being used.

#### 🎯 Why it’s useful:

- Makes the system flexible and easy to extend

- You can change the implementation without changing client code

- Encourages programming to interfaces, not implementations

#### 🧩 Example:

- Your client code works with:

```typescript
interface Shape { void draw(); }
```

- It doesn't care whether it's a Circle, Square, or Rectangle.

- Factory handles it internally.

#### 3️⃣ Improved Code Maintainability – Adding new classes does not require changes in client code.

- You can add or remove object types without modifying the client code.

#### 🎯 Why it’s useful:

- Follows the Open/Closed Principle (open for extension, closed for modification)

- Less risk of bugs when making changes

- Easier to update or upgrade specific classes

#### 🛠️ Example:

- Want to add a Triangle shape?
- Just update the factory:

```typescript
if (type.equals("triangle")) return new Triangle();
```

- No changes in client code!

#### 4️⃣ Code Reusability – Centralized object creation improves code reusability.

- The factory method can be reused wherever you need to create those objects.

#### 🎯 Why it’s useful:

- Avoids repeating object creation logic

- Centralizes changes to creation logic

- Keeps code DRY (Don’t Repeat Yourself)

#### ♻️ Example:

- Any part of the application that needs a Shape object uses:

```typescript
Shape shape = ShapeFactory.getShape("circle");
```

- Same logic used everywhere
- Easy to test and debug

### Real-World Examples of Factory Design Pattern

- 🚗 Example 1: Car Manufacturing
  - Different car types (Sedan, SUV, Truck) can be created using a CarFactory instead of directly instantiating objects.

```typescript
Car car1 = CarFactory.getCar("SUV");
Car car2 = CarFactory.getCar("Sedan");
```

- 💳 Example 2: Payment System
  - A payment system where a factory creates objects of CreditCardPayment, PayPalPayment, or BankTransfer dynamically.

```typescript
Payment payment = PaymentFactory.getPayment("CreditCard");
payment.process();
```

- 🐶 Example 3: Animal Creation
  - A Zoo application where we create different animals (Dog, Cat, Tiger) using a Factory.

```typescript
Animal animal = AnimalFactory.getAnimal("Dog");
animal.speak(); // Output: "Woof Woof!"
```

### How to Implement Factory Pattern (Step by Step)

#### Step 1: Create an Interface or Abstract Class

- This defines the common methods for the objects created by the factory.

```typescript
interface Animal {
    void speak();
}
```

#### Step 2: Create Concrete Classes

- These are the actual classes that implement the interface.

```typescript
class Dog implements Animal {
    public void speak() {
    System.out.println("Woof Woof!");
    }
}

class Cat implements Animal {
    public void speak() {
    System.out.println("Meow Meow!");
    }
}
```

### Step 3: Create a Factory Class

- This class has a getAnimal() method to return different object types based on input.

```typescript
class AnimalFactory {
    public static Animal getAnimal(String type) {
    if (type.equalsIgnoreCase("Dog")) {
        return new Dog();
    } else if (type.equalsIgnoreCase("Cat")) {
        return new Cat();
    }
    return null;
    }
}
```

### Step 4: Use the Factory Class in Main Program

```typescript
public class FactoryPatternDemo {
    public static void main(String[] args) {
    Animal animal1 = AnimalFactory.getAnimal("Dog");
    animal1.speak(); // Output: Woof Woof!

    Animal animal2 = AnimalFactory.getAnimal("Cat");
    animal2.speak();  // Output: Meow Meow!
    }
}
```

# 🧩 Strategy Design Pattern

- The Strategy Pattern is a behavioral design pattern that allows you to define a family of algorithms, put each of them in a separate class, and make them interchangeable at runtime.

### ✅ When to Use Strategy Pattern

- When you have multiple variations of an algorithm or behavior

- When you want to choose behavior at runtime

- When you want to avoid large if/else or switch statements

- When behaviors are likely to change independently

### How to Implement Strategy Pattern (Step by Step)

#### Scenario: Payment Gateway

- You want to support multiple payment methods:

- 💳 Credit Card

- 🧾 UPI

- 💼 PayPal

#### 1️⃣ Strategy Interface

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}
```

#### 2️⃣ Concrete Strategies

```typescript
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Credit Card`);
  }
}

class UpiPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using UPI`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using PayPal`);
  }
}
```

#### 3️⃣ Context (uses the strategy)

```typescript
class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  pay(amount: number): void {
    this.strategy.pay(amount);
  }
}
```

#### ✅ Usage

```typescript
const strategy1 = new Strategy(new CreditCard());
strategy1.pay(100);

const strategy2 = new Strategy(new Upi());
strategy2.pay(200);

const strategy3 = new Strategy(new PayPal());
strategy3.pay(300);
```

#### ✅ Benefits

- 📦 Open/Closed Principle — Add new strategies without changing the client

- 🔄 Runtime flexibility — Change behavior on the fly

- 🔧 Reusability — Separate behavior into self-contained classes

#### 🧨 Without Strategy (Bad Approach)

```typescript
function pay(amount: number, method: string) {
  if (method === "card") {
    console.log("Paying by card...");
  } else if (method === "upi") {
    console.log("Paying by UPI...");
  }
  // etc.
}
```

- 👎 Difficult to maintain, extend, or test.
- 👎 Breaks the Single Responsibility Principle.

# 🧠 Core Difference

```typescript
🔁 Factory vs Strategy Design Pattern Comparison

✅ Purpose
- Factory: To create objects
- Strategy: To choose an algorithm/behavior at runtime

🧱 Focus
- Factory: Object creation
- Strategy: Object behavior

🎯 Used for
- Factory: Deciding which class instance to return
- Strategy: Deciding which behavior/algorithm to use

🧠 Logic lives in
- Factory: The Factory class (encapsulates object creation logic)
- Strategy: The Strategy classes (each has a different behavior implementation)

🔄 Change behavior
- Factory: No (it gives you an object, then you're on your own)
- Strategy: Yes! You can change the algorithm dynamically at runtime
```

# 🧩 What is the Observer Design Pattern

- The Observer Pattern is a behavioral design pattern where an object (called Subject) maintains a list of dependents (called Observers) and notifies them automatically of any changes to its state.When one object changes, all dependent objects are automatically updated.

### 📱 Real-Life Example: YouTube Channel

- 🧑‍🏫 You (Subject) are a YouTube Creator.

- 👥 Subscribers (Observers) want to be notified when you upload a video.

- When you publish a new video (change in state), all subscribers get a notification.

### 💻 Code Example

#### 🧪 Scenario: Weather Station

- We want to notify multiple displays (e.g., Mobile App, Website) whenever the temperature changes.

#### 1️⃣ Observer Interface

```typescript
interface Observer {
  update(temp: number): void;
}
```

#### 2️⃣ Subject Interface

```typescript
interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}
```

#### 3️⃣ Concrete Subject (WeatherStation)

```typescript
class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  setTemperature(temp: number): void {
    this.temperature = temp;
    this.notifyObservers();
  }

  notifyObservers(): void {
    for (let observer of this.observers) {
      observer.update(this.temperature);
    }
  }
}
```

#### 4️⃣ Concrete Observers (Displays)

```typescript
class MobileApp implements Observer {
  update(temp: number): void {
    console.log(`📱 Mobile App: Temperature updated to ${temp}°C`);
  }
}

class WebsiteDisplay implements Observer {
  update(temp: number): void {
    console.log(`💻 Website: Temperature is now ${temp}°C`);
  }
}
```

#### ✅ Usage

```typescript
const weatherStation = new WeatherStation();

const mobileApp = new MobileApp();
const websiteDisplay = new WebsiteDisplay();

weatherStation.addObserver(mobileApp);
weatherStation.addObserver(websiteDisplay);

weatherStation.setTemperature(28);
// Output:
// 📱 Mobile App: Temperature updated to 28°C
// 💻 Website: Temperature is now 28°C

weatherStation.setTemperature(31);
// Output:
// 📱 Mobile App: Temperature updated to 31°C
// 💻 Website: Temperature is now 31°C
```

# 🧩 Facade Design Pattern

- The Facade Pattern is a structural design pattern that provides a simplified interface to a complex system of classes, libraries, or APIs.

- Facade = One simple interface that calls multiple complex subsystems for you.

### 🏡 Real-Life Analogy

- 🧍‍♂️ You (Client) want to watch a movie at home:

#### You need to:

- Turn on the TV

- Switch to HDMI

- Start the speaker system

- Dim the lights

- Start the movie

- 💡 Instead, you press one button on your remote:
- ✅ "Watch Movie"

- 🎬 Behind that button is a facade that handles all those steps for you.

### 💻 Code Example in TypeScript

- 🧪 Scenario: Home Theater System

#### 1️⃣ Subsystem Classes (Individual components)

```typescript
class TV {
  on() {
    console.log("📺 TV is ON");
  }
  off() {
    console.log("📺 TV is OFF");
  }
}

class SoundSystem {
  on() {
    console.log("🔊 Sound System is ON");
  }
  off() {
    console.log("🔇 Sound System is OFF");
  }
}

class Lights {
  dim() {
    console.log("💡 Lights are dimmed");
  }
  on() {
    console.log("💡 Lights are ON");
  }
}

class MoviePlayer {
  play() {
    console.log("🎞️ Movie is playing");
  }
  stop() {
    console.log("⏹️ Movie stopped");
  }
}
```

#### 2️⃣ Facade Class

```typescript
class HomeTheaterFacade {
  private tv: TV;
  private sound: SoundSystem;
  private lights: Lights;
  private player: MoviePlayer;

  constructor(tv: TV, sound: SoundSystem, lights: Lights, player: MoviePlayer) {
    this.tv = tv;
    this.sound = sound;
    this.lights = lights;
    this.player = player;
  }

  watchMovie(): void {
    console.log("🎬 Setting up movie night...");
    this.lights.dim();
    this.tv.on();
    this.sound.on();
    this.player.play();
  }

  endMovie(): void {
    console.log("🔚 Shutting down movie setup...");
    this.player.stop();
    this.sound.off();
    this.tv.off();
    this.lights.on();
  }
}
```

#### 3️⃣ Client Code (You!)

```typescript
const tv = new TV();
const sound = new SoundSystem();
const lights = new Lights();
const player = new MoviePlayer();

const homeTheater = new HomeTheaterFacade(tv, sound, lights, player);

// One-line magic
homeTheater.watchMovie();

// Later...
homeTheater.endMovie();
```

#### 🟢 Output:

```types
🎬 Setting up movie night...
💡 Lights are dimmed
📺 TV is ON
🔊 Sound System is ON
🎞️ Movie is playing

🔚 Shutting down movie setup...
⏹️ Movie stopped
🔇 Sound System is OFF
📺 TV is OFF
💡 Lights are ON
```

#### 👨‍💻 Bonus Ideas:

- You can use this pattern for:

- Booking systems (travel, hotel)

- Food delivery (order, notify, assign rider, track)

- Microservices gateway (API Gateway facade)

# 🧩 Decorator Design Pattern

- The Decorator Pattern is a structural design pattern that: Allows you to dynamically add new behaviors or responsibilities to an object without modifying its structure or code.

### 🧠 Think of it like:

- Wrapping a gift 🎁 — each wrapper adds something (a label, a bow, a message) without changing the gift itself.

### 🛠 Why Use Decorator Pattern?

- ✅ Follows Open/Closed Principle – open for extension, closed for modification.

- ✅ Avoids subclass explosion (instead of creating many subclasses for every feature combination).

- ✅ Adds behavior at runtime, not compile time.

### 🏠 Real-world Example

- Example: Coffee Shop ☕
  You have a basic coffee. You want to add milk, sugar, whipped cream, etc., without modifying the base Coffee class.

### ✅ Step-by-Step Code

#### 1️⃣ Base Component (Interface)

```typescript
interface Coffee {
  cost(): number;
  description(): string;
}
```

#### 2️⃣ Concrete Component

```typescript
class SimpleCoffee implements Coffee {
  cost(): number {
    return 50;
  }

  description(): string {
    return "Simple coffee";
  }
}
```

#### 3️⃣ Decorator Base Class

```typescript
class CoffeeDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}
```

#### 4️⃣ Concrete Decorators

```typescript
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 20;
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
    return super.cost() + 10;
  }

  description(): string {
    return super.description() + ", Sugar";
  }
}
```

#### 5️⃣ Usage

```typescript
let coffee: Coffee = new SimpleCoffee();
console.log(coffee.description(), "₹" + coffee.cost());

coffee = new MilkDecorator(coffee);
console.log(coffee.description(), "₹" + coffee.cost());

coffee = new SugarDecorator(coffee);
console.log(coffee.description(), "₹" + coffee.cost());
```
