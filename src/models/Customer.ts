import { generateId } from "../utils/generateId";
import { AccountType } from "../data/customers";
import { BankAccount } from "./BankAccount";
import { SavingsAccount } from "./SavingsAccount";
import { CheckingAccount } from "./CheckingAccount";
export class Customer {
    public readonly customerId: string;
    public readonly name: string;
    public readonly address: string;
    public readonly dateOfBirth: Date;
    private accounts: BankAccount[];
    constructor(name: string, address: string, dateOfBirth: string | Date){
        this.customerId = generateId("cust_");
        this.name = name;
        this.address = address;
        this.dateOfBirth = new Date(dateOfBirth);
        this.accounts = [];
    }
    openAccount(accountType: AccountType, intialDeposit: number){
        let account;
        if(accountType === "Savings"){
            account = new SavingsAccount(this.name, intialDeposit);
        }else if (accountType === "Checking"){
            account = new CheckingAccount(this.name, intialDeposit);
        }else{
            throw new Error("error")
        }
        this.accounts.push(account);
        return account
    }
    closeAccount(accountNumber: string){
        const accountIndex = this.accounts.findIndex(account => account.accountNumber === accountNumber);
        if(accountIndex === -1){
            console.error(`Account ${accountNumber} Not Found For Customer ${this.name}`);
            return false;
        }
        if(this.accounts[accountIndex].getBalance() !== 0){
            console.error(`Account ${accountNumber} Must Be zero To Close, Your Current Balance: ${this.accounts[accountIndex].getBalance()}`);
            return false
        }
        const closedAccount = this.accounts.splice(accountIndex, 1)[0];
        console.log(`Account ${closedAccount.accountNumber} Is Closed For ${this.name}}`);
        return true;        
    }
    getAge(): number{
        const today = new Date();
        let age = today.getFullYear() - this.dateOfBirth.getFullYear();
        const m = today.getMonth() - this.dateOfBirth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }
    getTotalBalance():number{
        let totalBalance = 0;
        this.accounts.forEach(account => {
            totalBalance += account.getBalance();
        });
        return totalBalance;
    }
    getCustomerSummery(){
        console.log(`\nCustomer ID: ${this.customerId}, Customer Name: ${this.name}, Age: ${this.getAge()}`);
        console.log(`Address: ${this.address}`);
        console.log(`Accounts Quantity: ${this.accounts.length}:`);
        if(this.accounts.length < 0){
            console.log("No Accounts Yet");
        }else{
            this.accounts.forEach(account => console.log(` -${account.getAccountSummary()}`));
        }
        console.log(`Total Balance Across All Accounts: $${this.getTotalBalance().toFixed(2)}`);
    }
}