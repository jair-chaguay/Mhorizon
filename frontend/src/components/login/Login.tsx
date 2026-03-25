import React from 'react'

export const Login = () => {
  return (
    <section className='bg-blue-200 min-h-screen flex felx-col items-center justify-center'>
        <div className='bg-white p-5 rounded-md'>
            <h2 className='text-blue-200 font-medium text-[1.2rem]'>
                Login
            </h2>
            <form action="">
                <div className='flex'>
                    <input type="text" name='text' placeholder='user@example.com' />
                </div>
            </form>
        </div>
    </section>
  )
}
