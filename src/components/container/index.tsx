import { ReactNode } from "react";

const Container = ( { children }: { children: ReactNode } )=>{
    
    return (

        <div className="w-full p-2 max-w-7xl mx-auto">
            {children}    
        </div>

    )            
}


export default Container;
    