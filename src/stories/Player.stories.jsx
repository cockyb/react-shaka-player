import React from "react";

import { Player } from "./Player";

export default {
  title: "Example/Player",
  component: Player,
  parameters: {},
};

const Template = (args) => <Player {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
