import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import ConfirmationModal from "../common-components/ConfirmationBox"
import { deteteTask, getAllTasks, updateTask } from '../apiStore';
import { useWallet } from '../common-components/UseWallet';
import EditTaskModal from '../common-components/EditTaskModal';
const Listing = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteTaskInfo, setDeleteTaskInfo] = useState({})

    const [showEditModal, setShowEditModal] = useState(false)
    const [editTaskInfo, setEditTaskInfo] = useState({})
    const { address, isConnected } = useWallet();
    const [allTasks, setAllTasks] = useState([])


    const handleDeleteItem = (row) => {
        setShowDeleteModal(true)
        setDeleteTaskInfo(row)
    }

    const handleEditItem = (row) => {
        setShowEditModal(true)
        setEditTaskInfo(row)
    }

    useEffect(() => {
        if (!address) return
        async function fetchData() {
            const apiRes = await getAllTasks(address)
            setAllTasks(apiRes)
        }
        fetchData()
    }, [isConnected])


    const handleTaskDelete = async () => {
        let taskID = deleteTaskInfo.id
        taskID = parseInt(taskID)
        const apiRes = await deteteTask({ taskID })
        setDeleteTaskInfo({})
        setShowDeleteModal(false)
    }

    const handleTaskUpdate = async (content) => {
        let taskID = editTaskInfo.id
        taskID = parseInt(taskID)
        const apiRes = await updateTask({ taskID, title: content })
        setShowEditModal(false)
        setEditTaskInfo({})
    }



    return (
        <React.Fragment>
            <div className='container mx-auto'>
                <table className="table table-auto mx-auto mt-16">
                    <thead>
                        <tr className="bg-blue-500">
                            <th className="w-4/5 text-left py-3 px-4 uppercase font-semibold text-white border border-blue-500">Text</th>
                            <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-white border border-blue-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTasks.map((item, index) => {
                            return (
                                <tr className='' key={index}>
                                    <td className="border border-blue-500 px-4 py-2">{item.content}</td>
                                    <td className="px-4 py-2 text-center border border-blue-500">
                                        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md mr-2" onClick={() => handleEditItem(item)}><MdEdit /></button>
                                        <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md" onClick={() => handleDeleteItem(item)}><MdDelete /></button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            {showDeleteModal && <ConfirmationModal handleClose={() => setShowDeleteModal(false)} show={showDeleteModal} handleSubmit={handleTaskDelete} />}
            {showEditModal && <EditTaskModal handleClose={() => setShowEditModal(false)} show={showDeleteModal} title={editTaskInfo.content} handleSubmit={handleTaskUpdate} />}
        </React.Fragment>

    )
}

export default Listing
