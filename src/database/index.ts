import * as fs from 'fs';
const pathBase = './database.json';

function set(name: string, value: any) {
    let obj = {
        name,
        value
    }
    let file = JSON.parse(fs.readFileSync(pathBase, 'utf8'));
    let checkdb = file.filter((e: any) => e.name === name);
    if(checkdb.length == 0) {
        file.push(obj);
        fs.writeFileSync(pathBase, JSON.stringify(file, null, 2));
    } else if(checkdb.length == 1) {
        file[file.indexOf(checkdb[0])] = obj;
        fs.writeFileSync(pathBase, JSON.stringify(file, null, 2));
    }
}

function get(name: string) {
    let file = JSON.parse(fs.readFileSync(pathBase, 'utf8'));
    let checkdb = file.filter((e: any) => e.name === name);
    if(checkdb.length == 0) return null;
    else if(checkdb.length == 1) return checkdb[0].value;
}

function deleteData(name: string) {
    let file = JSON.parse(fs.readFileSync(pathBase, 'utf8'));
    let checkdb = file.filter((e: any) => e.name === name);
    if(checkdb.length == 0) return null;
    else if(checkdb.length == 1) {
        file.splice(file.indexOf(checkdb[0]), 1);
        fs.writeFileSync(pathBase, JSON.stringify(file, null, 2));
    }
}

export default {
    set,
    get,
    delete: deleteData
}
