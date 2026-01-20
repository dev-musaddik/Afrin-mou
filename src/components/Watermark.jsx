import { useEffect, useState } from 'react';

const Watermark = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden opacity-[0.03] select-none flex flex-wrap content-center justify-center gap-20 -rotate-12">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="text-white font-mono text-xl whitespace-nowrap">
          PROTECTED • DO NOT COPY • FARIYA AFRIN MOU
        </div>
      ))}
    </div>
  );
};

export default Watermark;
