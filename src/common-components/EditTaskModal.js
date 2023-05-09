import React, { useState } from 'react'

const EditTaskModal = ({ show, handleClose, handleSubmit, title }) => {

  const [input, setInput] = useState(title)
  const [inputError, setInputError] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value)
    setInputError('')
  }


  const handleEdit = (e) => {
    e.preventDefault()
    if (input == '') return setInputError('Please enter title')
    handleSubmit(input)
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg px-6 py-8 text-left overflow-hidden shadow-xl transform transition-all container">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Edit Text
              </h3>
              <div className="mt-4">
                <input value={input} onChange={(e) => handleChange(e)} type="text" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" style={{ width: '100%' }} />
              </div>
              {inputError && <div className=" text-red-700  rounded relative" role="alert">
                <span className="block sm:inline">{inputError}</span>
              </div>}
            </div>
          </div>
          <div className="mt-6 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button onClick={(e) => handleEdit(e)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Update
            </button>
            <button onClick={handleClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default EditTaskModal
