interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCard implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Credit Card`);
  }
}

class Upi implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Upi`);
  }
}

class PayPal implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using PayPal`);
  }
}

class Strategy {
  private instanct: PaymentStrategy;
  constructor(instance: PaymentStrategy) {
    this.instanct = instance;
  }
  pay(amount: number): void {
    this.instanct.pay(amount);
  }
}

const strategy1 = new Strategy(new CreditCard());
strategy1.pay(100);

const strategy2 = new Strategy(new Upi());
strategy2.pay(200);

const strategy3 = new Strategy(new PayPal());
strategy3.pay(300);
