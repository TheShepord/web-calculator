const isInt = (char) => {
  if (isNaN(parseInt(char))) {
    return false;
  }
  else {
    return true;
  }
}

class UserInput {
  constructor() {
    this.input = [];
    this.len = 0;

    this.ops = "+-*/"
    this.err = false;
    this.res = true;
    this.neg = false;

  }

  clear() {
    this.input = [];
    this.len = 0;
  }

  updateDisplay() {
    document.getElementById("display").innerHTML = this.input.join("");
    console.log(this.input);
  }

  add(char) {
    if (this.res) {
      this.switchRes();

      if (! this.ops.includes(char)) {
        this.clear();
      }
      else {
        this.input.push(document.getElementById("display").innerHTML);
        this.len++;
      }
    }

    else if (this.err) {
      this.switchErr();
      this.clear();
    }

    let input = this.input;
    let len = this.len;

    if (len === 0) {
      if (char != "0") {
        this.input.push(char);
        this.len++;
      }
      else {
        document.getElementById("display").innerHTML = "0";
        return 0;
      }

      if (char === '-') {
        this.neg = true;
      }
    }
    else if ((isInt(char) && isInt(input[len-1])) || this.neg ) {
      this.input[len-1] = [input[len-1],char].join("");
      this.neg = false;
    }
    else {
      // check whether negative number
      this.input.push(char);
      this.len++;
    }

    this.updateDisplay();
  }

  write(str) {
    for (let i = 0; i < str.length; i++) {
      this.add(str[i]);
    }
  }

  parse() {
    let input = this.input;
    let len = this.len;

    switch(len) {
      case 0:
        return;
      case 1:
        if (! isInt(input[0])) {
          throw "invalid input";
        }
        let res = input[0];
        return Number(res);
      case 2:
        throw "invalid input";
    }

    let res = input[0];
    for (let i = 1; i < len; i += 2) {
      res = operate(res, input[i+1], input[i]);

    }
    document.getElementById("display").innerHTML = Number(res.toFixed(5));

    return Number(res.toFixed(5));
  }

  switchErr() {
    this.err = ! this.err;
  }

  switchRes() {
    this.res = ! this.res;
  }

  getDisplay() {
    return this.input;
  }
}

const operate = (n1, n2, op) => {
  a = parseInt(n1);
  b = parseInt(n2);

  if (isNaN(a) || isNaN(b)) {
    throw "invalid input";
  }
  switch(op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw "invalid input";
  }
}

const clearDisplay = (input, def) => {
  input.clear();
  input.write(def);
  document.getElementById("display").innerHTML = def;
  input.clear();
}

const parser = (input) => {
  try {
    res = input.parse();
    console.log(res);
    input.clear();
    input.write(res.toString(10));
    input.clear();
    input.switchRes();
  }
  catch (err) {
    if (err === "invalid input") {
      res = input.getDisplay();
      input.clear();
      input.write("ERR");
      input.switchErr();
      window.setTimeout(clearDisplay, 300, input, res.join(""));

    }
    else {
      input.clear();
      throw(err);
    }

  }
}

const main = () => {
  // const buttons = "1234567890=+-*/C";

  input = new UserInput();

  const buttons = document.getElementById("buttons").children

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].id === '=') {
      buttons[i].addEventListener("click", () => {parser(input)});
    }
    else if (buttons[i].id === 'C') {
      buttons[i].addEventListener("click", () => {clearDisplay(input, "0")});
    }
    else {
      buttons[i].addEventListener("click", () => {input.add(buttons[i].innerHTML)});
    }
  }
  // for (i = 0; i < buttons.length; i++) {
  //   let btn = document.createElement('button');
  //   btn.innerHTML = buttons[i];
  //   btn.id = buttons[i];
  //   btn.type = 'button';
    // if (buttons[i] === '=') {
    //   btn.addEventListener("click", () => {parser(input)});
    // }
    // else if (buttons[i] === 'C') {
    //   btn.addEventListener("click", () => {input.clear()});
    // }
    // else {
    //   btn.addEventListener("click", () => {input.push(btn.innerHTML)});
    // }
  //
  //   document.getElementById("buttons").appendChild(btn);
  // }
}
main();
