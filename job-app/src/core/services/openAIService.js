export const generateNote = async(company, position, candidateName) =>{
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
            }
            ,body:JSON.stringify({
                model:"gpt-4o-mini",
                messages:[
                    {
                        role:"system",
                        content:"You are a HR menager that writes thank you note for job applicants. Always use random name for HR Menager and use HR Menager as title job."
                    },
                    {
                        role:"user",
                        content:`Write a thank you note to a candidate named ${candidateName} who applied for the ${position} at ${company}. Without subject.`
                    }
                ]
            })
        })
        const data = await response.json();
        console.log(data.choices[0].message.content)
        return data.choices[0].message.content;
    }catch(error){
        console.log("Error generating a note: ", error)
    }
} 