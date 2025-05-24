import { Customer } from "./Customer";
import { BankAccount } from "./BankAccount";
import { AccountType } from "../data/customers";
import { Transaction } from "./Transaction";
import { TransactionType } from "../data/customers";
export class Bank {
    public readonly bankName: string
    private customers: Customer[];
    public allAccounts: Map<string, BankAccount>;
    constructor(bankName: string) {
        this.bankName = bankName;
        this.customers = [];
        this.allAccounts = new Map<string, BankAccount>();
    }
    addCustomer(name: string, address: string, dateOfBirth: string | Date): Customer {
        const customer = new Customer(name, address, dateOfBirth);
        this.customers.push(customer);
        return customer
    }
    findCustomer(customerId: string){
        const customer = this.customers.find(customer => customer.customerId === customerId);
        return customer;
    }
    openCustomerAccount(customerId: string, accountType: AccountType, initialDeposit: number){
        const customer = this.findCustomer(customerId);
        if(!customer){
            throw new Error("Customer Does Not Exsist");
        }
        const account = customer.openAccount(accountType, initialDeposit);
        if(account){
            this.allAccounts.set(account.accountNumber, account);
        }
        return account;
    }
    findAccount(accountNumber: string): BankAccount{
        const account = this.allAccounts.get(accountNumber);
        if(!account){
            throw new Error("error: Account Doesn't Exsist")
        }
        return account;
    }
    performTransfer(fromAccountNumber: string, toAccountNumber:string, amount:number, description = "Transfer"): boolean{
        if(amount <= 0){
            throw new Error("Amount Is Less Than Zero");
        }
        const fromAccount = this.findAccount(fromAccountNumber);
        const toAccount = this.findAccount(toAccountNumber);
        if(!fromAccount){
            throw new Error("Your Account Does Not Exsist");
        }
        if(!toAccount){
            throw new Error("Account You Want To Transfer Money Does Not Exsist");
        }
        if(fromAccount === toAccount){
            throw new Error("You Can Not Transfer Money To The Same Account");   
        }
        const withdrawSuccess = fromAccount.withdraw(amount, `${description} to ${toAccountNumber}`);
        if(withdrawSuccess){
            const depositSuccess = toAccount.deposit(amount, `${description} from ${fromAccountNumber}`);
            if(!depositSuccess){
                fromAccount.deposit(amount, `ROLLBACK: Failed transfer to ${toAccountNumber}`);
                throw new Error("You Can Not Transfer Money To This Account");
            }else{
                console.log(`Money Is Transferd TO ${toAccountNumber} From ${fromAccountNumber}`);
                const fromTransaction = new Transaction(TransactionType.TransferOut, amount, `Transfered to ${toAccountNumber}`);
                return true;
            }
        }else{
            console.log(`Transfer Failed: You Can Not Transfer From ${fromAccountNumber} Account`);
            return false;
        }
    }
    generateBankReport(){
        console.log(`Bank Report for ${this.bankName}:`);
        console.log(`Total Customers: ${this.customers.length}`);
        console.log(`Total Accounts: ${this.allAccounts.size}`);
        let totalBalance = 0;
        this.allAccounts.forEach(account => {
            totalBalance += account.getBalance();
        });
        console.log(`Total Balance: $${totalBalance.toFixed(2)}`);
        console.log(`Customer Summaries:`);
        this.customers.forEach(customer => customer.getCustomerSummery());   
    }
}