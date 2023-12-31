import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import localStorageService from "../../Services/localStorage.service";
import { FaUserTie, FaProductHunt } from "react-icons/fa";
import { isCartEmptySelector } from "../../Redux/Cart/cartReducer";
import { completionOfWord } from "../../utils/completionOfWord";

const NavProfile = ({ isOpen, onClose, user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const items = useSelector((state) => state.cart.productInCart);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const isCartNotEmpty = useSelector(isCartEmptySelector);

  const isAdmin = localStorageService.getIsAdmin();
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-75"
              onClose={onClose}
            />
          </Transition.Child>

          <div className="fixed inset-0 flex items-start justify-end p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`mt-[52px] mr-8  lg:mr-[${
                  !isCartNotEmpty ? `110px` : `75px`
                }] md:mr-32 sm:mr-14 w-48 max-w-md rounded-2xl bg-[#F2F2F2] px-1 py-4  text-left align-middle shadow-xl transition-all`}
              >
                <div
                  className="overflow-y-auto overflow-x-hidden"
                  style={{ maxHeight: "80vh" }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-base text-gray-600 font-medium leading-6 "
                  >
                    <span className="mx-0 flex flex-col text-center items-center space-y-1">
                      <div className="font-bold text-lg">Ваш логин:</div>
                      <div className="pb-2 border-b-2 border-opacity-50 border-[#0f6fd1] text-[#0f6fd1] w-[80%]">
                        {currentUser}
                      </div>
                      {isAdmin && (
                        <span className="border-b-2 py-2 border-[#0f6fd1] border-opacity-50 w-[80%]">
                          <span className="text-[#0f6fd1]">Вы</span> вошли как
                          <span className="flex ">
                            <span className="mr-1.5 font-bold">
                              {" "}
                              администратор
                            </span>
                            <FaUserTie
                              size={25}
                              className=" text-slate-600 opacity-90"
                            />
                          </span>
                        </span>
                      )}

                      {items.length ? (
                        <span className="flex pt-2.5 items-end border-[#0f6fd1]">
                          <span>
                            У <span className="text-[#0f6fd1]">Вас</span> в
                            корзине
                            <span className="inline-flex items-center underline">
                              {completionOfWord(items.length)}
                              <FaProductHunt
                                className="ml-2 opacity-80"
                                size={26}
                                color="#7b68ee"
                              />
                            </span>
                          </span>
                        </span>
                      ) : null}
                      <NavLink to="/logout">
                        <button className="border p-6 w-full py-3 rounded-2xl mb-0.5 mt-4 bg-[#0f6fd1] hover:bg-[#0b5eb3] text-white hover:text-gray-300 transition-all">
                          Выйти
                        </button>
                      </NavLink>
                    </span>
                  </Dialog.Title>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
NavProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default NavProfile;
