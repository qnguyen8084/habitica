import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import i18n from '../../i18n';
import { NotFound } from '../../libs/errors';
import Command from '../Commandd'; // Assuming Command is defined in the same directory

class UpdateTagCommand extends Command {
  constructor(user, req = {}) {
    super();
    this.user = user;
    this.req = req;
  }

  execute() {
    const tid = get(this.req, 'params.id');

    const index = findIndex(this.user.tags, {
      id: tid,
    });

    if (index === -1) {
      throw new NotFound(i18n.t('messageTagNotFound', this.req.language));
    }

    this.user.tags[index].name = get(this.req, 'body.name');
    return this.user.tags[index];
  }
}

export default UpdateTagCommand;
