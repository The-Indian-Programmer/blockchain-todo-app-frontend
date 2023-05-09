import React from 'react'

const ConfirmationBox = ({ show, handleClose, handleSubmit }) => {
    return (
        <div>
            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-3xl border-2 border-blue-500 rounded-md">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-gray-600 text-lg leading-relaxed">
                                Are you sure, you want to delete this item ?
                            </p>
                        </div>
                        <div className="flex items-center justify-end p-3 rounded-b">
                            <button
                                className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => handleClose()}
                            >
                                Close
                            </button>
                            <button
                                className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => handleSubmit()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationBox
