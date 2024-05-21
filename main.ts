#!/usr/bin/env node
import inquirer from "inquirer";

// 

// Bank Account Interface

interface BankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount: number):void
    deposit (amount: number):void
    checkBalance(): void
}

// Bank Account Class

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number, balance:number){
        this.accountNumber=accountNumber;
        this.balance=balance
    }
    // debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -=amount;
            console.log(`Withdrawl of $ ${amount} successful. Remaining balance: $${this.balance}`);
            
        }else{
            console.log("Insufficient Balance");
            
        }
    }
    // Credit Money
    deposit(amount: number): void {
        if(amount > 100){
              amount-=1;   // $1 charged if more than $100 is deposited
        }this.balance += amount;
        console.log(`Deposit of $${amount}successful.Remaining balance: $${this.balance}`);
        // Check Balance
    
    }
    // Check Balancde
    checkBalance(): void {
        console.log(`Current balance : $${this.balance}`);
         
    }
}
// Customer class
class customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;
    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount)
    {
        this.firstName=firstName
        this.lastName=lastName
        this.gender=gender
        this.age=age
        this.mobileNumber=mobileNumber
        this.account=account
    }
}
// Create Bank ACCOUNTS
const accounts:BankAccount[]=[
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000)
];
// const customers
const customers: customer[]=[
    new customer ("Parven","Jatoi","Female",33,3162935113,accounts[0]),
    new customer ("Adnan","Haider","Male",33,3162935113,accounts[1]),
    new customer ("Pari","adi","Female",33,3162935113,accounts[2]),
    
    
]
// Function to interact with bank account
 async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type:"number",
            message:"Enter you account number:"
        })
        const customer =customers.find(customer => customer.account.accountNumber ===accountNumberInput.accountNumber)
if(customer){
console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
const answer= await inquirer.prompt([{
    name:"select",
    type:"list",
    message:"select an operation",
    choices:["Deposit","Withdraw","Check Balance","Exist"]
}])
switch(answer.select){
    case"Deposit":
    const depositAmount= await inquirer.prompt({
        name :"amount",
        type:"number",
        message:"Enter the amount to deposit:"
    })
    customer.account.deposit(depositAmount.amount);
    break;
    case"Withdraw":
    const WithdrawAmount= await inquirer.prompt({
        name :"amount",
        type:"number",
        message:"Enter the amount to withdraw:"
    })
    customer.account.withdraw(WithdrawAmount.amount);
    break;
    case"Check Balance":
    customer.account.checkBalance();
    break;
case "Exist":
console.log("Existing Bank Programme");
console.log("\n  Thank you for using our  Bank services");
return;

    
   
    

}
}else{
    console.log("Invalid account number, Please try again");
    
}
}while(true)
}
service()