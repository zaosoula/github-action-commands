const { useHelpers, Reactions } = require('../helpers');

module.exports = {
  command: 'ping',
  usage: '/ping',
  description: 'pong',
  execute: async ({github, context, core}) => {
    const { addComment, addReaction } = useHelpers({github, context, core});

    await addComment('![Ping Pong](https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif)');
    await addReaction();
  }
}
