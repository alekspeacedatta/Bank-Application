import { Bank } from "./services/Bank";

console.log("--- Bank Application Starting ---");

const myBank = new Bank("Global Trust Bank");

const customer1 = myBank.addCustomer(
  "Alice Wonderland",
  "123 Rabbit Hole Ln",
  "1990-05-15"
);
const customer2 = myBank.addCustomer(
  "Bob The Builder",
  "456 Construction Rd",
  "1985-11-20"
);

const aliceSavings = myBank.openCustomerAccount(
  customer1.customerId,
  "savings",
  1000
);
const aliceChecking = myBank.openCustomerAccount(
  customer1.customerId,
  "checking",
  500
);

if (aliceSavings) {
  aliceSavings.deposit(200, "Birthday gift");
  (aliceSavings as any).applyInterest?.();
}
if (aliceChecking) {
  aliceChecking.withdraw(50, "Groceries");
}

const bobChecking = myBank.openCustomerAccount(
  customer2.customerId,
  "checking",
  2000
);
if (bobChecking) {
  bobChecking.withdraw(100, "Tools");
}

const alicePrimary = customer1.accountsList.find(
  (acc) => (acc as any).accountType === "Checking"
);
const bobPrimary = customer2.accountsList.find(
  (acc) => (acc as any).accountType === "Checking"
);
if (alicePrimary && bobPrimary) {
  myBank.performTransfer(
    alicePrimary.accountNumber,
    bobPrimary.accountNumber,
    150,
    "Payment for services"
  );
}

if (alicePrimary) {
  console.log(alicePrimary.getTransactionHistory());
}

console.log(myBank.generateBankReport());
console.log("--- Bank Application Finished ---");
