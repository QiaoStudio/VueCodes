import { storiesOf } from '@storybook/vue'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import PantryAnnouncementReadme from './basic.md'
import { withDocs } from 'storybook-readme'

const labelColorMode = {
  '': 'Green',
  'dp-label--red': 'Red',
  'dp-label--orange': 'Orange',
  'dp-label--gray': 'Gray'
}

const labelSizeMode = {
  '': 'Small',
  'dp-label--md': 'Medium',
  'dp-label--lg': 'Large'
}

storiesOf('Modules', module)
  .addDecorator(withDocs(PantryAnnouncementReadme))
  .addDecorator(withKnobs)
  .add('Announcement', () => {
    return {
      data () {
        return {
          labelText: text('Label', 'New'),
          labelColor: select('Label Color', labelColorMode, ''),
          labelSize: select('Label Size', labelSizeMode, ''),
          content: text('Content', 'Get an awesome Thai Milk Tea!'),
          isLinked: text('Is linked?', ''),
          target: boolean('Target', false),
          isInverse: boolean('Is inverse?', false)
        }
      },
      computed: {
        inverseBackground() {
          let bg = 'transparent'
          if (this.isInverse) {
            bg = '#000;'
          }
          return bg
        }
      },
      template: `<div style="padding: 20px;" :style="'background-color:' + inverseBackground">
                   <dp-pantry-announcement :labelText="labelText"
                                           :labelColor="labelColor"
                                           :labelSize="labelSize"
                                           :content="content"
                                           :isLinked="isLinked"
                                           :target="target"
                                           :isInverse="isInverse"></dp-pantry-announcement>
                 </div>`
    }
  })
