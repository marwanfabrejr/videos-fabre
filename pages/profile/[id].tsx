import React, { useEffect, useState, Fragment } from 'react'
import Image from 'next/legacy/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import Head from 'next/head'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

interface IProps {
  data: {
    user: IUser
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([])
  const { user, userVideos, userLikedVideos } = data

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userVideos, userLikedVideos])

  return (
    <Fragment>
      <Head>
        <title>{user.userName}</title>
        <link rel='icon' href='/logo-color.ico' />
      </Head>
      <div className='w-full'>
        <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
          <div className='w-16 h-16 md:w-32 md:h-32'>
            <Image
              width={120}
              height={120}
              layout='responsive'
              className='rounded-full'
              src={user.image}
              alt='user-profile'
            />
          </div>

          <div>
            <div className='text-md md:text-2xl font-bold  flex gap-2 items-center justify-center lowercase'>
              <span>{user.userName.replace(/\s+/g, '')} </span>
              <GoVerified className='text-blue-400 md:text-xl text-md' />
            </div>
            <p className='text-sm font-medium'> {user.userName}</p>
          </div>
        </div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'liked'} videos yet.`}
            />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: {
      data: res.data,
    },
  }
}

export default Profile
