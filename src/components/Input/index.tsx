"use client";
import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    register: UseFormRegister<any>,
    name: string,
    error?: string,
    rules?: RegisterOptions;
}


const Input = ({register, error, rules, name, className, ...props}: InputProps)=>{
    const classes = "w-full border-2 border-gray-200 rounded-md h-11 px-2 " + className;
    return (
        <>
            <input
                className={classes}
                {...props}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
    )            
}


export default Input;
    