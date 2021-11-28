// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// export function buildCSVFile(data) {
//   data.forEach((element) => {
//     console.log(Object.keys);
//     // Object.keys(element).forEach(item => {

//     //     console.log("Object.keys(element)[0]",item);
//     // });
//   });
//   console.log("Object.values(object1)", Object.values(data[0]));
//   const csvWriter = createCsvWriter({
//     path: "file.csv",
//     header: [
//       { id: "count", title: "No." },
//       { id: "rowNo", title: "Main Shade" },
//       { id: "code1", title: "Code1" },
//       { id: "code2", title: "Code2" },
//       { id: "code3", title: "Code3" },
//       { id: "imageName", title: "Image Name" },
//     ],
//   });


  

//   csvWriter
//     .writeRecords(records) // returns a promise
//     .then(() => {
//       console.log("...Done");
//     });

//   const ALPHABET = {
//     0: "A",
//     1: "B",
//     2: "C",
//     3: "D",
//     4: "E",
//     5: "F",
//     6: "G",
//     7: "H",
//     8: "I",
//     9: "J",
//     10: "K",
//     11: "L",
//     12: "M",
//     13: "N",
//     14: "O",
//     15: "P",
//     16: "Q",
//     17: "R",
//     18: "S",
//     19: "T",
//     20: "U",
//     21: "V",
//     22: "W",
//     23: "X",
//     24: "Y",
//     25: "Z",
//   };

//   let records = [];

//   parseData.forEach((item) => {
//     Object.values(Object.values(item)[1]).forEach((element) => {
//       let mainData = { rowNo: element.description };
//       records.push(mainData);
//       element.imageUrls.forEach((final, index) => {
//         console.log("final",final);

//         let finalData = {
//           count: final.key,
//           rowNo: `${element.description}${ALPHABET[index]}`,
//           code1: final.codes?.code1,
//           code2: final.codes?.code2,
//           code3: final.codes?.code3,
//           imageName: final.url,
//         };
//         records.push(finalData);
//       });
//     });
//   });

//   console.log("records", records);
// }
