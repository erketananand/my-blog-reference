// Function to generate a random GUID
function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Function to generate an array of 400,000 random GUIDs
function generateGUIDArray(count) {
    const guids = [];
    for (let i = 0; i < count; i++) {
        guids.push(generateGUID());
    }
    return guids;
}

// Generate the array
const fourLakhGUIDs = generateGUIDArray(500);
const copyViaPush = [];


console.time('Performance of Push using spread operator');
copyViaPush.push(...fourLakhGUIDs);
console.timeEnd('Performance of Push using spread operator');

console.time('Performance of Push');
for (let i = 0; i < fourLakhGUIDs.length; i++) {
    copyViaPush.push(fourLakhGUIDs[i]);
}
console.timeEnd('Performance of Push');

let copyViaConcat = [];
console.time('Performance of Concat');
copyViaConcat = copyViaConcat.concat(fourLakhGUIDs);
console.timeEnd('Performance of Concat');