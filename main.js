function clearForm() {
  const sheet = SpreadsheetApp.openById("1nnnZ09L_4E6T5kdMPqC_CFBrLZLlMexEuSc3pXej7EM").getSheetByName("Form");
  sheet.getRange("A5:A20").clearContent();
  sheet.getRange("C5:C20").clearContent();
}


function generateList() {
  const criteria = getCheckedItems("A5:B20");
  const services = getCheckedItems("C5:D20");
Logger.log(criteria);
  const fullArray = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Services").getRange("A2:F650").getValues();

  const filteredArray = filterArray(criteria, fullArray, 1);
  Logger.log(filteredArray.length);
  const refilteredArray = filterArray(services, filteredArray, 2);

  const numRows = refilteredArray.length;
  Logger.log(numRows);

  const outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Output");
  outputSheet.getRange(2, 1, outputSheet.getLastRow(), outputSheet.getLastColumn()).clearContent();
  outputSheet.getRange(2,1,numRows, 6).setValues(refilteredArray);
}


function filterArray(filterCriteria, unfilteredArray, colToCheck) {

let filteredArray = [];

if (filterCriteria.length != 0) {  //If there are any criteria at all
  for (i=0; i<filterCriteria.length; i++) {  //then filter by each of them
    for (j=0; j<unfilteredArray.length; j++) {  //going through every row of the whole unfiltered array
      if (unfilteredArray[j][colToCheck].includes(filterCriteria[i].toString())) {
        filteredArray.push(unfilteredArray[j])
      }
    }
  }
}else{                              //Otherwise, return the unfiltered array
  filteredArray = unfilteredArray;
}
return filteredArray;
}


function getCheckedItems(range) {
  const sheet = SpreadsheetApp.openById("1nnnZ09L_4E6T5kdMPqC_CFBrLZLlMexEuSc3pXej7EM").getSheetByName("Form");
  const values = sheet.getRange(range).getValues();
  let array = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] == true) {
      array.push(values[i][1])
    }
  }

return array
}
