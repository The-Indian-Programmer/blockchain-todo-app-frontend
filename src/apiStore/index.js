import { ethers } from 'ethers';
import MyContract from '../configs/constants/abi.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contractAddress = '0xd89841C35f76D37B63c35C074340B1328056C9cA'; // replace with your contract address
const contractABI = MyContract.abi;

const contract = new ethers.Contract(contractAddress, contractABI, signer);

export async function getAllTasks(address) {
  const result = await contract.getTasksByOwner(address);
  return result
}

export async function createNewTask(bodyData) {
  const result = await contract.createTask(bodyData.title);
  return result
}
export async function validationTransactionHash(hash) {
  const tx = await provider.getTransaction(hash);
  return tx
}

export async function deteteTask(bodyData) {
  const result = await contract.deleteTask(bodyData.taskID);
  return result
}

export async function updateTask(bodyData) {
  const result = await contract.updateTask(bodyData.taskID, bodyData.title);
  return result
}