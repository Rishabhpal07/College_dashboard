import AnnouncementCard from '@/components/announcement/AnnouncementCard'
import AnnouncementForm from '@/components/announcement/AnnouncementForm'
import AnnouncementList from '@/components/announcement/AnnouncementList'
import React from 'react'

function page() {
  return (
    <div className='p-10'>
      <AnnouncementForm/>
     <AnnouncementList/>
    </div>
  )
}

export default page
