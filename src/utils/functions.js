export const valueInArray = (value, array, keyName = "value") => {
  return array.find((element) => {
    return element[keyName] === value;
  });
};
