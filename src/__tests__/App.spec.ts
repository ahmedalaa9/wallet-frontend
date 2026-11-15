import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import App from '../App.vue'
import router from '../router'

describe('App', () => {
  it('renders the navigation and the feed page by default', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('Digital Wallet')
    expect(wrapper.text()).toContain('Live transactions')
  })

  it('navigates to the send money page', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } })
    await router.push('/send')
    await new Promise((resolve) => setTimeout(resolve))
    expect(wrapper.text()).toContain('Send money')
    expect(wrapper.text()).toContain('request preview')
  })
})
