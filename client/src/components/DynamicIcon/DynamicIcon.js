import React, { useMemo } from 'react';

import { icons } from '../../data/icons.data.js';

const DynamicIcon = ({ name, className }) => {
  const DynamicIcon = useMemo(() => icons[name], [name]);

  if (!DynamicIcon) {
    return null;
  }

  return <DynamicIcon className={className} />;
};

export default DynamicIcon;
