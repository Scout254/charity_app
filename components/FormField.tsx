import React from 'react'

function FormField({labelName,placeholder,inputType,value,handleChange,isTextArea}) {
  return (
    <label className='flex flex-col'>
        {labelName && (
            <span>{labelName}</span>
        )}
        {isTextArea ?(
            <textarea
            required
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className="py-6 outline-none border border-black"
            />
        ):(
        <input
        required
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className=" py-6 outline-none border border-black"
         />
        )}
        
    </label>
  )
}

export default FormField