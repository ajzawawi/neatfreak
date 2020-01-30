const css = require('css');
const fs = require('fs');

function read(filename) {
  fs.readFileSync(filename, 'utf8', (err, data) => {
    consolelog('data', data);
    const ast = css.parse(data, { silent: false });
    console.log('meh');
    return ast;
  });
}

function processFile(ast) {
  const sortedTree = sortRules(ast);
  const str = css.stringify(txt, { silent: false });
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

function start() {
  read('style.css');
  const newFile = processFile(txt);
  const str = css.stringify(txt, { silent: false });

  fs.writeFile('style-updated.css', str, err => {
    if (err) throw err;
    console.log('Saved', str);
  });
}

start();
