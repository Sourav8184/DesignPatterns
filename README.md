# 🧩 Singleton Design Pattern

- The Singleton Design Pattern is a creational design pattern that ensures a class has only one instance and provides a global access point to that instance.

### Why Use the Singleton Pattern?

- Control Object Creation: Ensures only one instance of the class is created, preventing unnecessary memory usage.

- Global Access Point: Provides a single access point to the instance throughout the application.

- Thread Safety: The Singleton pattern ensures that the creation of the instance is thread-safe, preventing multiple threads from creating multiple instances simultaneously.

- Resource Management: Useful for managing shared resources like database connections, logging systems, and configuration settings.

#### 1️⃣ Database Connection Manager

- A database connection should be created once and shared to prevent multiple expensive connections.

```java
public class DBConnectionPool {
    private static DBConnectionPool instance;

    private DBConnectionPool() {
        // Initialize pool (e.g., setup connections)
    }

    public static DBConnectionPool getInstance() {
        if (instance == null) {
            instance = new DBConnectionPool();
        }
        return instance;
    }

    public void getConnection() {
        System.out.println("Getting a DB connection from the pool...");
    }
}
```

#### 2️⃣ Logger (Logging System)

A single logger instance ensures that all logs are written to the same file or output stream.

```java
public class Logger {
    private static Logger instance;

    private Logger() {}

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String msg) {
        System.out.println("[LOG] " + msg);
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

```java
Shape shape = new Circle(); // tight coupling
```

- You do this:

```java
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

```java
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

```java
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

```java

Shape shape = ShapeFactory.getShape("circle");
```

- Same logic used everywhere
- Easy to test and debug

### Real-World Examples of Factory Design Pattern

- 🚗 Example 1: Car Manufacturing
  - Different car types (Sedan, SUV, Truck) can be created using a CarFactory instead of directly instantiating objects.

```java
Car car1 = CarFactory.getCar("SUV");
Car car2 = CarFactory.getCar("Sedan");
```

- 💳 Example 2: Payment System
  - A payment system where a factory creates objects of CreditCardPayment, PayPalPayment, or BankTransfer dynamically.

```java
Payment payment = PaymentFactory.getPayment("CreditCard");
payment.process();
```

- 🐶 Example 3: Animal Creation
  - A Zoo application where we create different animals (Dog, Cat, Tiger) using a Factory.

```java
Animal animal = AnimalFactory.getAnimal("Dog");
animal.speak(); // Output: "Woof Woof!"
```

### How to Implement Factory Pattern (Step by Step)

#### Step 1: Create an Interface or Abstract Class

- This defines the common methods for the objects created by the factory.

```java
interface Animal {
    void speak();
}
```

#### Step 2: Create Concrete Classes

- These are the actual classes that implement the interface.

```java
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

```java
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

```java
public class FactoryPatternDemo {
    public static void main(String[] args) {
    Animal animal1 = AnimalFactory.getAnimal("Dog");
    animal1.speak(); // Output: Woof Woof!

    Animal animal2 = AnimalFactory.getAnimal("Cat");
    animal2.speak();  // Output: Meow Meow!
    }
}
```
