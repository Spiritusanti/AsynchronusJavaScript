// Asynchronus JavaScript Notes:

// How does JavaScript work?

// What is a program?
// --> it allocates memory
// --> it has to parse and execute scripts

// JavaScript Engine:
// reads the JavaScript we write and changes into machine executable instructions for the browser.
// This has two parts: the memory heap and the call stack.

// The memory heap:
const a = 1; //we just allocated memory
// --> memory leaks happpen when we have unused data filling up RAM space. This is why global variables can be bad.

// The call stack:
console.log('1');
console.log('2');
console.log('3');
// the call stack reads and executes our script. The above code gets run sequentially and outputs 1,2,3 by adding each operation to the stack and then call it.

const one = () => {
  const two = () => {
    console.log('4')
  }
  two();
}
one();
// The call stack first adds the one function, then we the two function, the the consol.log('4'). It then runs them in reverse order starting with the consol.log and finishing with one(). 

// JavaScript is a single threaded language that is non-blocking.  

//Single threaded --> one call stack. First in last out. Only one thing at a time.
  //why is JavaScript single threaded?
  // running code on a single thread is easy since we don't have to worry about complications like 'deadlocks' in multi-threaded languages.
  // this is synchronus programming
  // Stack overflow: when a stack is overflowing. When the call stack exceeds its limits.
  //  --> can happen with recursion. 


// synchronus code has the drawback that one single operation can hold up the execution.
// Asynchronus code allows us to get aroung this by putting operations in the callback queue.

// example of asynchronus code:
console.log('1');
setTimeout(()=> {
  console.log('2')
}, 2000);
console.log('3')
// output: 1, 3, 2
// setTimeout tells our call stack to trigger the API and place ('2') in the callback queue. The stack then moves on to the next operations and then after two seconds the ('2') gets added back to callback queue. The event loop, which is constantly checking the stack also looks at the callback queue and when it see something adds it into the call stack to be run.



