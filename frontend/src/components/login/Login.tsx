
export const Login = () => {
    return (
        <section className='bg-blue-200 min-h-screen flex felx-col items-center justify-center'>
            <div className='bg-white p-10 rounded-md w-[400px] h-[380px]'>
                <h2 className='text-blue-200 font-bold text-[2rem] mt-2'>
                    Login
                </h2>
                <form className='flex flex-col gap-6' action="">
                    <input
                        className='border border-gray-400/60 rounded-md py-2 px-3 mt-5'
                        type="text"
                        name='text'
                        placeholder='Username'
                    />
                    <input
                        className='border border-gray-400/60 rounded-md py-2 px-3'
                        type="password"
                        name='text'
                        placeholder='Password'
                    />

                    <button 
                    className=' bg-orange-500 p-2 text-white rounded-md cursor-pointer 
                    hover:bg-orange-400 mt-2'>
                        Log in
                    </button>
                </form>
            </div>
        </section>
    )
}
