const maxNestingDepth = 10

module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: [
    'stylelint-scss'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': ['always', {
      ignore: ['stylelint-commands', 'after-comment']
    }],
    'value-list-comma-newline-after': 'never-multi-line',
    'declaration-colon-space-after': 'always',
    'selector-no-qualifying-type': [false, {
      ignore: ['attribute', 'class', 'id']
    }],
    'max-empty-lines': 2,
    'selector-max-compound-selectors': 6,
    'order/properties-alphabetical-order': null,
    'max-nesting-depth': [maxNestingDepth, {
      ignore: ['pseudo-classes']
    }],
    'rule-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['after-comment']
    }],
    'unit-whitelist': ['em', 'rem', '%', 's', 'px', 'vh', 'vw', 'deg', 'ms'],
    'scss/at-extend-no-missing-placeholder': true,
    'selector-class-pattern': null
  }
}
