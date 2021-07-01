import { Story, Meta } from '@storybook/react';

import LoginForm from '.';

export default {
  title: 'LoginForm',
  component: LoginForm,
} as Meta;

const Template: Story = () => <LoginForm />;

export const Primary = Template.bind({});
