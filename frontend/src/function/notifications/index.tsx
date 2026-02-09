import type {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react';
import { toast, type ToastContentProps } from 'react-toastify';

interface Props {
  content:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | ((props: ToastContentProps<unknown>) => ReactNode)
    | null
    | undefined;
  options?: any;
}
export function toastSuccess(props: Props) {
  const { content, options } = props;
  const settings = {
    ...options,
  };
  return toast.success(content, settings);
}

export function toastWarning(props: Props) {
  const { content, options } = props;
  const settings = {
    ...options,
  };
  return toast.warning(content, settings);
}

export function toastInfo(props: Props) {
  const { content, options } = props;
  const settings = {
    ...options,
  };
  return toast.info(content, settings);
}

export function toastError(props: Props) {
  const { content, options } = props;
  const settings = {
    ...options,
  };
  return toast.error(content, settings);
}
