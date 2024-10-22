import get from 'lodash/get';
import uuid from '../../libs/uuid';
import Command from '../Commandd'; // Assuming Command is defined in the same directory

class AddTagCommand extends Command {
  constructor (user, req = {}) {
    super();
    this.user = user;
    this.req = req;
  }

  execute () {
    if (!this.user.tags) {
      this.user.tags = [];
    }

    this.user.tags.push({
      name: this.req.body.name,
      id: get(this.req, 'body.id') || uuid(),
    });
  }
}

export default AddTagCommand;
