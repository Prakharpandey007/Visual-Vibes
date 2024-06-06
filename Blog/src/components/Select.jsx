import React,{useId} from 'react'
//syntax-2 of writing the forward ref (see in last export)
function Select({
    options,
    label,
    className="",
    ...props
},ref) {
    const Id=useId();

  return (
    <div className='w-full '>
        {label && <label
        htmlFor={Id} className=''
        >
            </label>}
            <select
            {...props}
            id={Id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                //agr options mai value hai toh loop karege othewrwise ni karege 
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
    </div>
  )
}

export default React.forwardRef( Select)