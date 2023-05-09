import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useWallet } from '../common-components/UseWallet';
import { createNewTask } from '../apiStore';
import { isEmpty } from '../configs/constants/functions';
const CreateForm = () => {
    const { address } = useWallet();

    const [input, setInput] = useState('')
    const [inputError, setInputError] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
        setInputError('')
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input == '') return setInputError('Please enter title')

        const apiRes = await createNewTask({title: input})
        setInput('')
        // After creating the tasks store the transation hash in local storage
        let alltransationHash = localStorage.getItem('transactions')
        if (!isEmpty(alltransationHash)) {
            alltransationHash = JSON.parse(alltransationHash)
            let transationHash = [...alltransationHash.transationHash, apiRes.hash]
            localStorage.setItem('transactions', JSON.stringify({transationHash}))
        } else {
            localStorage.setItem('transactions', JSON.stringify({transationHash:[apiRes.hash]}))
        }


    }

    return (
        <React.Fragment>
            <div className='container mx-auto'>
                <h4 className='text-2xl mb-4 font-bold flex flex-row justify-between'>
                    <span> Create Your Note </span>
                    <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="text-lg font-medium text-gray-900">
                            {address ? address.substring(0, 6) + "..." + address.substring(38, 42) : "Not Connected"}
                        </div>
                    </div>
                </h4>


                <form className="bg-white">
                    <div className="flex">
                        <span className='w-full '>
                            <input value={input} onChange={(e) => handleChange(e)} type="text" className=" w-full px-4 py-2 border border-gray-400 rounded-md" />
                            {inputError && <div className=" text-red-700  rounded relative" role="alert">
                                <span className="block sm:inline">{inputError}</span>
                            </div>}
                        </span>
                        <button onClick={handleSubmit} type='submit' className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md mx-2 h-11"><AiOutlinePlus /></button>


                    </div>

                </form>
            </div>
        </React.Fragment>
    )
}

export default CreateForm
