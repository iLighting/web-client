import React, { Component, PropTypes } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';

const Manual = ({ location, children, routes }) => {
  return (
    <MainLayout activeKey="manual">
      {children}
    </MainLayout>
  );
};

Manual.propTypes = {
};

export default Manual;
