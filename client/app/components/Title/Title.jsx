import React from 'react';

const CenteredHeading = ({ title }) => (
    <div className="flex justify-center items-center my-5">
    <h1 className="text-2xl font-bold bg-blue-200 text-gray-800 uppercase tracking-wide text-center p-2">{title}</h1>
  </div>
);

export default CenteredHeading;