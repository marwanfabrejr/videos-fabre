import React, { Fragment } from 'react'
import axios from 'axios'
import Head from 'next/head'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
import { Video } from '../types'
import { BASE_URL } from '../utils'

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <Fragment>
      <Head>
        <title>Fabre | Real Videos, Real People.</title>
        <meta name='description' content='Real Videos, Real People.' />
        <link rel='icon' href='/logo-color.ico' />
      </Head>
      <div className='flex flex-col gap-10 videos h-full'>
        {videos.length ? (
          videos?.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResults text={`No Videos`} />
        )}
      </div>
    </Fragment>
  )
}

export default Home

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string }
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`)

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }

  return {
    props: { videos: response.data },
  }
}
