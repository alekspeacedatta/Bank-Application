import { generateId } from "../utils/generateId";
import { TransactionType } from "../data/customers";
import { Transaction } from "./Transaction";

export class BankAccount{
    public readonly accountNumber: string;
    public name: string;
    public intialDeposit: number;
    public balance: number;
    public transactions: Transaction[];
    constructor(name: string, intialDeposit = 0){
        this.accountNumber = generateId("acc_");
        this.name = name;
        this.intialDeposit = intialDeposit
        this.balance = intialDeposit;
        this.transactions = [];
    }
    deposit(amount:number, description?: string): boolean{
        if(amount < 0){
            throw new Error ("Amount Is Less Than Zero");
        }
        this.balance += amount;
        const transaction = new Transaction(TransactionType.Depost, amount, description);
        this.transactions.push(transaction);
        console.log(`Deposited $${amount.toFixed(2)} to ${this.accountNumber}. New balance: $${this.balance.toFixed(2)}`);
        return true;
    }
    public withdraw(amount:number, description?: string): boolean{
        if(amount < 0){
            throw new Error ("Amount Is Less Than Zero");
        }
        if(this.balance < amount){
            console.log(`You Dont Have Enough Money. Your Balance: ${this.balance}, Trying To WithDraw ${amount}`);
            return false;
        }
        this.balance -= amount;
        const transaction = new Transaction(TransactionType.WithDraw, amount, description);
        this.transactions.push(transaction);
        console.log(`Withdrew $${amount.toFixed(2)} from ${this.accountNumber}. New balance: $${this.balance.toFixed(2)}`);
        return true;
    }
    public applyInterest(){
    }
    getBalance(): number{
        return this.balance;
    }
    getTransactionsHistory(){
        console.log(`Transaction History for: ${this.accountNumber}, Owner Name: ${this.name}, Account Type: ${this.constructor.name}`);
        this.transactions.forEach(txn => console.log(txn.getDetails()));
        return this.transactions.map(txn => txn.getDetails());
    }
    public getAccountSummary(): string {
        return `Account Owner: ${this.name}, Account Balance: $${this.balance.toFixed(2)}`;
    }
}