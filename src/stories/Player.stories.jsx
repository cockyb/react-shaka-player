import React from "react";

import { App } from "./Player";

export default {
  title: "Example/App",
  component: App,
  parameters: {},
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
