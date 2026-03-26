import { useState } from "react";
import api from "../../api/axios"

export const Login = () => {

    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        try {
            const { data } = await api.post("/login", {nick, password});
            console.log("Respuesta: ", data);

        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Error al Iniciar Sesión"
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='bg-blue-200 min-h-screen flex flex-col items-center justify-center'>
            <div className='bg-white p-10 rounded-md w-[400px] h-[380px]'>
                <h2 className='text-blue-200 font-bold text-[2rem] mt-2'>
                    Login
                </h2>

                {
                    errorMsg && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                            {errorMsg};
                        </p>
                    )
                }

                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <input
                        className='border border-gray-400/60 rounded-md py-2 px-3 mt-5'
                        type="text"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        name='nick'
                        placeholder='Username'
                    />
                    <input
                        className='border border-gray-400/60 rounded-md py-2 px-3'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        placeholder='Password'
                    />

                    <button type="submit" disabled={loading}
                        className=' bg-orange-500 p-2 text-white rounded-md cursor-pointer 
                    hover:bg-orange-400 mt-2'>
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </section>
    )
}
