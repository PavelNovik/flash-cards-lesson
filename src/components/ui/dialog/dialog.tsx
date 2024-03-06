import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container/container'
import { Modal, ModalProps } from '@/components/ui/modal/modal'
export type DialogProps = ModalProps &
  Partial<{
    cancelTxt: string
    confirmTxt: string
    onCancel: () => void
    onConfirm: () => void
  }>
export const Dialog = ({
  cancelTxt = 'Cancel',
  children,
  confirmTxt = 'Ok',
  onCancel,
  onConfirm,
  ...modalProps
}: DialogProps) => {
  return (
    <Modal {...modalProps}>
      {children}
      <Container style={{ gap: '30px' }}>
        <Button onClick={onCancel} variant={'secondary'}>
          {cancelTxt}
        </Button>
        <Button onClick={onConfirm}>{confirmTxt}</Button>
      </Container>
    </Modal>
  )
}
