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


// Promises sections:
// A promise is an object that may produce a single value sometime in the future. Either a resolved value or a reason it's not resolved (rejected). 3 possible states: fulfilled, rejected, or pending

// promise example:

movePlayer(100, 'Left')
.then(() => movePlayer(400, 'Left'))
.then(() => movePlayer(10, 'Right'))
.then(() => movePlayer(350, 'Left'))

// how do we create a promise?
const promise = new Promise((resolve, reject) => {
  if (true){
  resolve('Stuff worked');
  } else {
  reject('It broke....');
  }
})

promise.then(result => console.log(result))

// So what can we do with promises?
promise.then(result => result + '!').then(result2 => {
  throw error
  console.log(result2)
})
.catch(() => console.log('error!'))
//catch statement checks if anything before it fails. important to put it at or near the end of the statement.

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'HII')
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'pookie')
})

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "is it me you're looking for?")
})

Promise.all([promise, promise2, promise3, promise4]).then(values => {
  console.log(values);
})


// Time for a real world example:
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

Promise.all(urls.map(url => {
  return fetch(url).then(resp => resp.json())
})).then(results => {
  console.log(results[0])
  console.log(results[1])
  console.log(results[2])
}).catch(()=> console.log('error'))


// Async / Await

// part of ES8 and built on top of promises. Under the hood it is a function that returns a promise. Benefit is that it makes code easier to read.

// example function:

async function playerStart() {
  const firstMove = await moveplayer(100, 'Left'); //pause
  await movePlayer(12, 'Right'); //pause
}

//async await is syntactic sugar --> same promise operation under the hood but makes it easier to read.

fetch('https://jsonplaceholder.typicode.com/users').then(resp => resp.json()).then(console.log)

async function fetchUsers() {
 const resp = await fetch('https://jsonplaceholder.typicode.com/users')
 const data = await resp.json();
 console.log(data);
}


// another example

const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

Promise.all(urls.map(url => {
  return fetch(url).then(resp => resp.json())
})).then(results => {
  console.log(results[0])
  console.log(results[1])
  console.log(results[2])
}).catch(()=> console.log('error'))

// how do we catch errors with async await?
// use a try / catch block.
const getData = async function() {
  try {
    const [ users, posts, albums ] = await Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
    }
  ))
  console.log('users', users)
  console.log('users', posts)
  console.log('users', albums)
  } catch {
    console.log('oops')
  }
}

// ES9
// object spread operator:
const animals = {
  tiger: 23,
  lion: 5,
  monkey: 2
}

const { tiger, ...rest} = animals
// output when called in console
tiger = 23
rest = {lion: 5, monkey: 2}

const array = [1,2,3,4,5];
function sum (a, b, c, d, e) {
  return a + b + c + d +e;
}
// calling sum function
sum(...array);
// console output = 15


// finally from ES9 example:

const swapiUrls = [
  'https://swapi.co/api/people/1',
  'https://swapi.co/api/people/2',
  'https://swapi.co/api/people/3',
  'https://swapi.co/api/people/4'
]

Promise.all(urls.map(url => {
  return fetch(url).then(people => people.json())
}))
  .then(array => {
    console.log('1', array[0])
    console.log('1', array[1])
    console.log('1', array[2])
    console.log('1', array[3])
  })
  .catch(err => console.log('ughhh fix it!', err))
  .finally(data => console.log('extra', data));

  // for await of from ES9

const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

const loopThroughUrls = urls => {
  for (url of urls) {
    console.log(url)
  }
}

const getData2 = async function() {
  const arrayOfPromises = urls.map(url => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
}


// Job Queue
// promises are new in JavaScript and now instead of using callbacks we now
// have a native way to handle async code and thus needed another queue
//  Job queue (aka microtask queue) has a higher priority than the callback queue and is checked by the event loop first.


