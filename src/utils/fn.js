export const getArrSlider = (start, end, number) => {
  const limit = start > end ? number : end;
  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};
export const converNumber = (number) => {
  if (number > Math.pow(10, 6)) {
    return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`;
  } else if (number < 1000) {
    return number;
  } else {
    return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}K`;
  }
};

export const checkLengthBiographyArtists = (str) => {
  if (str.length > 295) {
    return `${str.slice(0, 295)}...`;
  } else {
    return str;
  }
};
