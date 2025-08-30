<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
// Form validation
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'vee-validate'
import 'vue-sonner/style.css'
import { toast } from 'vue-sonner'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import { RouterLink } from 'vue-router'

const schema = z.object({
  username: z
    .string({
      required_error: 'Username wajib diisi',
    })
    .min(3, 'Username minimal 3 karakter'),
  password: z
    .string({
      required_error: 'Password wajib diisi',
    })
    .min(6, 'Password minimal 6 karakter'),
})

// wrap ke typed schema buat vee-validate
const formSchema = toTypedSchema(schema)
// ambil type dari schema asli
export type FormValues = z.infer<typeof schema>
// bikin form instance
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

// typing values langsung dapet dari Zod
const onSubmit = handleSubmit((values: FormValues) => {
  toast.success(`Form submitted!`, {
    description: `Username: ${values.username}, Password: ${values.password}`,
  })
})
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Vue 3 + VeeValidate + Zod</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col gap-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" :validate-on-blur="false" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                autocomplete="off"
                placeholder="Username"
                v-bind="componentField"
                data-testid="home-example-form-input"
              />
            </FormControl>
            <FormMessage v-slot="{ message }" data-testid="home-example-error-msg">
              {{ message }}
            </FormMessage>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" :validate-on-blur="false" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                autocomplete="off"
                placeholder="Password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage v-slot="{ message }">
              {{ message }}
            </FormMessage>
          </FormItem>
        </FormField>

        <Button type="submit" data-testid="home-example-btn-submit"> Submit </Button>
      </form>
    </CardContent>
    <CardFooter class="text-center text-sm flex flex-col justify-center gap-2">
      <RouterLink to="/unit-test" class="underline"> Go to Unit Test Page </RouterLink>
      <RouterLink to="/e2e" class="underline"> Go to E2E Test Page </RouterLink>
    </CardFooter>
  </Card>
</template>
