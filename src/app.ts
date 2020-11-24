function Logger(message: string) {
  console.log("Started logger");
  return function (_: Function) {
    console.log(message);
  };
}

function WithTemplate(template: string, hookID: string) {
  console.log("Started template maker");
  return function <T extends { new (...args: any[]): {} }>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Working with template");
        const el = document.querySelector(`#${hookID}`);
        if (el) {
          el.innerHTML = template;
        }
      }
    };
  };
}
@Logger("Logging")
@WithTemplate("<h1>Hello from Decorator</h1>", "app")
class Person {
  name = "Serega";
  constructor() {
    console.log("Creating a Person object...");
  }
}

const p1 = new Person();

function Log(target: any, propName: string) {
  console.log("Property decorator");
  console.log(target);
  console.log(propName);
}
function Log1(target: any, propName: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(propName);
  console.log(descriptor);
}
function Log2(target: any, propName: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator");
  console.log(target);
  console.log(propName);
  console.log(descriptor);
}
function Log3(target: any, propName: string, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(propName);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;
  @Log1
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Price must be positive");
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }
  @Log2
  getPriceWithTax(@Log3 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const bindFn = oldMethod.bind(this);
      return bindFn;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = "That works!";
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();

const button = document.querySelector("button");
button?.addEventListener("click", p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form");
courseForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.querySelector("#title") as HTMLInputElement;
  const priceEl = document.querySelector("#price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Not valid input data! Try again.");
    return;
  }
  console.log(createdCourse);
});
