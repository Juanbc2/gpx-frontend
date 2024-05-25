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

export const getTextFromIdsList = (
  Ids,
  originalList,
  valueName = "value",
  keyName = "text"
) => {
  let categoriesNames = [];
  Ids.map((categoryId) => {
    let category = originalList.find(
      (category) => category[valueName] === categoryId
    );
    return category !== undefined
      ? categoriesNames.push(`(${category[keyName]})`)
      : categoriesNames.push("(NA)");
  });
  return categoriesNames;
};

export const getTypeKeyByValue = (
  typeList,
  key,
  value,
  valueName = "value"
) => {
  if (typeList == undefined) return "";
  let type = typeList.find((type) => type[valueName] === value);
  return type == undefined ? "" : key == "" ? type : type[key];
};

export const decimalTimeToTime = (timeRaw) => {
  if (timeRaw == undefined) return "";
  const decimalTime = timeRaw;
  const hours = Math.floor(decimalTime * 24);
  const minutes = Math.floor((decimalTime * 24 - hours) * 60);
  const seconds = Math.floor(((decimalTime * 24 - hours) * 60 - minutes) * 60);

  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return timeString;
};
