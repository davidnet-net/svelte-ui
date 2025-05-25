const fs = require("fs");
const path = require("path");

const jsonPath = path.resolve(__dirname, "..", "src", "designtokens.json");
const scssPath = path.resolve(__dirname, "..", "src", "_designtokens.scss");

const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function parseColors(obj, prefix = "") {
    let result = "";

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === "object") {
            result += parseColors(value, prefix + key + "-");
        } else {
            const varName = `${prefix}${toKebabCase(key)}`;
            result += `$${varName}: ${value};\n`;
        }
    }

    return result;
}

const scssVariables = parseColors(json.colors);

fs.writeFileSync(scssPath, scssVariables);
console.log(`SCSS variables generated to ${scssPath}`);
