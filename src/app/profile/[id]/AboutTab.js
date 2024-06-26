import { useParams } from 'next/navigation'
import { getModifiedUsersHook } from '../../../../hooks/getModifiedUserHook'
import Work from '../../../image/suitcase.png'
import Experience from '../../../image/quality.png'
import Programming from '../../../image/coding.png'
import Facebook from '../../../image/facebook.png'
import Linkedin from '../../../image/linkedin-logo.png'
import Github from '../../../image/github.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { updateUserHook } from '../../../../hooks/updateUserHook'

const AboutTab = () => {
  const { id } = useParams()
  const [viewerMode, setViewerMode] = useState(false)
  const [showUserData, setShowUserData] = useState(false)
  const [user, setUser] = useState({})
  const [showInputBox, setShowUserInputBox] = useState(false)
  const { mutateAsync: updateUserBio } = updateUserHook()
  const [userBio, setUserBio] = useState({
    companyName: '',
    mainLanguage: '',
    experience: ''
  })

  useEffect(() => {
    const userData = sessionStorage['user']
    if (userData) {
      setUser(JSON.parse(userData))
    }
    if (user && user._id !== id) {
      setViewerMode(true)
    } else if (user && user._id === id) {
      setViewerMode(false)
    }
  }, [viewerMode])

  const { data: viewerUser, isLoading } = getModifiedUsersHook(id)
  useEffect(() => {
    if (!isLoading) {
      if (viewerUser.user.userBio.experience) {
        setShowUserData(true)
      }
    }
  }, [viewerUser, isLoading])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserBio(prevBio => ({
      ...prevBio,
      [name]: value
    }))
  }

  const updateBio = async () => {
    const Id = user._id
    const updateData = {
      userBio: userBio
    }
    await updateUserBio({ Id, updateData })
  }

  return (
    <>
      <div>
        {viewerMode ? (
          showUserData ? (
            <div className="bg-gray-200 h-80 flex flex-col p-5 mt-14">
              <span className={'ml-2 font-medium text-lg mb-2'}>About</span>
              <div className={'flex items-center'}>
                <span>
                  <Image
                    src={Work}
                    alt={'Work Place'}
                    height={5}
                    width={17}
                  ></Image>
                </span>
                <span className={'ml-2'}>
                  Work at {viewerUser.user.userBio.companyName}
                </span>
              </div>

              <div className={'flex items-center mt-3'}>
                <span>
                  <Image
                    src={Programming}
                    alt={'Language'}
                    height={5}
                    width={20}
                  ></Image>
                </span>
                <span className={'ml-2'}>
                  Expertise in {viewerUser.user.userBio.mainLanguage}
                </span>
              </div>

              <div className={'flex items-center mt-3'}>
                <span>
                  <Image
                    src={Experience}
                    alt={'Language'}
                    height={5}
                    width={20}
                  ></Image>
                </span>
                <span className={'ml-2'}>
                  {viewerUser.user.userBio.experience} year
                  {viewerUser.user.userBio.experience > 1 ? 's' : ''} Experience in
                  Programming
                </span>
              </div>

              <div className={'flex flex-col mt-5'}>
                <span className={'ml-2 font-medium text-lg '}>
                  Social Media
                </span>
                <div className={'flex mt-2'}>
                  <span className={'mr-3 cursor-pointer'}>
                    <Image
                      src={Facebook}
                      alt={'facebook'}
                      height={20}
                      width={25}
                    ></Image>
                  </span>
                  <span className={'mr-3 cursor-pointer'}>
                    <Image
                      src={Linkedin}
                      alt={'linkin'}
                      height={20}
                      width={25}
                    ></Image>
                  </span>
                  <span className={'mr-3 cursor-pointer'}>
                    <Image
                      src={Github}
                      alt={'github'}
                      height={20}
                      width={25}
                    ></Image>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 h-80 flex flex-col justify-center items-center px-20 mt-14">
              <span className="font-bold text-xl">
                User doesn't update Bio yet
              </span>
            </div>
          )
        ) : (
          <>
            {showUserData ? (
              <div className="bg-gray-200 h-80 flex flex-col p-5 mt-14">
                <span className={'ml-2 font-medium text-lg mb-2'}>About</span>
                <div className={'flex items-center'}>
                  <span>
                    <Image
                      src={Work}
                      alt={'Work Place'}
                      height={5}
                      width={17}
                    ></Image>
                  </span>
                  <span className={'ml-2'}>
                    Work at {viewerUser.user.userBio.companyName}
                  </span>
                </div>

                <div className={'flex items-center mt-3'}>
                  <span>
                    <Image
                      src={Programming}
                      alt={'Language'}
                      height={5}
                      width={20}
                    ></Image>
                  </span>
                  <span className={'ml-2'}>
                    Expertise in {viewerUser.user.userBio.mainLanguage}
                  </span>
                </div>

                <div className={'flex items-center mt-3'}>
                  <span>
                    <Image
                      src={Experience}
                      alt={'Language'}
                      height={5}
                      width={20}
                    ></Image>
                  </span>
                  <span className={'ml-2'}>
                    {viewerUser.user.userBio.experience} year
                    {viewerUser.user.userBio.experience > 1 ? 's' : ''} Experience in
                    Programming
                  </span>
                </div>

                <div className={'flex flex-col mt-5'}>
                  <span className={'ml-2 font-medium text-lg '}>
                    Social Media
                  </span>
                  <div className={'flex mt-2'}>
                    <span className={'mr-3 cursor-pointer'}>
                      <Image
                        src={Facebook}
                        alt={'facebook'}
                        height={20}
                        width={25}
                      ></Image>
                    </span>
                    <span className={'mr-3 cursor-pointer'}>
                      <Image
                        src={Linkedin}
                        alt={'linkin'}
                        height={20}
                        width={25}
                      ></Image>
                    </span>
                    <span className={'mr-3 cursor-pointer'}>
                      <Image
                        src={Github}
                        alt={'github'}
                        height={20}
                        width={25}
                      ></Image>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {
                  showInputBox ?
                    <div className="bg-gray-200 h-80 flex flex-col justify-center items-center px-20 mt-14">

                      <div className={'grid grid-cols-2 mb-5'}>
                        <span>Company Name</span>
                        <input type="text" className={'py-1 border border-black px-3'} name="companyName"
                               onChange={handleChange}/>
                      </div>
                      <div className={'grid grid-cols-2 mb-5'}>
                        <span>Main language</span>
                        <input type={'text'} className={'py-1 border border-black px-3'} name="mainLanguage"
                               onChange={handleChange}/>
                      </div>
                      <div className={'grid grid-cols-2 mb-10'}>
                        <span>Experience</span>
                        <input type={'text'} className={'py-1 border border-black px-3'} name="experience"
                               onChange={handleChange}/>
                      </div>
                      <button className={'px-5 py-1 bg-blue-500 text-white rounded-lg'} onClick={updateBio}>Update
                      </button>
                    </div>
                    :
                    <div className="bg-gray-200 h-80 flex flex-col justify-center items-center px-5 sm:px-20 mt-14">
                          <span className="font-bold text-xl">
                            Tell the world about yourself
                          </span>
                          <span className="sm:px-28 sm:text-center my-5">
                              Here’s where you can share more about yourself: your history,
                              work experience, accomplishments, interests, dreams, and more.
                              You can even add images and use rich text to personalize your
                              bio.
                          </span>
                          <button className="border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white"
                                  onClick={() => setShowUserInputBox(true)}>
                            Get Started
                          </button>
                    </div>
                }
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default AboutTab
