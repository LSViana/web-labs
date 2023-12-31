import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import WlButton from '~/components/experiments/forms-input/buttons/WlButton.vue'

describe('WlButton', () => {
  test('should render a <button>', () => {
    const wrapper = mount(WlButton, {
      props: {
        variant: 'primary'
      }
    })

    expect(wrapper.get('button').isVisible()).toBeTruthy()
  })

  test('should render the content of the default slot', () => {
    const wrapper = mount(WlButton, {
      props: {
        variant: 'primary'
      },
      slots: {
        default: 'Sign In'
      }
    })

    expect(wrapper.text()).toBe('Sign In')
  })
})
