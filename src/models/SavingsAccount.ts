import { TransactionType } from "../data/customers";
import { Transaction } from "./Transaction";
import { AccountType } from "../data/customers";
import { BankAccount } from "./BankAccount";

export class SavingsAccount extends BankAccount{
    public accountType: AccountType;
    public interestRate: number;
    constructor(name: string, intialDeposit = 0, interestRate: number = 0.01){
        super(name, intialDeposit)
        this.accountType = "Savings";
        this.interestRate = interestRate
    }
    public applyInterest(){
        const interestAmount = this.balance * this.interestRate;
        if(interestAmount > 0){
            this.balance += interestAmount;
            const transaction = new Transaction(TransactionType.Interest, interestAmount, "Interest Applied");
            this.transactions.push(transaction);
            console.log(`Applied interest of $${interestAmount.toFixed(2)} to ${this.accountNumber}. New balance: $${this.balance.toFixed(2)}`);
            return true
        }
        return false;
    }
    public getAccountSummary(): string {
        return `Savings Account: #${this.accountNumber} , Owner: ${this.name}, Balance: $${this.balance.toFixed(2)}, Interest Rate: ${(this.interestRate * 100).toFixed(2)}%`;
    }
}