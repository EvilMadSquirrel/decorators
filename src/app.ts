function Logger(message: string) {
  return function (constructor: Function) {
    console.log(message);
    console.log(constructor);
  };
}

@Logger("Logging Person")
class Person {
  name = "Serega";
  constructor() {
    console.log("Creating a Person object...");
  }
}

const p1 = new Person();
