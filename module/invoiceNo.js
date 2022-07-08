function createInvoiceNumber(newDigit) {
  console.log("New digit ", newDigit)
  // Get current year
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let shortYear = year.toString().substring(2);
  console.log(shortYear);
  // The highest number this invoice can get to is 9999
  // The invoice should be structured like below
  // Example: INV-year-number
  if (newDigit <= 9) {
    console.log(`INV${shortYear}000${newDigit}`);
    return `INV${shortYear}000${newDigit}`;
  } else if (newDigit <= 99) {
    console.log(`INV${shortYear}00${newDigit}`);
    return `INV${shortYear}00${newDigit}`;
  } else if (newDigit <= 999) {
    console.log(`INV${shortYear}0${newDigit}`);
    return `INV${shortYear}0${newDigit}`;
  } else {
    console.log(`INV${shortYear}${newDigit}`);
    return `INV${shortYear}${newDigit}`;
  }
}
// createInvoiceNumber(999)
module.exports = createInvoiceNumber;
