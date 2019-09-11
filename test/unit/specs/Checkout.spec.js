import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Checkout from '@/components/Checkout'

const factory = (values = {}) => {
  return shallowMount(Checkout, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Checkout', () => {

  it('renders an error when card number is < 11 digits', () => {
    const wrapper = factory({ card: '' })

    expect(wrapper.find('.form__message').exists()).toBeTruthy()
  })

  it('renders an error when cardholder name is < 2 characters', () => {
    const wrapper = factory({ name: '' })

    expect(wrapper.find('.form__message').exists()).toBeTruthy()
  })

  it('renders an error when cvv  is < 3 characters', () => {
    const wrapper = factory({ cvv: '' })

    expect(wrapper.find('.form__message').exists()).toBeTruthy()
  })

  it('does not render an error when cvv is 3 digits or more', () => {
    const wrapper = factory({ name: '1234'  })

    expect(wrapper.find('.form__message').exists()).toBeFalsy()
  })
})