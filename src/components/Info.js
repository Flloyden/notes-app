import React from 'react'

function Info() {
  return (
    <div className='max-w-7xl px-10 mx-auto pb-20'>
        <ul className='flex flex-wrap gap-10 justify-center'>
            <li className='flex flex-col gap-2 max-w-80'>
                <h2 className='text-2xl font-bold'>Effortless Note-Taking</h2>
                <p className='text-sm'>Quickly jot down thoughts, ideas, and to-do lists with a simple tap. NoteHub makes it easy to capture inspiration on the go.</p>
            </li>
            <li className='flex flex-col gap-2 max-w-80'>
                <h2 className='text-2xl font-bold'>Organized Workspace</h2>
                <p className='text-sm'>Keep your notes organized with customizable folders and tags. Sort your information in a way that makes sense to you, making retrieval a breeze.</p>
            </li>
            <li className='flex flex-col gap-2 max-w-80'>
                <h2 className='text-2xl font-bold'>Sync Across Devices</h2>
                <p className='text-sm'>Seamless synchronization ensures your notes are accessible from your smartphone, tablet, or computer. Your ideas are always at your fingertips, no matter where you are.</p>
            </li>
            <li className='flex flex-col gap-2 max-w-80'>
                <h2 className='text-2xl font-bold'>Secure and Private</h2>
                <p className='text-sm'>Your data is your own. NoteHub prioritizes security, offering password protection and encryption to keep your sensitive information safe.</p>
            </li>
            <li className='flex flex-col gap-2 max-w-80'>
                <h2 className='text-2xl font-bold'>Search Functionality</h2>
                <p className='text-sm'>Find what you need in seconds with a powerful search feature. No more digging through pages of notes - get straight to the point.</p>
            </li>
        </ul>
    </div>
  )
}

export default Info