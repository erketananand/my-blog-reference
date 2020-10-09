async function foo() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const user = await response.json();
    console.log(user);
    return user; // OR return response.json();
}

async function foo1() {
    //JS will wrap 1 in a resolved promise i.e. equivalent to Promise.resolve(1)
    return 1;
}

async function foo2() {
    //JS will wrap undefined in a resolved promise
    //As nothing is being returned by this method
}

console.log(await foo1()); //It will log 1
console.log(await foo2()); //It will log undefined

async function foo3() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    //As await has been used, JS will wait until promise won't resolved
    const user = await response.json();
    console.log(user);
}

function syncFunction() {
    console.log('Before async method calling');
    foo3();
    console.log('After async method calling');
    //As JS is a single threaded, execution will continue in syncFunction
    //It won't wait for completion of foo method as syncFunction is a regular method
}
syncFunction();

async function asyncFunction() {
    console.log('Before async method calling');
    await foo3();
    //As await is used for foo3, JS will wait to completes foo3 execution first
    //Then it will resume further execution
    console.log('After async method calling');
}
asyncFunction();

/**
 * Using async/await with then
 */
async function foo4() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Promise has been resolved!"), 1000);
        //Promise will get resolved after 1 second
    });
    return promise;
}

function foo5() {
    //foo4 is an async method and will return a promise so, we can use
    //.then over a promise object as we do for native promise object.
    foo4().then((result) => {
        console.log(result);
        //It will log resolved value i.e. Promise has been resolved!
    });
}
foo5();

/**
 * Using async/await with catch
 */
async function foo6() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => reject("Promise has been rejected!"), 1000);
        //Promise will get reject after 1 second
    });
    return promise;
}

function foo7() {
    //foo6 is an async method and will return a promise so, we can use
    //.catch over a promise object as we do for native promise object.
    foo6().catch((error) => {
        console.log(error);
        //It will log error value i.e. Promise has been rejected!
    });
}
foo7();

/**
 * Using async/await with then and catch
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function foo8() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (getRandomInt(100) % 2 === 0) { //isEven
                resolve("Promise has been resolved!")
            } else {
                reject("Promise has been rejected!");
            }
        }, 1000);
    });
    return promise;
}

function foo9() {
    //foo8 is an async method and will return a promise so, we can use .then
    //and .catch over a promise object as we do for native promise object.
    foo8().then((result) => {
        //get resolved if random integer is an even
        console.log(result);
    }).catch((error) => {
        //get rejected if random integer is an odd
        console.log(error);
    });
}
foo9();

/**
 * Using async/await with try and catch block
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function foo10() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (getRandomInt(100) % 2 === 0) { //isEven
                resolve("Promise has been resolved!")
            } else {
                reject("Promise has been rejected!");
            }
        }, 1000);
    });
    return promise;
}

async function foo11() {
    try {
        const result = await foo10();
        //if foo10 gets rejected then an error will thrown in try block 
        //which will catch by catch block otherwise try block execution will continue. 
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
foo11();

/**
 * Using async/await with catch and throw
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function foo12() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (getRandomInt(100) % 2 === 0) { //isEven
                resolve("Promise has been resolved!");
            } else {
                reject("Promise has been rejected!");
            }
        }, 1000);
    });
    return promise;
}

async function foo13() {
    //if foo12 gets rejected then an error will be handled by .catch block.
    //otherwise try block execution will continue.
    const result = await foo12().catch((error) => console.log(error));
    if (result) { //resolved value will be assigned to result
        //if we don't check result then execution will continue even if
        //foo12 gets rejected. 
        console.log(result);
    }
    console.log(result); //it will log undefined
    //If we throw error in catch block then we don't need to check response value
    const response = await foo12().catch((error) => {
        console.log(error);
        throw error; //equivalent to return Promise.reject(error)
    });
    //below line of code won't execute if foo12 gets rejected. 
    console.log(response);
}
foo13();

/**
 * Resolve promise in catch block with async/await
 */
