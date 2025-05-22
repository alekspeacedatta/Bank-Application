import { Customer } from "../models/Customer";
import { IAccount } from "../models/BankAccount";

export class Bank {
  public readonly bankName: string;
  private customers: Customer[] = [];
  private allAccounts: Map<string, IAccount> = new Map();

  constructor(bankName: string) {
    this.bankName = bankName;
  }

  public addCustomer(
    name: string,
    address: string,
    dateOfBirth: string | Date
  ): Customer {
    const customer = new Customer(name, address, dateOfBirth);
    this.customers.push(customer);
    return customer;
  }

  public findCustomer(customerId: string): Customer | undefined {
    return this.customers.find((cust) => cust.customerId === customerId);
  }

  public openCustomerAccount(
    customerId: string,
    accountType: "savings" | "checking",
    initialDeposit: number
  ): IAccount | null {
    const customer = this.findCustomer(customerId);
    if (!customer) return null;
    const account = customer.openAccount(accountType, initialDeposit);
    if (account) {
      this.allAccounts.set(account.accountNumber, account);
    }
    return account;
  }

  public findAccount(accountNumber: string): IAccount | undefined {
    return this.allAccounts.get(accountNumber);
  }

  public performTransfer(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number,
    description = "Transfer"
  ): boolean {
    if (amount <= 0) return false;
    const fromAccount = this.findAccount(fromAccountNumber);
    const toAccount = this.findAccount(toAccountNumber);
    if (!fromAccount || !toAccount || fromAccount === toAccount) return false;
    if (!fromAccount.withdraw(amount, `${description} to ${toAccountNumber}`))
      return false;
    if (
      !toAccount.deposit(amount, `${description} from ${fromAccountNumber}`)
    ) {
      fromAccount.deposit(
        amount,
        `ROLLBACK: Failed transfer to ${toAccountNumber}`
      );
      return false;
    }
    return true;
  }

  public generateBankReport(): string {
    let totalAssets = 0;
    this.allAccounts.forEach((acc) => (totalAssets += acc.getBalance()));
    const customerSummaries = this.customers
      .map((cust) => cust.getCustomerSummary())
      .join("\n---\n");
    return `
--- ${this.bankName} - Bank Report ---
Total Customers: ${this.customers.length}
Total Accounts: ${this.allAccounts.size}
Total Bank Assets: $${totalAssets.toFixed(2)}

Customer Summaries:
${customerSummaries}
--- End of Report ---
`;
  }
}
