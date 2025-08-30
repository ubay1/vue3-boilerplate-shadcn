<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// Form validation
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { Toaster } from './components/ui/sonner'
import 'vue-sonner/style.css'
import { toast } from 'vue-sonner'

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
  toast.success(`Form submitted!, username: ${values.username}`)
})
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-50">
    <RouterView />
    <Toaster />
  </main>
</template>
