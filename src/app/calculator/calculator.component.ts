import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  currentNumber = '0';
  firstOperand :any = null;
  operator:string = '';
  waitForSecondNumber = false;

  constructor(private commonService: CommonService,private router: Router) { }


  public getNumber(v: string){
    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }
  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }
  private doCalculation(op:any , secondOp:any){
    debugger
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
    }
  }
  public getOperation(op: string){
    console.log(op);

    if(this.firstOperand ===null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
    debugger

      let Model = {
        FirstValue: this.firstOperand,
        SecondValue:Number(this.currentNumber),
        Operator: this.operator,
        CalculateValue:0,
      };
      const result = this.doCalculation(this.operator , Number(this.currentNumber));
      Model.CalculateValue=(result)
      this.currentNumber = String(result);
      if(this.operator!= '=')
      this.save(Model);
      
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);

  }
  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = '';
    this.waitForSecondNumber = false;
  }
  save(Model:any)
  {
    
    this.commonService.doPost("Calculate/save", Model).subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }

      },
      error: (error) => {
      }
    });
  }
  login()
  {
    this.router.navigate(['/login']);
  }
}
