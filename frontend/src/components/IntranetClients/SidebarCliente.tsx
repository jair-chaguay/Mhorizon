import React, { useEffect, useState } from 'react';
import { type ViewClienteID } from './type'; 
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface Props {
  activeView: ViewClienteID;
  onViewChange: (id: ViewClienteID, title: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarCliente: React.FC<Props> = ({ activeView, onViewChange, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [razonSocial, setRazonSocial] = useState('Cargando...');

  useEffect(() => {
    const fetchInformacionUsuario = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);

        if (user.cliente_id) {
          try {
            const res = await api.get(`/cliente/${user.cliente_id}`);
            if (res.data && res.data.cliente) {
              setRazonSocial(res.data.cliente.razon_social_nombres);
            }
          } catch (error) {
            console.error("Error al obtener la razón social:", error);
            setRazonSocial('Empresa no encontrada');
          }
        }
      }
    };

    fetchInformacionUsuario();
  }, []);

  const handleLogout = async() => {
    try{
      const token = localStorage.getItem('token');
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }catch(error){
      console.error(error)
    }finally{
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/loginPage');
      setIsOpen(false)
    }
  }
  
  const menuItems = [
    { 
      id: 'dashboard-view', 
      label: 'Panel de Control', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      id: 'biblioteca-view', 
      label: 'Biblioteca Completa', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2zM9 12h6" />
        </svg>
      )
    },
    { 
      id: 'informativos-view', 
      label: 'Informativos', 
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14M9 12a1 1 0 11-2 0 1 1 0 012 0zm5-1a1 1 0 100 2h3a1 1 0 100-2h-3z" />
        </svg>
      )
    },
  ];

  const fullName = `${razonSocial.substring(0,2)}`.toUpperCase();
  const avatarName = encodeURIComponent(fullName || 'User');

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-blue-200 text-white flex flex-col transform transition-transform duration-300 ease-in-out border-r border-white/5 shadow-2xl lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <div className='w-35 ml-4 mt-5'>
            <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2820.91 386.29"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1-2"><path d="M0,1.41H107.09l100,188.1h1.63l99-188.1H415.33V386.29H347.38V77h-1.09L229.41,301H181.57L66.32,77H65.23V386.29H0Z" fill="#fff"/><path d="M468.91,1.41h68.5V156.88H717.35V1.41h68.49V386.29H717.35V215.59H537.41v170.7h-68.5Z" fill="#fff"/><path d="M1270.19,0h133.74a241,241,0,0,1,52.73,5.71,135.73,135.73,0,0,1,45.39,18.75,97.85,97.85,0,0,1,31.8,34.25q12,21.21,12,51.65,0,41.87-23.65,68.22t-64.41,35.61l102.74,170.7H1477.9L1388.7,221.8h-50V384.89h-68.5Zm124.49,165.81a199,199,0,0,0,29.36-2.18,84.46,84.46,0,0,0,26.37-8.15,51.42,51.42,0,0,0,19.29-17.13q7.62-11.13,7.62-28.54,0-15.75-7.07-25.82a53,53,0,0,0-17.94-16,75.15,75.15,0,0,0-24.74-8.15,174.5,174.5,0,0,0-26.91-2.17h-62V165.81Z" fill="#fff"/><path d="M1605.07,0h68.5V384.89h-68.5Z" fill="#fff"/><path d="M1721.77,323.13,1931.06,60H1725V.21h287.58v62l-210.38,262h213.64V385.1h-294.1Z" fill="#fff"/><path d="M2045.45,191.62q0-44,14.74-79.41t40.87-60.27q26.11-24.82,62.08-38.28T2241.51.21q42.94,0,79.15,13.45t62.6,38.28q26.38,24.84,41.13,60.27t14.74,79.41q0,42.94-14.74,78.38a180.65,180.65,0,0,1-41.13,61q-26.39,25.61-62.6,39.83t-79.15,14.23q-42.42,0-78.37-14.23A184.47,184.47,0,0,1,2101.06,331a182.66,182.66,0,0,1-40.87-61Q2045.45,234.57,2045.45,191.62Zm70.87,0q0,29.49,9.06,54.06a125.68,125.68,0,0,0,25.86,42.68,118.5,118.5,0,0,0,39.84,28.19q23,10.09,51,10.09t51.22-10.09a118,118,0,0,0,40.09-28.19,126,126,0,0,0,25.87-42.68q9-24.57,9-54.06a150.23,150.23,0,0,0-9-52.77,128.87,128.87,0,0,0-25.61-42.42A118.69,118.69,0,0,0,2293.76,68Q2270.48,57.65,2242,57.63T2190.56,68A119.34,119.34,0,0,0,2151,96.43a128.68,128.68,0,0,0-25.6,42.42A150,150,0,0,0,2116.32,191.62Z" fill="#fff"/><path d="M2481.69.19h90.78l178.86,288.12h1.08V.19h68.5V385.08h-87L2551.27,87.71h-1.08V385.08h-68.5Z" fill="#fff"/><path d="M911.37,138.64A128.65,128.65,0,0,1,937,96.22a119.23,119.23,0,0,1,39.58-28.45q23-10.35,51.47-10.35t51.74,10.35a118.55,118.55,0,0,1,39.83,28.45,129,129,0,0,1,25.61,42.42,144.48,144.48,0,0,1,8.29,36.77h71.13q-2.24-34.53-14.24-63.41-14.75-35.43-41.13-60.27t-62.59-38.28Q1070.44,0,1027.51,0q-42.43,0-78.38,13.45T887.05,51.73Q860.92,76.57,846.19,112q-12,28.88-14.24,63.41h71.12A143.65,143.65,0,0,1,911.37,138.64Z" fill="#D4681C"/><path d="M1145.2,245.47a126,126,0,0,1-25.87,42.68,118,118,0,0,1-40.09,28.19Q1056,326.44,1028,326.43t-51-10.09a118.5,118.5,0,0,1-39.84-28.19,125.84,125.84,0,0,1-25.86-42.68,146.28,146.28,0,0,1-8.16-36H832.13a194.5,194.5,0,0,0,14.06,60.3,182.43,182.43,0,0,0,40.86,61.05,184.47,184.47,0,0,0,62.08,39.83q36,14.22,78.38,14.23,42.93,0,79.15-14.23a186.75,186.75,0,0,0,62.59-39.83,180.76,180.76,0,0,0,41.13-61.05,194.42,194.42,0,0,0,14-60.3H1153.3A147.2,147.2,0,0,1,1145.2,245.47Z" fill="#fff"/></g></g></svg>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-orange-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
          <p className="px-2 text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-2">Menú Principal</p>
          
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => onViewChange(item.id as ViewClienteID, item.label)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all cursor-pointer duration-200 group ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-orange-500'}`}
              >
                {item.icon(`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'group-hover:text-orange-500'}`)}
                {item.label}
              </button>
            );
          })}

          <p className="px-2 text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-8">Configuración</p>
          
          <button 
            onClick={() => onViewChange('ajustes-view', 'Ajustes de Cuenta')}
            className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 group ${activeView === 'ajustes-view' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-orange-500'}`}
          >
            <svg className={`w-5 h-5 transition-colors ${activeView === 'ajustes-view' ? 'text-white' : 'group-hover:text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ajustes de Cuenta
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-orange-500 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
              <img src={`https://ui-avatars.com/api/?name=${avatarName}&background=D98005&color=fff`} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate" title={razonSocial}>{razonSocial}</p>
              <p className="text-xs text-orange-500 truncate font-medium">Empresa Activa</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarCliente;