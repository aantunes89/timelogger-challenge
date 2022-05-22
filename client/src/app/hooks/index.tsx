import React from "react";

interface Props {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

export default function ComposedProvider(props: Props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp, index) => {
        return <Comp key={index}>{acc}</Comp>;
      }, children)}
    </>
  );
}
