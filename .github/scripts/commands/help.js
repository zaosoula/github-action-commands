const { useHelpers, Reactions } = require('../helpers');

module.exports = {
  command: 'help',
  usage: '/help',
  description: '',
  execute: async (ctx) => {
    const { commands } = ctx;
    const { addComment, addReaction } = useHelpers(ctx);

    let comment = `### Help\n\n\n${
      commands.map(
        command => `${command.usage} \`\`${command.description || ' '}\`\``
      ).join('\n\n')}`

    await addComment(comment);
    await addReaction();
  }
}
