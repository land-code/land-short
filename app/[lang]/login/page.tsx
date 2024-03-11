import LoginForm from '@/components/ui/login-form'
import { getDictionary } from '@/app/get-dictionary'
import { Locale } from '@/app/i18n-config'
import { Typography } from '@/components/ui/typography'

const Login = async ({
  params: { lang }
}: {
  params: {
    lang: Locale
  }
}): Promise<JSX.Element> => {
  const dictionary = await getDictionary(lang)
  return (
    <div className='flex flex-col items-center mt-8 justify-center'>
      <Typography as='h2' className='mb-2'>{dictionary.login}</Typography>
      <LoginForm dictionary={dictionary.loginForm} lang={lang} />
    </div>
  )
}

export default Login
