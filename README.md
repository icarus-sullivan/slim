![npm version](https://img.shields.io/npm/v/@sullivan/slim.svg) ![npm license](https://img.shields.io/npm/l/@sullivan/slim.svg)
# @sullivan/slim 
A very slim js template library 


## Installation

```sh
npm install @sullivan/slim --save-dev
```
or
```sh
yarn add @sullivan/slim --dev
```

## Usage

Slim can be used in two ways, as a template literal or as a function. Arguments within double brackets are processed. NOTE: whitespace will be trimmed and is not preserved. 

```
const slim = require('@sullivan/slim');

const context = {
  greeting: 'Hello',
};

slim`{{greeting}}`(context); // Hello

slim('{{greeting}}')(context); // Hello
```

### Context
The context argument MUST be an object and can contain synchronous functions. 

##### Properties
Properties are scoped to the template and anything within the double brackets will be processed as javascript. 
```
const slim = require('@sullivan/slim');

const context = {
  x: 25,
  y: 75,
};

slim('{{ x + y }}')(context); // 100
```


##### Functions
Using functions can be invoked with the context object, or within the double bracket definition. 

Example:
```
const slim = require('@sullivan/slim');

const context = {
  numbers: [1, 2, 3],
  addNumbers: (ctx) => ctx.numbers.reduce((a, i) => a + i, 0),
  add: (p1, p2) => p1 + p2,
};


const rendered = slim`
  total: {{addNumbers}}
  manual: {{ add(3, 27) }}
`(context); 
//
//  total: 6
//  manual: 30
// 
```

