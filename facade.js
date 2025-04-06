"use strict";
class InventoryService {
    checkStock(productId) {
        console.log(`✅ Checking stock for product: ${productId}`);
        return true; // assuming always in stock
    }
}
class PaymentService {
    processPayment(userId, amount) {
        console.log(`💰 Processing payment of ₹${amount} for user: ${userId}`);
        return true; // assuming success
    }
}
class InvoiceService {
    generateInvoice(productId, userId) {
        console.log(`🧾 Invoice generated for ${productId} and user ${userId}`);
    }
}
class NotificationService {
    sendConfirmationEmail(userId) {
        console.log(`📧 Email sent to user ${userId}: Order Confirmed!`);
    }
}
class OrderFacade {
    constructor() {
        this.inventory = new InventoryService();
        this.payment = new PaymentService();
        this.invoice = new InvoiceService();
        this.notification = new NotificationService();
    }
    placeOrder(productId, userId) {
        console.log("🛒 Starting order placement process...\n");
        if (!this.inventory.checkStock(productId)) {
            console.log("❌ Product is out of stock.");
            return;
        }
        const amount = 499; // Example fixed price
        if (!this.payment.processPayment(userId, amount)) {
            console.log("❌ Payment failed.");
            return;
        }
        this.invoice.generateInvoice(productId, userId);
        this.notification.sendConfirmationEmail(userId);
        console.log("\n✅ Order placed successfully!");
    }
}
const orderFacade = new OrderFacade();
orderFacade.placeOrder("Product123", "UserABC");
// 💼 Why Use Facade Here?
// You hide internal service complexities from the app/frontend.
// Clean and easy-to-read method like placeOrder() instead of 5 different API calls.
// Easy to update/change the internal logic (e.g., switch to Stripe, Razorpay, etc.) without breaking frontend/backend logic.
