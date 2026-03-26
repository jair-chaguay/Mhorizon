import React from 'react'
import { TableUsers } from './TableUsers'
import { TableInformativos } from './TableInformativos'

export const Crud = () => {
  return (
    <div>
        <TableUsers/>

        <div className='mt-4'>
            <TableInformativos/>
        </div>
    </div>
    
  )
}
