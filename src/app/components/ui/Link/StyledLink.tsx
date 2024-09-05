import React from 'react';
import UnstyledLink from './UnstyledLink';

export type StyledLink = {
  href: string;
  className?: string;
  children: React.ReactNode;
};
const StyledLink = ({ href, className, children }: StyledLink) => {
  const LinkStyle = 'hover:underline hover:text-blue-400 hover:font-semibold';
  return (
    <UnstyledLink href={href} className={`${LinkStyle} ${className}`}>
      {children}
    </UnstyledLink>
  );
};

export default StyledLink;
