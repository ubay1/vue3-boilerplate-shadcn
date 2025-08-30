import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UnitTestPage from '../../../pages/UnitTest.vue'

/**
 * Vue Test Utils First
   1. Use mount() to render a component.
   2. Use get() and findAll() to query the DOM.
   3. trigger() and setValue() are helpers to simulate user input.
   4. Updating the DOM is an async operation, so make sure to use async and await.
   5. Testing usually consists of 3 phases; arrange, act and assert.
 */
describe('Unit Test Page', () => {
  it('mounts render & get title', () => {
    const wrapper = mount(UnitTestPage)
    const getText = wrapper.get('[data-test="title"]')
    expect(getText.text()).toBe('Unit Test With Vitest')
  })

  it('mount render todo', () => {
    const wrapper = mount(UnitTestPage)
    const getAllTodo = wrapper.get('[data-test="todo-list"]')
    expect(getAllTodo.text()).toBe('No todos yet')
  })

  it('create todo', async () => {
    const wrapper = mount(UnitTestPage)
    const findAllTodo = wrapper.findAll('[data-test="todo-list"]')
    await wrapper.get('[data-test="input-todo"]').setValue('New todo')
    await wrapper.get('[data-test="add-todo"]').trigger('submit')
    expect(findAllTodo).toHaveLength(1)
  })

  it('complete todo', async () => {
    const wrapper = mount(UnitTestPage, {
      props: {
        initialTodos: [{ id: 1, text: 'Belajar Vitest', completed: false }],
      },
    })

    // for input checkbox
    // await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

    // shadcn component checkbox using button not input checkbox
    await wrapper.get('[data-test="todo-checkbox"]').trigger('click')

    expect(wrapper.get('[data-test="text-todo"]').classes()).toContain('line-through')
  })
})

/**
 * For more advanced testing scenarios, refer to the official documentation:
 * - Vue Test Utils: https://test-utils.vuejs.org/
 * - Vitest: https://vitest.dev/
 */
