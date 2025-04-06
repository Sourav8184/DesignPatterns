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
