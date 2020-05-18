const isInt = (char) => {
  // determines whether given char/str is a number
  if (isNaN(parseFloat(char)) && char != ".") {
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

    this.ops = "+-*/%" // operations
    this.err = false; // error flag, true when inputted sequence is invalid
    this.res = true; // result flag. Begins diplaying 0, so initially true
    this.neg = false; // starting negative sign flag

  }

  clear() {
    // clears input, but doesn't change display
    this.input = [];
    this.len = 0;
  }

  updateDisplay() {
    // updates display with str
    let display =  document.getElementById("display");
    display.innerHTML = this.input.length != 0 ? this.input.join("") : 0;
    display.scrollLeft = display.scrollWidth;

    // IF WOULD BE EMPTY, FILL WITH "0" INSTEAD!!!
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
      this.input.push(char);
      this.len++;
    }

    this.updateDisplay();
  }

  del() {
    let len = this.len
    let input = this.input

    if (len > 0) {
      if (input[len-1].length > 1) {
        this.input[len-1] = input[len-1].slice(0,-1);

      }
      else {
        this.input.pop();
        this.len--;
      }
    }

    this.updateDisplay();
  }

  write(str) {
    // like add, but for entire strings of characters
    for (let i = 0; i < str.length; i++) {
      this.add(str[i]);
    }
  }

  parse() {
    // parses input up to this point, displaying result
    let input = this.input;
    let len = this.len;

    if (this.res) {
      return(Number(document.getElementById("display").innerHTML));
    }

    switch(len) {
      case 0:
        return;
      case 1:
        if (! isInt(input[0]) || input[0].split(".").length > 2) {
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
    // err setter
    this.err = ! this.err;
  }

  flipRes() {
    // res setter
    this.res = ! this.res;
  }

  getDisplay() {
    // input getter
    return this.input;
  }
}

const operate = (n1, n2, op) => {
  // performs given operation on n1 and n2
  a = parseFloat(n1);
  b = parseFloat(n2);

  if (isNaN(a) || isNaN(b) || n1.split(".").length > 2 || n2.split(".").length > 2) {
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
    case '%':
      return a % b;
    default:
      throw "invalid input";
  }
}

const clearDisplay = (input) => {
  // clears display, displaying the given def until the next user input
  input.clear();
  input.updateDisplay();
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
        input.updateDisplay();
        input.write(res.join(""));
      }, 300, input, res);


    }
    else {
      clearDisplay(input);
      throw(err);
    }

  }
}

const main = () => {
  let input = new UserInput();

  const buttons = document.getElementById("calculator").children

  for (let i = 1; i < buttons.length; i++) {
    switch (buttons[i].id) {
      case 'eq':
        buttons[i].addEventListener("click", () => {parser(input)});
        break;
      case 'CE':
        buttons[i].addEventListener("click", () => {clearDisplay(input)});
        break;
      case 'C':
        buttons[i].addEventListener("click", () => {input.del()});
        break;
      default:
        buttons[i].addEventListener("click", () => {input.add(buttons[i].innerHTML)});
    }
  }
}

main();
