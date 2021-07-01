import { Story, Meta } from '@storybook/react';
import SearchIcon from '@ant-design/icons/SearchOutlined';

import Input, { Props } from '.';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    placeholder: {
      name: 'placeholder',
      defaultValue: 'Placeholder',
    },
    size: {
      name: 'size',
      defaultValue: 'default',
      options: ['default', 'large', 'small'],
      control: { type: 'select' },
    },
    disabled: {
      name: 'disabled',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    type: {
      name: 'type',
      defaultValue: 'text',
      options: ['text', 'password', 'number'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Input {...args} />;

export const Base = Template.bind({});

export const PrefixIcon = Template.bind({});
PrefixIcon.args = {
  prefix: <SearchIcon />,
};
