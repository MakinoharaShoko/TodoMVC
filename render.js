import ejs from 'ejs';
import * as fs from 'fs/promises'

/**
 * 渲染为 HTML
 * @param type 渲染类型（所有还是已做完还是未做）
 * @param todos （一个ToDo 列表）
 * @returns {Promise<string>}
 * @constructor
 */
export default async function HtmlRender(type, todos){
    const templateFile = await fs.readFile(`${process.cwd()}/templates/template.ejs`);
    const template = templateFile.toString();
    const props = {type,todos};
    const body = ejs.render(template,props);
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>TodoMVC</title>
        <link rel="stylesheet" href="/assets/styles.css">
    </head>
    <body>
        ${body}
    </body>
</html>
    `
}
