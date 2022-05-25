import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Modal, { ModalProps } from './Modal'

export interface AnalyticsTileProps<T> {
  className?: string
  title: string
  children?: React.ReactNode
  infoPopup?: InfoPopupProps
  dropdown?: DropdownProps<T>
}

export type InfoPopupProps = Omit<ModalProps, 'children' | 'openButton'>
export interface DropdownItem<T> {
  label: string
  data: T
}
export interface DropdownProps<T> {
  onChange: (data: T) => any
  items: Array<DropdownItem<T>>
}

const InfoPopup = (prop: InfoPopupProps) => (
  <Modal
    {...prop}
    openButtonChildren={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        className="ring-background rounded-full ring-2"
        fill="currentColor"
      >
        <path d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z"></path>
      </svg>
    }
  />
)

const ChevronDownIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className ?? ''}
  >
    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
  </svg>
)

const Dropdown = <T,>({ onChange, items }: DropdownProps<T>) => {
  const [selected, setSelected] = useState<DropdownItem<T>>(items[0])

  useEffect(() => {
    onChange(selected.data)
  }, [selected])

  return (
    <Menu as="div" className="relative z-10 ml-auto inline-block text-left">
      <div>
        <Menu.Button className="focus-visible:ring-secondary bg-primary font-inter border-secondary inline-flex items-center justify-center gap-x-2 rounded-lg border border-opacity-5 py-1 px-2 text-xs font-medium focus:outline-none focus:ring-offset-1 focus-visible:ring-2">
          {selected.label}
          <ChevronDownIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-50"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
      >
        <Menu.Items className="bg-primary divide-accent ring-secondary shadow-default absolute right-0 mt-3 origin-top-right divide-y divide-opacity-10 rounded-lg text-left ring-1 ring-opacity-5 focus:outline-none">
          {items.map((item, i) => (
            <Menu.Item key={item.label}>
              {({ active }) => (
                <div className="mb-2 flex flex-col items-stretch" key={i}>
                  <button
                    onClick={() => setSelected(item)}
                    className={`${active ? 'bg-opacity-10' : 'bg-opacity-0'} ${
                      selected === item ? 'font-bold' : 'font-medium'
                    } bg-accent font-inter mx-2 mt-2 whitespace-nowrap rounded-lg px-3 py-1 text-left text-sm`}
                  >
                    {item.label}
                  </button>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const LoadingAnalyticsTile = <T,>({ title, children, infoPopup, dropdown, className }: AnalyticsTileProps<T>) => (
  <div
    className={`bg-primary shadow-default col-span-4 flex w-full flex-col items-stretch justify-start rounded-xl p-4 ${className}`}
  >
    <span className="flex animate-pulse flex-row items-center gap-x-3">
      <p className="bg-loading text-secondary font-medium text-opacity-0">{title}</p>
      {infoPopup && <div className="bg-loading h-5 w-5 rounded-full"></div>}
      {dropdown && <Dropdown {...dropdown} />}
    </span>
    {children}
  </div>
)

const AnalyticsTile = <T,>({ title, children, infoPopup, dropdown, className }: AnalyticsTileProps<T>) => (
  <div
    className={`bg-primary shadow-default col-span-4 flex w-full flex-col items-stretch justify-start rounded-xl p-4 ${className}`}
  >
    <span className="flex flex-row items-center gap-x-3">
      <h3 className="font-inter text-secondary text-base font-medium">{title}</h3>
      {infoPopup && <InfoPopup {...infoPopup} />}
      {dropdown && <Dropdown {...dropdown} />}
    </span>
    {children}
  </div>
)

export default {
  Tile: AnalyticsTile,
  Loading: LoadingAnalyticsTile,
}
