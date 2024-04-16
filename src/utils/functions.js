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

export const dateToInputDate = (date) => {
  return date.toISOString().split("T")[0];
};

export const getTextFromIdsList = (Ids, originalList) => {
  let categoriesNames = [];
  Ids.map((categoryId) => {
    let category = originalList.find(
      (category) => category.value === categoryId
    );
    return category !== undefined
      ? categoriesNames.push(`(${category.text})`)
      : categoriesNames.push("(NA)");
  });
  return categoriesNames;
};
