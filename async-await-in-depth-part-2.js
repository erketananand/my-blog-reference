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
