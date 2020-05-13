const isInt = (char) => {
  if (isNaN(parseInt(char))) {
    return 0;
  }
  else {
    return 1;
  }
}

class UserInput {
  constructor() {
    this.input = [];
    this.len = 0;
  }

  clear() {
    this.input = [];
    this.len = 0;
  }

  push(char) {
    this.input.push(char);
    this.len++;
  }

  parse() {
    for (i = 0; i < this.len; i++) {

    }
    switch(this.len) {
      case 0:
        return;
      case 1:
        if (! isInt(this.input[0])) {
          throw "Invalid input";
        }
        console.log(parseInt(this.input[0]));
        return;
      case 2:
        throw "Invalid input";
    }

    let res = this.input[0];
    for (i = 1; i < this.len; i += 2) {
      res = operate(res, this.input[i+1], this.input[i]);
    }
    console.log(res);
  }
}

const operate = (n1, n2, op) => {
  a = parseInt(n1);
  b = parseInt(n2);

  if (isNaN(a) || isNaN(b)) {
    throw "Invalid input";
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
      throw "Invalid operator";
  }
}

const parser = (input) => {
  try {
    input.parse();
  }
  catch {
    console.log("invalid input");
  }
  input.clear();
}


const main = () => {
  const buttons = "1234567890=+-*/C";

  input = new UserInput();

  for (i = 0; i < buttons.length; i++) {
    let btn = document.createElement('button');
    btn.innerHTML = buttons[i];
    btn.id = buttons[i];
    btn.type = 'button';
    if (buttons[i] === '=') {
      btn.addEventListener("click", () => {parser(input)});
    }
    else if (buttons[i] === 'C') {
      btn.addEventListener("click", () => {input.clear()});
    }
    else {
      btn.addEventListener("click", () => {input.push(btn.innerHTML)});
    }

    document.getElementById("buttons").appendChild(btn);
  }
}

main();
