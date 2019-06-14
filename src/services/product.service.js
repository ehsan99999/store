import { Promise } from "q";

class ProductService {
    constructor() { }

    getAll() {

    }
}

function add(params) {
    return params.x + params.y;
}

function addCb(params, cb) {
    let sum = params.x + params.y;
    cb(sum)
}

let myFunc = (a) => console.log(a);
Add({ x: 1, y: 2 }, myFunc);

function pAdd(params) {
    let sum = params.x + params.y;

    return new Promise((resolve, reject) => {
        if (sum > 10)
            resolve(sum)
        if (sum < 10)
            reject('must greater than 10')
    })
}