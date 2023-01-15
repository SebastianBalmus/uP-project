module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'linebreak-style': 0,
        'react/function-component-definition': [
            2,
            {
                'namedComponents': 'arrow-function',
                'unnamedComponents': 'arrow-function'
            }
        ],
        'class-methods-use-this': 0,
        'react/no-children-prop': 0,
        'react/default-props-match-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-props-no-spreading': 0,
        '@typescript-eslint/return-await': 0,
        'import/no-extraneous-dependencies': 0
    }
};
