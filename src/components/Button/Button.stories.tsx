import { Story, Meta } from '@storybook/react';
import SearchIcon from '@ant-design/icons/SearchOutlined';

import Button, { Props } from '.';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      name: 'type',
      defaultValue: 'primary',
      options: ['default', 'primary', 'dashed', 'text', 'link'],
      control: { type: 'select' },
    },
    size: {
      name: 'size',
      defaultValue: 'default',
      options: ['default', 'large', 'small'],
      control: { type: 'select' },
    },
    shape: {
      name: 'shape',
      defaultValue: 'default',
      options: ['default', 'circle', 'round'],
      control: { type: 'select' },
    },
    disabled: {
      name: 'disabled',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    danger: {
      name: 'danger',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    block: {
      name: 'block',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    loading: {
      name: 'loading',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Click me!',
};

export const Icon = Template.bind({});
Icon.args = {
  icon: <SearchIcon />,
};
