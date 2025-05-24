import { TransactionType } from "../data/customers";
import { Transaction } from "./Transaction";
import { AccountType } from "../data/customers";
import { BankAccount } from "./BankAccount";

export class CheckingAccount extends BankAccount{
    public accountType: AccountType;
    public overDraftLimit: number;
    constructor(name: string, initialDeposit = 0, overDraftLimit: number = 100){
        super(name, initialDeposit);
        this.accountType = "Checking";
        this.overDraftLimit = overDraftLimit;
    }
    public withdraw(amount: number, description: string = TransactionType.WithDrawal): boolean {
        if(amount <= 0 ){
            console.log(`You Can Not Withdraw Less Than 0`);
            return false;
        }
        if(this.balance + this.overDraftLimit < amount){
            console.log(`You Dont Have Enough Money. Your Balance: ${this.balance}, Trying To WithDraw ${amount}`);
            return false;
        }
        this.balance -= amount;
        const transaction = new Transaction(TransactionType.WithDrawal, amount, description);
        this.transactions.push(transaction);
        console.log(`Withdrew $${amount.toFixed(2)} from ${this.accountNumber}. New balance: $${this.balance.toFixed(2)}`);
        return true;
    }
    public getAccountSummary(): string {
        return `Checking Account: #${this.accountNumber}, Owner: ${this.name}, Balance: $${this.balance.toFixed(2)}, Overdraft Limit: $${this.overDraftLimit.toFixed(2)}`;
    }    
}