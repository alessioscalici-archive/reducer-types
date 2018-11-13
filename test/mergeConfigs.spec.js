
const {
  mergeConfigs,
} = require('../src/redules');


const CONFIG_ARTICLE = {
  article: {
    actionHandlers: {
      PUBLISH_ARTICLE: state => state ? { ...state, state: 'published' } : state,
    },
    actionCreators: {
      publishArticle: article => ({ type: 'PUBLISH_ARTICLE' }),
    },
  },
};

const CONFIG_COMMENT = {
  comment: {
    actionHandlers: {
      PUBLISH_COMMENT: state => state ? { ...state, state: 'published' } : state,
    },
    actionCreators: {
      publishComment: article => ({ type: 'PUBLISH_COMMENT' }),
    },
  },
};

const CONFIG_AD = {
  ad: {
    actionHandlers: {
      PUBLISH_AD: state => state ? { ...state, state: 'published' } : state,
    },
    actionCreators: {
      publishComment: article => ({ type: 'PUBLISH_AD' }),
    },
  },
};


const CONFIG_ARTICLE_ADD_ACTION = {
  article: {
    actionHandlers: {
      UNPUBLISH_ARTICLE: state => state ? { ...state, state: 'unpublished' } : state,
    },
    actionCreators: {
      unpublishArticle: article => ({ type: 'UNPUBLISH_ARTICLE' }),
    },
  },
};

it('should return a new config with all the types of the given configs', () => {
  const newConfig = mergeConfigs(CONFIG_ARTICLE, CONFIG_COMMENT, CONFIG_AD);

  expect(newConfig.article).toBe(CONFIG_ARTICLE.article);
  expect(newConfig.article.actionHandlers).toBe(CONFIG_ARTICLE.article.actionHandlers);
  expect(newConfig.article.actionCreators).toBe(CONFIG_ARTICLE.article.actionCreators);

  expect(newConfig.comment).toBe(CONFIG_COMMENT.comment);
  expect(newConfig.comment.actionHandlers).toBe(CONFIG_COMMENT.comment.actionHandlers);
  expect(newConfig.comment.actionCreators).toBe(CONFIG_COMMENT.comment.actionCreators);

  expect(newConfig.ad).toBe(CONFIG_AD.ad);
  expect(newConfig.ad.actionHandlers).toBe(CONFIG_AD.ad.actionHandlers);
  expect(newConfig.ad.actionCreators).toBe(CONFIG_AD.ad.actionCreators);
});


it('should be able to add actions to an existing type', () => {
  const newConfig = mergeConfigs(CONFIG_ARTICLE, CONFIG_ARTICLE_ADD_ACTION);

  expect(newConfig.article.actionHandlers).toHaveProperty('PUBLISH_ARTICLE', CONFIG_ARTICLE.article.actionHandlers.PUBLISH_ARTICLE);
  expect(newConfig.article.actionHandlers).toHaveProperty('UNPUBLISH_ARTICLE', CONFIG_ARTICLE_ADD_ACTION.article.actionHandlers.UNPUBLISH_ARTICLE);

  expect(newConfig.article.actionCreators).toHaveProperty('publishArticle', CONFIG_ARTICLE.article.actionCreators.publishArticle);
  expect(newConfig.article.actionCreators).toHaveProperty('unpublishArticle', CONFIG_ARTICLE_ADD_ACTION.article.actionCreators.unpublishArticle);
});
