import { Bank } from "./models/Bank";
import { TransactionType } from "./data/customers";


const myBank = new Bank("TBC");
const customer1 = myBank.addCustomer("aleksandre", "mosashvilis2", "2004-06-26");
const customer2 = myBank.addCustomer("nika", "mcxetis qucha", "2003-04-22");

const aleksandreSavings = myBank.openCustomerAccount(customer1.customerId, "Savings", 1000);
const aleksandreChecking = myBank.openCustomerAccount(customer1.customerId, "Checking", 5000)
const nikasSavings = myBank.openCustomerAccount(customer2.customerId, "Savings", 1000);
const nikasChecking = myBank.openCustomerAccount(customer2.customerId, "Checking", 5000);

nikasSavings.deposit(1000, TransactionType.Depost);
nikasSavings.withdraw(500, TransactionType.WithDrawal);
aleksandreSavings.deposit(2000, TransactionType.Depost);
aleksandreChecking.withdraw(1000, TransactionType.WithDrawal);
aleksandreChecking.deposit(2000, TransactionType.Depost);
nikasChecking.withdraw(1000, TransactionType.WithDrawal);
nikasChecking.deposit(2000, TransactionType.Depost);

myBank.performTransfer(nikasSavings.accountNumber, aleksandreSavings.accountNumber, 900);

aleksandreSavings.getTransactionsHistory();
aleksandreChecking.getTransactionsHistory();

myBank.generateBankReport();
