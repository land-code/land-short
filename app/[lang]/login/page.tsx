import LoginForm from '@/app/components/login-form'
import { getDictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'

const Login = async ({
  params: { lang }
}: {
  params: {
    lang: Locale
  }
}): Promise<JSX.Element> => {
  const dictionary = await getDictionary(lang)
  return (
    <div className='flex justify-center'>
      <LoginForm dictionary={dictionary.loginForm} lang={lang} />
    </div>
  )
}

export default Login