async function foo14() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => reject("Promise has been rejected!"), 1000);
    });
    return promise;
}

async function foo15() {
    const result = await foo14().catch((error) => {
        console.log(error);
        return 'Promise get resolved using return even it is rejected';
    });
    if (result) { //return value within catch block will be assigned to result
        //foo14 gets rejected but get resolved in catch block of foo15. 
        console.log(result);
        //It will log: Promise get resolved using return even it is rejected
    }
}
foo15();

async function asyncJob(resolveValue, interval) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(resolveValue), interval * 1000);
    });
    return promise;
}

async function serialExecution() {
    const result1 = await asyncJob(1, 1); //result1 will get resolved with 1
    const result2 = await asyncJob(2, 2); //result1 will get resolved with 2
    const result3 = await asyncJob(3, 3); //result1 will get resolved with 3
    const finalResult = result1 + result2 + result3; //finalResult will be 6
    console.log(finalResult); //It will log 6
}
serialExecution();

async function asyncJob(resolveValue, interval) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(resolveValue), interval * 1000);
    });
    return promise;
}

async function serialExecutionUsingFor(jobs) {
    let finalResult = 0;
    for (const job of jobs) {
        let result = await asyncJob(job, job);
        finalResult += result;
    }
    console.log(finalResult);
}
serialExecutionUsingFor([1, 2, 3]);

async function serialExecutionUsingReduce(jobs) {
    let finalResult = await jobs.reduce(async (total, job) => {
        return await total + await asyncJob(job, job);
    }, 0);
    console.log(finalResult);
}
serialExecutionUsingReduce([1, 2, 3]);

async function asyncJob(resolveValue, interval) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(resolveValue), interval * 1000);
    });
    return promise;
}

async function parallelExecution() {
    const result2 = asyncJob(2, 2); //it will initiate call but don't wait for completion
    const result3 = asyncJob(3, 3); //it will initiate call but don't wait for completion
    const result1 = asyncJob(1, 1); //it will initiate call but don't wait for completion
    const finalResult = await result1 + await result2 + await result3;
    //it will wait until all promises will get resolved and resolved value will get added
    //and assigned to finalResult. After this console.log(finalResult) will execute.
    console.log(finalResult);
}
parallelExecution();

async function asyncJob(resolveValue, interval) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(resolveValue), interval * 1000);
    });
    return promise;
}

async function parallelExecutionUsingFor(jobs) {
    const results = jobs.map(async (job) => asyncJob(job, job));
    //results hold an array of promise object
    let finalResult = 0;
    for (const result of results) {
        finalResult += (await result); //result will get resolved first then resolved
        //value will get added to finalResult. Then loop will go for next iteration.
    }
    console.log(finalResult); //will execute once for loop execution completes.
}
parallelExecutionUsingFor([1, 2, 3]);

async function parallelExecutionUsingPromiseAll(jobs) {
    let promises = jobs.map((job) => asyncJob(job, job)); //holds array of promise object
    let results = await Promise.all(promises); //holds array of resolved value
    let finalResult = 0;
    for (const result of results) {
        finalResult += result;
    }
    console.log(finalResult);
}
parallelExecutionUsingPromiseAll([1, 2, 3]);

async function asyncJob(resolveValue, interval) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(resolveValue), interval * 1000);
    });
    return promise;
}

async function sequentialAndParallelExecution() {
    try {
        let result1 = await asyncJob(1, 1);
        let result2 = await asyncJob(2, 1);
        let sequenceOf6And7 = async function () {
            let result6 = await asyncJob(6, 1);
            let result7 = await asyncJob(7, 1);
            return result6 + result7;
        }
        let promises = [asyncJob(3, 1), asyncJob(4, 1), asyncJob(5, 1), sequenceOf6And7()];
        let results = await Promise.all(promises);
        let finalResult = result1 + result2;
        for (const result of results) {
            finalResult += result;
        }
        console.log(finalResult);
    } catch (err) {
        console.log(err);
    }
}
sequentialAndParallelExecution();