import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import PantryButtonReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Button from './button'
storiesOf('Elements', module)
  .addDecorator(withDocs(PantryButtonReadme))
  .addDecorator(withKnobs)
  .add('Button', () => {
    return Button
  })
