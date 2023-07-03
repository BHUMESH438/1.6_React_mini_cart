export const getTotals = cart => {
  let totalAmount = 0;
  let totalCost = 0;
  //we can destructure mul values of obj with single let/const/var declaration in forof
  for (let { amount, price } of cart.values()) {
    totalAmount = totalAmount + amount;
    totalCost = totalCost + amount * price;
  }
  return { totalAmount, totalCost };
};
//always put { if used return}
