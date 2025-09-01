import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'

const CategoryPage = () => {
    const [openUploadCatgory, setOpenUplaoadCategory] = useState(false)

  return (
    <section >
        <div className='p-2 bg-white shadow-md flex justify-between items-center '>
            <h2 className='font-bold'>Category</h2>
            <button onClick={() => setOpenUplaoadCategory(true)}className='text-sm border border-gray-400 px-2 py-1 rounded-3xl mt-1 cursor-pointer hover:text-white hover:bg-amber-400'>Add Category</button>
        </div>

        {openUploadCatgory && ( <UploadCategoryModel close={()=>setOpenUplaoadCategory(false) }/>)}

       
    </section>
  )
}

export default CategoryPage
