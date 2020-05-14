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
  }

  clear() {
    this.input = [];
    this.len = 0;
  }

  push(char) {
    let input = this.input;
    let len = this.len;

    if (isInt(char) && isInt(input[len-1])) {
      this.input[len-1] = [input[len-1],char].join("");
    }
    else {
      this.input.push(char);
      this.len++;
    }

    document.getElementById("display").innerHTML = input.join("")
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
        console.log(parseInt(input[0]));
        return;
      case 2:
        throw "invalid input";
    }

    let res = input[0];
    for (let i = 1; i < len; i += 2) {
      res = operate(res, input[i+1], input[i]);
    }
    document.getElementById("display").innerHTML = parseFloat(res.toFixed(5));
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

const parser = (input) => {
  try {
    input.parse();
  }
  catch (err) {
    if (err === "invalid input") {
      console.log("invalid input");
    }
    else {
      input.clear();
      throw(err);
    }

  }
  input.clear();
}

const clearDisplay = (input) => {
  input.clear();
  document.getElementById("display").innerHTML = "0";
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
      buttons[i].addEventListener("click", () => {clearDisplay(input)});
    }
    else {
      buttons[i].addEventListener("click", () => {input.push(buttons[i].innerHTML)});
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
