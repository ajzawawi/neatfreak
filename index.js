const css = require('css');
const fs = require('fs');

function read(filename) {
  return fs.readFileSync(filename, 'utf8').toString();
}

function processFile(stylesheet) {
  const ast = css.parse(stylesheet, { silent: false });
  const sortedTree = sortRules(ast);
  return ast;
}

function sortRules(ast) {
  const {
    stylesheet: { rules }
  } = ast;
  for (i = 0; i < rules.length; i++) {
    sortAlphabetically(rules[i]);
  }
  return ast;
}

function sortAlphabetically(rule) {
  const { declarations } = rule;
  declarations.sort((a, b) => {
    const propA = a.property;
    const propB = b.property;
    if (propA > propB) return 1;
    if (propB > propA) return -1;
    return 0;
  });
  return declarations;
}

function write(stylesheetStr) {
  fs.writeFileSync('updated.css', stylesheetStr, err => {
    if (err) throw err;
    console.log('Saved', str);
  });
}

function start() {
  const stylesheet = read('style.css');
  const newStylesheet = processFile(stylesheet);
  const str = css.stringify(newStylesheet, { silent: false });
  write(str);
}

start();
