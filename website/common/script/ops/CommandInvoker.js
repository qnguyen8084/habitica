class CommandInvoker {
  constructor() {
    this.commands = [];
  }

  addCommand (command) {
    this.commands.push(command);
  }

  execute () {
    for (let i = 0; i < this.commands.length; i++) {
      this.commands[i].execute();
    }
  }
}

export default CommandInvoker;
