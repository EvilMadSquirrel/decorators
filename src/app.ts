function WithTemplate(template: string, hookID: string) {
  return function (_: Function) {
    const el = document.querySelector(`#${hookID}`);
    if (el) {
      el.innerHTML = template;
    }
  };
}
@WithTemplate("<h1>Hello from Decorator</h1>", "app")
class Person {
  name = "Serega";
  constructor() {
    console.log("Creating a Person object...");
  }
}

const p1 = new Person();
