import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div>
      <br />
      <Button as={'a'} href={'google.com'} variant={'primary'}>
        hello
      </Button>
      <br />
      <Button variant={'primary'}>hello</Button>
    </div>
  )
}
