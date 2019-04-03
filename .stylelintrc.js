module.exports = {
  "plugins": [
     "stylelint-scss"
   ],
   "rules": {
     "block-no-empty": true,
     "block-opening-brace-space-before": "always",
     "block-opening-brace-newline-after": "always",
     "block-closing-brace-newline-before": "always",
     "block-closing-brace-newline-after": ["always",{
       ignoreAtRules: ["if", "else"]
     }],
     "color-hex-case": "lower",
     "color-hex-length": "long",
     "color-named": "never",
     "color-no-invalid-hex": true,
     "no-eol-whitespace": true,
     "declaration-bang-space-after": "never",
     "declaration-bang-space-before": "always",
     "declaration-block-semicolon-newline-after": "always",
     "declaration-block-semicolon-space-before": "never",
     "declaration-block-single-line-max-declarations": 1,
     "declaration-block-trailing-semicolon": "always",
     "declaration-colon-space-after": "always-single-line",
     "declaration-colon-space-before": "never",
     "declaration-block-no-duplicate-properties": [true,{
       ignore: ["consecutive-duplicates-with-different-values"]
     }],
     "function-comma-space-after": "always-single-line",
     "function-parentheses-space-inside": "never",
     "function-url-quotes": "always",
     "function-whitespace-after": "always",
     "indentation": 2,
     "length-zero-no-unit": true,
     "max-empty-lines":1,
     "media-feature-parentheses-space-inside": "never",
     "number-leading-zero": "always",
     "number-no-trailing-zeros": true,
     "property-no-unknown": true,
     "scss/at-import-no-partial-leading-underscore": true,
     "selector-combinator-space-after": "never",
     "selector-combinator-space-before": "never",
     "selector-attribute-brackets-space-inside":"never",
     "selector-max-compound-selectors": 7,
     "selector-no-qualifying-type": [true, {
       ignore: ["attribute", "class", "id"]
     }],
     "selector-pseudo-element-colon-notation": "single",
     "selector-pseudo-element-no-unknown": true,
     "string-quotes": "double",
     "value-list-comma-space-after": "always",
     "value-list-comma-space-before": "never"
   }
 }
 