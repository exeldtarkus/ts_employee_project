const log = (...str: string[]) => {
  if (str.length > 0) {
    let fullStr = str[0];
    for (let i = 1; i < str.length; i++) {
      fullStr += ` - ${str[i]}`;
    }
    console.log(fullStr);
  }
};

export {log};
