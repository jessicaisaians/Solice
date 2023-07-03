"use client";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiChevronUpDown } from "react-icons/hi2";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
interface SelectBoxProps {
  data: any[];
  noAvatar?: boolean;
  label: string;
}

const SelectBox: FC<SelectBoxProps> = ({ data, noAvatar, label }) => {
  const [selected, setSelected] = useState(data[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }: { open: any }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-3 pl-10 text-right text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-stone-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {!noAvatar && (
                  <div
                    style={{
                      background: selected.avatar,
                    }}
                    className="h-5 w-5 flex-shrink-0 rounded-full mr-5"
                  ></div>
                  //   <Image
                  //     height={30}
                  //     width={30}
                  //     src={selected.avatar}
                  //     alt=""
                  //     className="h-5 w-5 flex-shrink-0 rounded-full"
                  //   />
                )}
                <span
                  className={clsx(
                    noAvatar ? "mr-6" : "mr-3",
                    " block truncate"
                  )}
                >
                  {selected.name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center pl-2">
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }: { active: any }) =>
                      classNames(
                        active ? "bg-neutral-400 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pr-3 pl-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }: { selected: any; active: any }) => (
                      <>
                        <div className="flex items-center">
                          {!noAvatar && (
                            // <Image
                            //   height={30}
                            //   width={30}
                            //   src={person.avatar}
                            //   alt=""
                            //   className="h-5 w-5 flex-shrink-0 rounded-full"
                            // />
                            <div
                              style={{
                                background: selected.avatar,
                              }}
                              className="h-5 w-5 flex-shrink-0 rounded-full mr-5"
                            ></div>
                          )}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "mr-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-stone-600",
                              "absolute inset-y-0 left-0 flex items-center pl-4"
                            )}
                          >
                            <AiFillCheckCircle
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
export default SelectBox;
