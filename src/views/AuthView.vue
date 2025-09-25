<template>
    <main>
        <form @submit.prevent="submitLogin">
            <p v-if="error" class="error">{{ error }}</p>
            <div
                v-for="(field, key) in formSetup"
                :key="key"
                class="form-control"
                :class="{ invalid: !field.isValid }"
            >
                <label :for="`field-${key}`"> {{ field.label }}</label>
                <p v-if="!field.isValid" class="invalid-message">
                    {{ field.label }} je povinné pole
                </p>
                <input
                    :type="field.type"
                    :id="`field-${key}`"
                    v-model.trim="field.val"
                    @blur="validateField(key)"
                    :disabled="formLoading"
                />
            </div>
            <button type="submit" :disabled="formLoading">
                {{ formLoading ? 'Prihlasujem...' : 'Prihlásiť' }}
            </button>
        </form>
    </main>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import { AppError } from '@/types'
import type { FormField } from '@/types'

const auth = useAuthStore()

const formSetup = reactive<{
    login: FormField
    password: FormField
}>({
    login: {
        label: 'Login',
        type: 'text',
        val: '',
        isValid: true,
        isRequired: true,
    },
    password: {
        label: 'Heslo',
        type: 'password',
        val: '',
        isValid: true,
        isRequired: true,
    },
})

const isFormValid = computed(() =>
    Object.values(formSetup).every((f) => !f.isRequired || f.val !== ''),
)

function validateField(key: keyof typeof formSetup) {
    const field = formSetup[key]

    if (field.isRequired && !field.val) {
        field.isValid = false
    } else {
        field.isValid = true
    }
}

const formLoading = ref(false)
const error = ref('')
const router = useRouter()
const route = useRoute()

const redirectPath = (route.query.redirect as string) || '/'

const submitLogin = async () => {
    Object.keys(formSetup).forEach((key) =>
        validateField(key as keyof typeof formSetup),
    )

    if (!isFormValid.value) {
        return
    }

    formLoading.value = true
    error.value = ''

    try {
        await auth.login({
            username: formSetup.login.val,
            password: formSetup.password.val,
        })
        router.push(redirectPath)
    } catch (err) {
        const appErr = err as AppError
        error.value = appErr.message
    } finally {
        formLoading.value = false
    }
}
</script>

<style scoped>
form {
    margin-block: 2rem;
    max-width: 250px;
    margin-inline: auto;
}

.form-control {
    margin-bottom: 1rem;
}

.invalid,
.error {
    color: red;
}

.invalid-message {
    font-size: 14px;
    margin-bottom: 0.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    display: block;
    width: 100%;
    border: 1px solid var(--color-border);
    background-color: transparent;
    color: var(--color-text);
    padding: 8px 12px;
}

input:focus {
    border-color: var(--color-border-hover);
}

button[type='submit'] {
    margin-top: 2rem;
}
</style>
