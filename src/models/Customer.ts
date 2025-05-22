import { BankAccount, IAccount } from "./BankAccount";
import { SavingsAccount } from "./SavingsAccount";
import { CheckingAccount } from "./CheckingAccount";
import { generateId } from "../utils/generateId";

export class Customer {
  public readonly customerId: string;
  public readonly name: string;
  public address: string;
  public readonly dateOfBirth: Date;
  private accounts: IAccount[] = [];
  public static readonly minAgeToOpenAccount = 18;

  constructor(name: string, address: string, dateOfBirth: string | Date) {
    this.customerId = generateId("cust_");
    this.name = name;
    this.address = address;
    this.dateOfBirth = new Date(dateOfBirth);
  }

  public getAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const m = today.getMonth() - this.dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }

  public openAccount(
    accountType: "savings" | "checking",
    initialDeposit: number
  ): IAccount | null {
    if (this.getAge() < Customer.minAgeToOpenAccount) return null;
    let account: IAccount;
    if (accountType === "savings") {
      account = new SavingsAccount(this.name, initialDeposit);
    } else if (accountType === "checking") {
      account = new CheckingAccount(this.name, initialDeposit);
    } else {
      return null;
    }
    this.accounts.push(account);
    return account;
  }

  public closeAccount(accountNumber: string): boolean {
    const idx = this.accounts.findIndex(
      (acc) => acc.accountNumber === accountNumber
    );
    if (idx === -1 || this.accounts[idx].getBalance() !== 0) return false;
    this.accounts.splice(idx, 1);
    return true;
  }

  public getTotalBalance(): number {
    return this.accounts.reduce((total, acc) => total + acc.getBalance(), 0);
  }

  public getCustomerSummary(): string {
    const accountSummaries = this.accounts
      .map((acc) => `  - ${acc.getAccountSummary()}`)
      .join("\n");
    return `Customer: ${this.name} (ID: ${
      this.customerId
    }), Age: ${this.getAge()}
Address: ${this.address}
Accounts (${this.accounts.length}):
${accountSummaries || "  No accounts yet."}
Total Balance Across All Accounts: $${this.getTotalBalance().toFixed(2)}`;
  }

  public get accountsList(): IAccount[] {
    return this.accounts;
  }
}
