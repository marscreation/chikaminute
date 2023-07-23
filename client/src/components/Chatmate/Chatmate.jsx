import { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import person2 from "../../assets/person2.png";
import { formatDate } from '../../util/helper';
import { useChatContext } from '../../context/ChatContext';

function Chatmate({ data, currentUserId }) {
    const [userData, setUserData] = useState(null)
    const { setChatId, setChatmateInfo } = useChatContext()

    const getConversation = info => {
        setChatId(data._id)
        setChatmateInfo(info)
    }

    useEffect(() => {
        const userId = data.members.find(id => id !== currentUserId)

        const getUserData = async () => {
            try {
                const data = await getUser(userId)
                setUserData(data)
                setChatmateInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])

    return (
        <>
            {userData &&
                (<div className="text-black border-b-2 flex items-center" onClick={() => getConversation(userData)}>
                    <div className='flex-none p-3'>
                        <img
                            src={userData?.profilePicture ? import.meta.env.VITE_REACT_PUBLIC_FOLDER + userData.profilePicture : person2}
                            alt="profile photo"
                            className="border-2 border-white rounded-3xl h-10 w-10 lg:h-12 lg:w-12"
                        />
                    </div>
                    <div className='relative flex-1 px-2'>
                        <p className="text-xs absolute right-3 top-0 py-1 text-gray-700">{data?.updatedAt ? formatDate(data.updatedAt) : 'time here'}</p>
                        <p className="text-lg font-bold pr-20 truncate">{userData?.firstname} {userData?.lastname}</p>
                        <p className="text-sm pr-3 truncate">{data?.lastMessage ?? '@'}</p>
                    </div>
                </div>)}
        </>
    )
}

export default Chatmate