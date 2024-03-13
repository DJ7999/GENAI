function calculateMonthlySIP(futureValue, cagr, durationMonths) {
   
    const annualRate = cagr;   // Convert CAGR to a decimal
  const monthlyRate = annualRate / 12;  // Convert annual rate to monthly rate
  durationMonths=durationMonths*12
  // Calculate the monthly contribution
  let denominator=Math.pow((1 + monthlyRate), durationMonths)
   denominator=denominator-1
   denominator=denominator/monthlyRate
   denominator=denominator*(1+monthlyRate)
  const monthlyContribution = futureValue/denominator


  
  return monthlyContribution.toFixed(2); // Round to 2 decimal places
  // Round to 2 decimal places // Round to 2 decimal places
  }
  export default calculateMonthlySIP;