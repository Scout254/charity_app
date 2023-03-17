import React from 'react'

function FormField({labelName,placeholder,inputType,value,handleChange,isTextArea}) {
  return (
    <label className='flex flex-col'>
        {labelName && (
            <span className="mb-1 font-medium">{labelName}</span>
        )}
        {isTextArea ?(
            <textarea
            required
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className="py-2 px-4 mb-4 border border-gray-400 rounded-lg resize-auto focus:outline-none focus:border-blue-500"
            />
        ):(
        <input
        required
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="py-2 px-4 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
         />
        )}
        
    </label>
  )
}

export default FormField
