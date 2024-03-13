function calculateDuration(futureValue, cagr, monthlyContribution) {
    let rate=cagr/12
    let numerator=futureValue*rate
    numerator=numerator/monthlyContribution
    numerator=numerator/(1+rate)
    numerator=Math.log(numerator+1)
    let denominator=Math.log(1+rate)
    let result=numerator/denominator
    return Math.ceil(result/12)
}

export default calculateDuration;