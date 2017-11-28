 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';

 var calculatePayment = function(principal, years, rate) {
   var monthlyRate = rate/100/12;
   var monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
   var balance = principal;

   for (var i = 0; i < years; i++) {
     var interestY = 0;
     var principalY = 0;
     for (var j = 0; j < 12; j++) {
       var interestM = balance * monthlyRate;
       var principalM = monthlyPayment - interestM;
       interestY += interestM;
       principalY += principalM;
       balance -= principalM;
     }
   }
   return {monthlyPayment: monthlyPayment};
 };

 var createReactClass = require('create-react-class');

 var Header = createReactClass({
   render: function() {
     return (
       <header>
            <h1>{this.props.title}</h1>
       </header>
     );
   }
 });

 var MortgageCalculator = createReactClass({
   getInitialState: function() {
     return {
       principal: this.props.principal,
       years: this.props.years,
       rate: this.props.rate
     };
   },

   principalChange: function(e) {
     this.setState({principal: e.target.value});
   },
   yearsChange: function(e) {
     this.setState({years: e.target.value});
   },
   rateChange: function(e) {
     this.setState({rate: e.target.value});
   },
   render: function() {
     var payment = calculatePayment(this.state.principal, this.state.years, this.state.rate);
     var monthlyPayment = payment.monthlyPayment;

     return (
       <div className = "content">
          <div className = "form">
              <div>
                  <label> Principal: </label>
                  <input type="text" value= {this.state.principal} onChange={this.principalChange}/>
              </div>

              <div>
                  <label> Years: </label>
                  <input type="text" value={this.state.years} onChange={this.yearsChange}/>
              </div>

              <div>
                  <label htmlFor="rate"> Rate: </label>
                  <input type="text" value={this.state.rate} onChange={this.rateChange}/>
              </div>
          </div>
          <h2>Monthly Payment: <span className="currency"> {Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>

       </div>
     );
   }
 });

 var App = createReactClass({
   render: function () {
     return (
       <div>
          <Header title="React Mortgage Calculator"/>
          <MortgageCalculator principal="200000" years="30" rate="5"/>
       </div>
     );
   }
 });

 ReactDOM.render(<App />, document.getElementById('root'));
