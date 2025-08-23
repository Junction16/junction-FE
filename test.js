const text = require("./english_by_basic_sentence.json");
const voca = require("./voca_10000.json");

const fs = require("fs");
// console.log(text.map((item) => item.lesson_title));

// console.log(
//   text.map((item) => ({
//     title: item.lesson_title,
//     expression: item.expression_list.map((item) => item.kor_expression),
//   }))
// );

const voca_list = voca
  .filter((item) => item.example.example_kor)
  .map((item) => item.example);

fs.writeFileSync("./voca.json", JSON.stringify(voca_list, null, 2));
