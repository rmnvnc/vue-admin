import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(false)

    const isAuthenticated = computed(() => !!user.value)

    const login = async ({ domain, login, password }) => {
        console.log(domain, login, password)
        let url = domain + '/rpc/'

        const xmlBody = `<env:Envelope
                xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:enc="http://schemas.xmlsoap.org/soap/encoding/"
                env:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"
                xmlns:xs="http://www.w3.org/1999/XMLSchema"
                xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance">
            <env:Header/>
            <env:Body>
                <login xmlns="uri:XULadmin">
                    <login xmlns="" xsi:type="xs:string">${login}</login>
                        <pass xmlns="" xsi:type="xs:string">${password}</pass>
                        <code xmlns="" xsi:type="xs:string"></code>
                    </login>
            </env:Body>
        </env:Envelope>`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: 'uri:XULadmin/login',
            },
            credentials: 'include',
            body: xmlBody,
        })

        const responseData = await response.json()

        if (!response.ok) {
            const message =
                typeof responseData.message === 'string'
                    ? responseData.message
                    : 'Failed to authenticate. Check your login data.'
            throw new Error(message)
        } else {
            user.value = true
        }
    }

    return {
        isAuthenticated,
        login,
    }
})
