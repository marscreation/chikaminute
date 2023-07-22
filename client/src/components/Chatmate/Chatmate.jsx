import { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import person2 from "../../assets/person2.png";
import { formatDate } from '../../util/helper';

function Chatmate({ data, currentUserId }) {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = data.members.find(id => id !== currentUserId)
        
        const getUserData = async () => {
            try {
                const data = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])
    
    return (
        <>
            {userData &&
                (<div className="py-3 text-black rounded-l-xl border-b-2 flex items-center">
                    <div className='flex-none p-3'>
                    <img
                        src={userData?.profilePicture ? import.meta.env.VITE_REACT_PUBLIC_FOLDER + userData.profilePicture : person2}
                        alt="profile photo"
                        className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
                    />
                    </div>
                    <div className='relative flex-1 px-2'>
                        <p className="text-xs absolute right-1.5 top-0 py-1 text-gray-700">{data?.updatedAt ? formatDate(data.updatedAt) : 'time here'}</p>
                        <p className="text-lg font-bold lg:ml-16 lg:-mt-12 pr-20 truncate">{userData?.firstname} {userData?.lastname}</p>
                        <p className="text-sm lg:ml-16 pr-3 truncate">{data?.lastMessage ?? '@'}</p>
                    </div>
                </div>)}
        </>
    )
}

export default Chatmate