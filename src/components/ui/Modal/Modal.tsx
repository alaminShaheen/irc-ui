import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IModalProps, ModalSize } from "@/components/ui/Modal/Modal.d";
import { cn } from "@/utils/helper";
import useDisableBodyScroll from "@/hooks/useDisableBodyScroll";
import Icon from "@/components/ui/Icon";
import modalClose from "@/assets/icons/modal-close.svg";
import Button from "@/components/ui/Button";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const Modal = (props: IModalProps) => {
  const { isOpen, toggle, children, title, subtitle, size } = props;
  useDisableBodyScroll(isOpen);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={cn("relative z-50 modal", {
          "modal-sm": size === ModalSize.SMALL,
          "modal-lg": size === ModalSize.LARGE,
        })}
        onClose={toggle}
      >
        {/* InputWithIcon overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={"div"}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all modal-body z-50">
                <Dialog.Title as="div" className="mb-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl text-primary font-bold">
                        {title}
                      </h3>
                      <Button
                        variant={ButtonVariant.TRANSPARENT}
                        className="p-0"
                        onClick={toggle}
                        icon={<Icon src={modalClose} alt="close" size={45} />}
                      />
                    </div>
                    {subtitle && (
                      <p className="mt-2 text-lg text-graphite-700">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 lg:mt-6 h-1 w-full border-t border-graphite-200" />
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
