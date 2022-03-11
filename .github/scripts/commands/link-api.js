const { useHelpers, Reactions } = require('../helpers');

module.exports = {
  command: 'link-api',
  usage: '/link-api [branch-name]',
  description: 'Configure the review app to use a specific api (default to the branch with the same name)',
  execute: async ({github, context, core}) => {
    const { addComment, addReaction } = useHelpers({github, context, core});

    await addComment('Deploy in progress! ![Deploying](https://media.giphy.com/media/dVnzGW7UehcEpwLxBm/giphy.gif)');
    await addReaction();
  }
}
