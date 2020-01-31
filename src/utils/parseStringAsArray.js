module.exports = stringAsArray =>
  stringAsArray.split(",").map(tech => tech.trim());
