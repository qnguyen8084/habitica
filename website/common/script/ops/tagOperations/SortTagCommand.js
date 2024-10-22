import get from 'lodash/get';
import { BadRequest } from '../../libs/errors';
import Command from '../Commandd'; // Assuming Command is defined in the same directory

class SortTagCommand extends Command {
  constructor (user, req = {}) {
    super();
    this.user = user;
    this.req = req;
  }

  execute () {
    const to = get(this.req, 'query.to');
    const fromParam = get(this.req, 'query.from');

    const invalidTo = !to && to !== 0;
    const invalidFrom = !fromParam && fromParam !== 0;

    if (invalidTo || invalidFrom) {
      throw new BadRequest('?to=__&from=__ are required');
    }

    this.user.tags.splice(to, 0, this.user.tags.splice(fromParam, 1)[0]);
    return this.user.tags;
  }
}

export default SortTagCommand;
