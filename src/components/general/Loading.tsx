interface LoadingProps {
  width?: number
  height?: number
  fill?: string
}

export function Loading(props: LoadingProps) {
  return (
    <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width={props.width ?? 40}
      height={props.height ?? 18}
      viewBox="0 0 100 100">
      <circle fill={props.fill ?? '#F8FAFC'} stroke="none" cx="25" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"/>    
      </circle>
      <circle fill={props.fill ?? '#F8FAFC'} stroke="none" cx="50" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite" 
          begin="0.2"/>       
      </circle>
      <circle fill={props.fill ?? '#F8FAFC'} stroke="none" cx="75" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite" 
          begin="0.3"/>     
      </circle>
    </svg>
  );
}

export function LoadingWrapper(props: { loading: boolean, children: any }) {
  if (props.loading) {
    return <Loading />
  }

  return props.children;
}
