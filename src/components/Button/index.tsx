import React, { FC, PropsWithChildren } from 'react';

const Button: FC = (props: PropsWithChildren<unknown>) => {
    const { children } = props;
    return <button type="button">{children}</button>;
};

export default Button;
