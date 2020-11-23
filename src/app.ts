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
