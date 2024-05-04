### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks: Traditional asynchronous pattern where functions accept a callback parameter to be executed once the operation is complete.
Promises: Objects representing the eventual completion or failure of an asynchronous operation, allowing chaining of operations and easier error handling.
Async/Await: Syntactic sugar built on top of Promises, allowing asynchronous code to be written in a synchronous-like manner using the async and await keywords.

- What is a Promise?
  A Promise is an object representing the eventual completion or failure of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected. Promises allow asynchronous code to be written in a more readable and manageable way, enabling better error handling and chaining of operations.

- What are the differences between an async function and a regular function?
Async functions: Declared with the async keyword, which enables the use of the await keyword inside them. They always return a Promise, and the value returned by the function is wrapped in a resolved Promise.
Regular functions: Execute synchronously by default. They do not support the use of the await keyword or return Promises implicitly.

- What is the difference between Node.js and Express.js?
Node.js: A runtime environment that executes JavaScript code outside the browser. It provides a set of built-in modules for various functionalities like file system operations, networking, and HTTP servers.
Express.js: A web application framework for Node.js, designed for building web applications and APIs. It provides a robust set of features for routing, middleware, and HTTP request/response handling, making it easier to build server-side applications.

- What is the error-first callback pattern?
  The error-first callback pattern is a convention used in Node.js for handling asynchronous operations. In this pattern, callback functions passed to asynchronous functions have an error parameter as the first argument. If an error occurs during the operation, it is passed to the callback as the first argument; otherwise, null or undefined is passed.

- What is middleware?
  Middleware in the context of web development refers to functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute code, modify request and response objects, end the request-response cycle, or call the next middleware function.

- What does the `next` function do?
  In Express.js middleware, the next function is used to pass control to the next middleware function in the stack. It is typically called within a middleware function to indicate that the current middleware function has completed its processing and the control should move to the next middleware function.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
Performance: The code makes sequential HTTP requests, which could lead to performance issues due to the blocking nature of await. It would be more efficient to make these requests concurrently.
Structure: The code could be structured more efficiently by using Promise.all to execute the requests concurrently instead of sequentially.
Naming: The function name getUsers implies that it retrieves multiple users, but it only retrieves three specific users. A more accurate name might be getSpecificUsers.
External dependency: The code relies on the jQuery library ($.getJSON) without explicitly mentioning it. It would be clearer to import or require the library explicitly.


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
