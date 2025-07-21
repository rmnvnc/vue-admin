<template>
    <div v-if="auth.isAuthenticated">Logged in</div>
    <main>
        <form @submit.prevent="authForm">
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
                    :type="field.type || 'text'"
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

<script setup>
import { reactive, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const formSetup = reactive({
    domain: {
        label: 'Domain',
        val: '',
        isValid: true,
        isRequired: true,
    },
    login: {
        label: 'Login',
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

function validateField(key) {
    const field = formSetup[key]

    if (field.isRequired && !field.val) {
        field.isValid = false
    } else {
        field.isValid = true
    }
}

const formLoading = ref(false)
const error = ref('')

const authForm = async () => {
    Object.keys(formSetup).forEach(validateField)

    if (!isFormValid.value) {
        return
    }

    formLoading.value = true
    error.value = ''

    try {
        await auth.login({
            domain: formSetup.domain.val,
            login: formSetup.login.val,
            password: formSetup.password.val,
        })
    } catch (error) {
        console.log(error.code)
        error.value = error.message || 'Nastala neznáma chyba, skúste sa prihlásiť neskôr'
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
