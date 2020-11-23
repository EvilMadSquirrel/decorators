function Logger(message: string) {
  console.log("Started logger");
  return function (_: Function) {
    console.log(message);
  };
}

function WithTemplate(template: string, hookID: string) {
  console.log("Started template maker");
  return function (_: Function) {
    console.log("Working with template");
    const el = document.querySelector(`#${hookID}`);
    if (el) {
      el.innerHTML = template;
    }
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
