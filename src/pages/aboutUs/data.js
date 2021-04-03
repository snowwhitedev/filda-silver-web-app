

export const faqData = [{
  Q: 'What is the maximum supply of FilDA?',
  A: ['40% is given to Lending & Borrowing Pools', '40% is given to Liquidity Pools', '15% for Insurance/DAO Pools', '5% for the FilDA team', 'There is no pre-mining.'],
}, {
  Q: 'What are the mining rewards?',
  A: ['95% of the maximum supply of the FilDA token will be used as rewards. FiLDA will be gradually released in the forms of interest for lenders, liquidity rewards, and insurance protocol rewards, etc. ']
}, {
  Q: 'What is the interest rate of the loan, if paid off early?',
  A: ['Loans on the FilDA platform can be borrowed and repaid at any time with no fixed term. The interest rates are algorithmically calculated and dynamically adjusted, based on the deposit/loan pool and the utilization rate of the funds on the platform.']
}, {
  Q: 'There are two interest rate percentages (APR/APY) - what is the difference?',
  A: ['APR (Annual Percentage Rate) - This represents the annual rate of interest', 'APY  (Annual Percentage Yield) - This represents the annual rate of interest, when taking into consideration compounding of assets']
}, {
  Q: 'Is there a due date for the repayment of loans?',
  A: ['There are no due dates for the repayment of loans. Users can borrow and repay at any time. However, if the loan is not repaid, when the sum of the loan and the interest accumulates to 100% of the loan limit, liquidation will be triggered.']
}, {
  Q: 'What happens if a borrower does not repay their loan?',
  A: ['It is impossible for a borrower not to repay their loan, because collateral is provided which can then be used to repay the loan.']
}, {
  Q: 'How does liquidation work?',
  A: ['If a borrower’s assets change in value (relative to USD) and they are no longer able to maintain 100% of their collateral, 50% of their assets will be available for liquidation. You can track this in real-time on the progress bar of your loan.']
}, {
  Q: 'Are my assets safe on the FilDA platform?',
  A: ['The Filda platform has stringent security measures in place to ensure safety of your assets. FilDA’s loan agreements are optimized according to existing mature projects already on the market, and existing attack patterns have been circumvented.', 'FilDA’s source code has passed the audits of several widely known and respected audit firms.']
}, {
  Q: 'Why do certain assets have different rates of interest available?',
  A: ['The interest rates for each pool are determined by the total deposits and loans in the pool.']
}].map(item => {
  item.isShowA = false;
  return item
})

