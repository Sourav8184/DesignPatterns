"use strict";
class CreditCard {
    pay(amount) {
        console.log(`Paid ₹${amount} using Credit Card`);
    }
}
class Upi {
    pay(amount) {
        console.log(`Paid ₹${amount} using Upi`);
    }
}
class PayPal {
    pay(amount) {
        console.log(`Paid ₹${amount} using PayPal`);
    }
}
class Strategy {
    constructor(instance) {
        this.instanct = instance;
    }
    pay(amount) {
        this.instanct.pay(amount);
    }
}
const strategy1 = new Strategy(new CreditCard());
strategy1.pay(100);
const strategy2 = new Strategy(new Upi());
strategy2.pay(200);
const strategy3 = new Strategy(new PayPal());
strategy3.pay(300);
