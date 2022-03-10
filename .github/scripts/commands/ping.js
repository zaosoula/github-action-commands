const { useHelpers, Reactions } = require('../helpers');

module.export = {
  command: 'ping',
  execute: async ({github, context, core}) => {
    const { addComment, addReaction } = useHelpers({github, context, core});

    await addComment('![Ping Pong](https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif)');
    await addReaction();
  }
}
