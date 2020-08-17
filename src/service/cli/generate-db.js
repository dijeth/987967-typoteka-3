'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const {generatePosts} = require(`../utils`);
const {
  ExitCode,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
  MOCK_FILE,
} = require(`../const`);
// const {DB} = require(`../db`);
const {createDataBase} = require(`../utils`);

const createDB = async (postCount, userCount) => {
  const {users, posts, categories} = await generatePosts(postCount, userCount);
  fs.promises.writeFile(MOCK_FILE, JSON.stringify({categories, users, posts}));

  // const db = new DB();
  try {
    await createDataBase(`typoteka`, users, categories, posts);
    // await db.authenticate();
    // await db.createMockDB(posts, users, categories);
    // await db.close();

    console.info(chalk.green(Message.DB_SUCCESS));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.DB_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate-db`,
  async run(arg) {
    let [postCount, userCount] = arg;
    postCount = parseInt(postCount, 10) || DEFAULT_POSTS_COUNT;
    userCount = parseInt(userCount, 10) || DEFAULT_USER_COUNT;

    if (postCount > MAX_POSTS_COUNT) {
      console.error(chalk.red(Message.WRONG_POSTS_COUNT));
      return ExitCode.ERROR;
    }

    if (userCount > MAX_USER_COUNT) {
      console.error(chalk.red(Message.WRONG_USER_COUNT));
      return ExitCode.ERROR;
    }

    return createDB(postCount, userCount);
  }
};
