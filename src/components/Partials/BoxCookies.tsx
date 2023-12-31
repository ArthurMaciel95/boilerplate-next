import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import privacyPolicyModalStore from '../../stores/modals/privacyPolicyModalStore'
import { Button } from '../Buttons/Button'

export const BoxCookies = () => {
  const { setModalState } = privacyPolicyModalStore()
  const [openBoxCookie, setOpenBoxCookie] = useState(true)

  function setCookie() {
    Cookies.set('user-accept-cookies', 'hasCookie', {
      expires: 31557600,
    })
    setOpenBoxCookie(false)
  }

  function checkCookie() {
    const cookie = Cookies.get('user-accept-cookies')
    if (!cookie) {
      setOpenBoxCookie(true)
    } else {
      setOpenBoxCookie(false)
    }
  }

  useEffect(() => {
    checkCookie()
  }, [])

  return (
    <div
      className="fixed bottom-4 left-[50%] z-50 max-w-full -translate-x-1/2 overflow-hidden rounded-xl border bg-zinc-500 p-5"
      style={{
        display: openBoxCookie ? 'block' : 'none',
      }}
    >
      <div className="p-5">
        <div>
          <h4 className="text-brand-gray-100 text-2xl font-semibold">
            Esse site usa cookies
          </h4>
          <p className="my-4 md:my-2">
            Nós armazenamos dados temporariamente para melhorar a sua
            experiência de navegação e recomendar conteúdo de seu interesse. Ao
            utilizar nossos serviços, você concorda com tal monitoramento.
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="primaryGreen" onClick={() => setModalState(true)}>
            Política de Privacidade
          </Button>
          <Button variant="primaryViolet" onClick={setCookie}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  )
}
