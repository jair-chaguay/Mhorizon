/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown } from 'lucide-react';
import { useState } from 'react'

export const CustomSelect = ({ label, options, value, onChange }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((opt: any) => opt.value === value);
    
    return (
        <div className="relative w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3.5 cursor-pointer bg-gray-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-medium text-left transition-all flex justify-between items-center"
                >
                    {selectedOption?.label}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`
                    absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top
                    ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                `}>
                    <div className="p-2 flex flex-col gap-1.5">
                        {options.map((opt: any) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full cursor-pointer text-left p-3 rounded-lg text-sm font-medium transition-all
                                    border border-slate-50 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500
                                    ${value === opt.value ? 'bg-orange-50 border-orange-200 text-orange-500' : 'text-blue-200'}
                                `}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    )
}
