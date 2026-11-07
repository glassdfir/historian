const fs = require('fs');
const w = fs.readFileSync('node_modules/sql.js/dist/sql-wasm-inline.js', 'utf8');
const a = fs.readFileSync('node_modules/sql.js/dist/sql-asm.js', 'utf8');
for (const x of [w, a]) if (/<\/script/i.test(x)) throw Error('script close tag in lib');
const asmWrapped = `window.__initSqlJsAsm = (function () { var module, exports, define;\n${a}\nreturn initSqlJs; })();`;
let h = fs.readFileSync('src/index.src.html', 'utf8');
h = h.replace('/*__SQLJS_WASM__*/', () => w).replace('/*__SQLJS_ASM__*/', () => asmWrapped);

fs.writeFileSync('index.html', h);
console.log('built', (h.length / 1048576).toFixed(2), 'MB');
