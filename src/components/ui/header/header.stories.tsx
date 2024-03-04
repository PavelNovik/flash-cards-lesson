import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta = {
  argTypes: {
    variant: {
      // control: { type: 'radio' },
      // options: ['isLoggedIn'],
    },
  },
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderLayout: Story = {
  args: {
    isLoggedIn: true,
  },
}
