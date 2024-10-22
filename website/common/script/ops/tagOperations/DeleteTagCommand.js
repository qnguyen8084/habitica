import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import each from 'lodash/each';
import i18n from '../../i18n';
import { NotFound } from '../../libs/errors';
import Command from '../Commandd'; // Assuming Command is defined in the same directory

class DeleteTagCommand extends Command {
  constructor (user, req = {}) {
    super();
    this.user = user;
    this.req = req;
  }

  execute () {
    const tid = get(this.req, 'params.id');

    const index = findIndex(this.user.tags, {
      id: tid,
    });

    if (index === -1) {
      throw new NotFound(i18n.t('messageTagNotFound', this.req.language));
    }

    const tag = this.user.tags[index];
    delete this.user.filters[tag.id];

    this.user.tags.splice(index, 1);

    each(this.user.tasks, task => delete task.tags[tag.id]);

    each(['habits', 'dailys', 'todos', 'rewards'], type => {
      if (this.user.markModified) this.user.markModified(type);
    });

    return this.user.tags;
  }
}

export default DeleteTagCommand;
