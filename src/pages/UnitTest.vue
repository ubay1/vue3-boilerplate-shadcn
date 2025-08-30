<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { Input } from '@/components/ui/input'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const props = defineProps<{
  initialTodos?: Todo[]
}>()

const todos = ref<Todo[]>(props.initialTodos ?? [])
const input = ref('')

const addTodo = () => {
  if (input.value !== '') {
    todos.value.push({
      id: todos.value.length + 1,
      text: input.value,
      completed: false,
    })
    input.value = ''
  }
}
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle data-test="title">Unit Test With Vitest + Vue Test Utils</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4">
        <Input
          data-test="input-todo"
          type="text"
          autocomplete="off"
          placeholder="Enter todo"
          v-model="input"
        />
        <Button data-test="add-todo" type="button" :disabled="input === ''" @click="addTodo">
          Add
        </Button>

        <ul class="list-none flex flex-col gap-2">
          <template v-if="todos.length === 0">
            <li data-test="todo-list">No todos yet</li>
          </template>
          <template v-else>
            <li data-test="todo-list" v-for="(todo, index) in todos" :key="index">
              <div class="flex items-center space-x-2">
                <Checkbox
                  :id="String(todo.id)"
                  v-model="todo.completed"
                  data-test="todo-checkbox"
                />
                <!-- <input
                  :id="String(todo.id)"
                  type="checkbox"
                  v-model="todo.completed"
                  data-test="todo-checkbox"
                /> -->
                <label
                  data-test="text-todo"
                  :for="String(todo.id)"
                  :class="['text-sm', todo.completed ? 'line-through' : '']"
                >
                  {{ todo.text }}
                </label>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </CardContent>
    <CardFooter class="text-center text-sm flex justify-center">
      <RouterLink to="/" class="underline"> Go to Home Page </RouterLink>
    </CardFooter>
  </Card>
</template>
