import memory from './memory.js';

class Array {
    constructor() {
        this.length = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        this._resize(this.length + 1);
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
    }

    get(index) {
        if (index < 0 || index >= this.length) { throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) { throw new Error('Index error');
        }
        if (this.length >= this._capacity) {
            this._resize((this.length +1) * Array.SIZE_RATIO);
        }
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index -1);
    }

    // URLify a string
    URLify(string) {
        return string.trim().replace(/\s/g, '%20');
    }

    filter(stuff) {
        var filtered = [];
        for(let i = 0; i < this.length; i++) {
            if (stuff(this[i] < 
        }
        return filtered;
    }
}

Array.SIZE_RATIO = 3;

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);

    // The length of the array is 1 item. The capacity of the array is ????? and the memory address of the array is ?????

    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    // The length of the array is 6 items. The capacity of the array is ????? and the memory address of the array is ?????

    arr.pop();
    arr.pop();
    arr.pop();

    console.log(arr);

    // print the 1st item in the array "arr"
    console.log(arr[0]);

    // empty the array and add just 1 item: `arr.push("tauhida");`
    
    arr = [];
    arr.push('tauhida');

    console.log(arr);

    // We get a strange result because the array is not truly empty there are just spots without data

    // The resize function in our Array class removes those spots without data so our array only has meaningful spots
}

export default Array;