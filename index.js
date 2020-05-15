const isInt = (char) => {
  // determines whether given char/str a number
  if (isNaN(parseInt(char))) {
    return false;
  }
  else {
    return true;
  }
}

class UserInput {
  constructor() {
    this.input = []; // maintains the display
    this.len = 0;

    this.ops = "+-*/" // operations
    this.err = false; // error flag, true when inputted sequence is invalid
    this.res = true; // result flag. Begins diplaying 0, so initially true
    this.neg = false; // starting negative sign flag

  }

  clear() {
    // clears input, but doesn't change display
    this.input = [];
    this.len = 0;
  }

  updateDisplay(str) {
    // updates display with str
    let display =  document.getElementById("display");
    display.innerHTML = str;
    display.scrollLeft = display.scrollWidth;
  }

  add(char) {
    // pushes char onto display
    if (this.res) {
      this.flipRes();

      if (! this.ops.includes(char)) {
        this.clear();
      }
      else {
        this.input.push(document.getElementById("display").innerHTML);
        this.len++;
      }
    }

    if (this.err) {
      this.flipErr();
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

    this.updateDisplay(this.input.join(""));
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

  flipErr() {
    this.err = ! this.err;
  }

  flipRes() {
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
  input.updateDisplay("0");
}

const parser = (input) => {
  try {
    res = input.parse();
    input.clear();
    input.write(res.toString(10));
    input.clear();
    input.flipRes();
  }
  catch (err) {
    if (err === "invalid input") {
      res = input.getDisplay();
      input.clear();
      input.write("ERR");
      input.flipErr();
      window.setTimeout(function(input, res) {
        input.updateDisplay(res.join(""));
        input.write(res.join(""));
      }, 300, input, res);


    }
    else {
      clearDisplay(input, "0");
      throw(err);
    }

  }
}

const main = () => {
  let input = new UserInput();

  const buttons = document.getElementById("calculator").children

  for (let i = 1; i < buttons.length; i++) {
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
}

main();
