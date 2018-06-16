const popoverText = {
  usTax: 'Either enter the US sales tax as a percentage, or search for it by zipcode.',
  zipcode: 'Sales tax in the US is more complicated than in Canada. In almost every case it\'s determined by zipcode. Enter the zipcode where the item will be purchased and search for it.',
  tripLength: 'Each person gets a $200 tax and duty exemption for trips 24-48 hours in length, and $800 for trips 48 hours or longer.',
  province: 'Select your province of residence for your correct sales tax rate.',
  cdnTax: 'The sales tax rate of your province of residence. The CBSA collects this on behalf of the provinces. GST, PST & HST (if applicable) are combined.',
  price: 'Enter the USD list price of the item. Include shipping (if applicable). Include the tax amount, or lookup the tax rate below for an estimate.',
  taxable: 'Select whether each item is taxable in both the US and Canada. The default taxrate 12% for Canada and 0% for the US. For US tax, either look up taxrate by zipcode below, or add it to the price.',
  duty: 'The CBSA usually doesn\'t bother charging duty unless it\'s an expensive item. If you believe you may be subject to duty, select the duty category.',
  declarableCAD: 'This is the price of the item in CAD, combined with any applicable shipping and US sales taxes, at the current exchange rate. It doesn\'t include the bank fee, Canadian duty or tax. You must declare this value in CAD or USD even if it\'s tax exempt.',
  declarableUSD: 'This is the price of the item in USD, combined with any applicable shipping and US sales taxes. It doesn\'t include the bank fee. You must declare this value in either CAD or USD even if it\'s tax exempt.',
  taxableCAD: 'This is the declarable value minus any amounts that are tax-exempt. You can specify tax-exemption by choosing a trip-length exemption, or specifying if the item is tax-exempt.',
  taxCAD: 'This is the taxable amount multiplied by GST and your province\'s PST, or HST if applicable. This rate is determined by your province of residence.',
  dutyCAD: 'This is the taxable amount multiplied by the duty rate per the duty category you chose above. In most cases this should be zero.',
  bankFeeCAD: 'This is what your bank charges to exchange CAD to USD. It\'s not included in the declarable or taxable values, however it adds to your total cost.',
  subtotalCAD: 'This is the subtotal in CAD of everything you will pay for this item, including tax and bank exchange fee',
  totalCostUS: 'This is the total amount in CAD that you spent in the US, including bank exchange fee.',
  totalBorder: 'This is the estimated amount you\'ll have to pay at the border. It consists of applicable Canadian sales tax and duty.',
  totalCAD: 'This is the grand total of everything you will pay.',
  deleteItem: 'Delete item'
};

export default popoverText;
