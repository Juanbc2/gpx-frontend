export const valueInArray = (value, array, keyName = "value") => {
  return array.find((element) => {
    return element[keyName] === value;
  });
};

export const getValuesFromDictionary = (dictionary, key) => {
  let values = [];
  dictionary.map((element) => {
    return values.push(element[key]);
  });
  return values;
};
