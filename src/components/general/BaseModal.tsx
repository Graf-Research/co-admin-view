import { Fragment, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export interface ModalAction {
  open(): void
  close(): void
  isOpen(): boolean
}
 
export interface BaseModalProps {
  children?: any
  onDismiss?(): void
  preventDismiss?: boolean
}
 
export const BaseModal = forwardRef<ModalAction, BaseModalProps>((props: BaseModalProps, ref) => {
  const [show, setShow] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      setShow(true);
    },
    close() {
      setShow(false);
    },
    isOpen() {
      return show;
    },
  }));
 
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-100"
        style={{ zIndex: 9999 }}
        initialFocus={cancelButtonRef}
        onClose={(_: boolean) => {
          !props.preventDismiss && setShow(_);
          props.onDismiss && props.onDismiss();
        }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-[#000] bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 min-w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="w-full md:!w-auto relative transform overflow-hidden rounded-[8px] bg-transparent text-left shadow-xl transition-all sm:my-8 bg-zinc-950">
                { props.children }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});
