import { createContext, useContext, useState } from "react";

const ApplicationsContext = createContext();
export const useApplications = () => useContext(ApplicationsContext);

export const ApplicationProvider = ({children}) =>{
    const [applications,setApplications] = useState([]);
    const addApplication = (newApplicaiton) =>{
        setApplications((prev) => {
            const updated =[...prev, newApplicaiton]
            updated.sort((a,b)=> b.date - a.date)
            return updated;
        })

    }
    const setAllApplications = (apps) =>{
        setApplications(apps)
    }
    return <ApplicationsContext.Provider value={{ applications, addApplication, setAllApplications }}>
            {children}
        </ApplicationsContext.Provider>
}