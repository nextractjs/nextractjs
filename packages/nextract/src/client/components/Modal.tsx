import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export interface ModalProps {
  children?: React.ReactNode
  title: string
  description?: string
  closeText: string
  alignClose?: 'left' | 'center' | 'right'
  openButtonChildren?: React.ReactNode
}

const Modal = ({ children, title, description, closeText, alignClose = 'left', openButtonChildren }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button onClick={openModal}>{openButtonChildren}</button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-0"
            leaveTo="opacity-0"
          >
            <div className="bg-secondary fixed inset-0 bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-0"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="bg-primary w-full max-w-md transform overflow-hidden rounded-xl p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-secondary text-lg font-medium leading-6">
                    {title}
                  </Dialog.Title>
                  {description && (
                    <div className="mt-2">
                      <p className="text-secondary text-sm">{description}</p>
                    </div>
                  )}

                  {children}

                  <div className={`mt-4 flex w-full flex-row justify-${alignClose}`}>
                    <button
                      type="button"
                      className="bg-accent text-primary focus-visible:ring-accent inline-flex justify-center rounded-xl px-4 py-2 text-sm font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {closeText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
