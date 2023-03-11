const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const generateOTP = (digit: number) => {
  let result = '';
  for (let i = 0; i < digit; i++) {
    let random = getRandomInt(9);
    if (i === 0) {
      if (random === 0) {
        random++;
      }
    }
    result += random;
  }
  return Number(result);
};

export {getRandomInt, generateOTP};
