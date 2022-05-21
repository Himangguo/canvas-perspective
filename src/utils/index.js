function rgbaConvertToHex(r, g, b, a) {
  const hexNumb = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let res = "#";
  // 10进制转为16进制
  const colors = [r, g, b, a];
  for (let i = 0; i < colors.length; i++) {
    let n = colors[i];
    let str = "";
    while (n > 0) {
      const quotient = Math.floor(n / 16);
      const remimd = n - quotient * 16;
      str = hexNumb[remimd] + str;
      n = quotient;
    }
    res += ("00" + str).slice(-2);
  }
  return res;
}

export { rgbaConvertToHex };

// console.log(rgbaConvertToHex(169, 0, 35, 32)); test
