import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const submitApplication = async (formData) =>{
    const user = auth.currentUser;
    if(!user) throw new Error("No authenticated user!")
    const docRef = await addDoc(collection(db, 'applications'),{
        useruid:user.uid,
        company:formData.company,
        position:formData.position,
        coverLetter:formData.cover,
        date:serverTimestamp(),
        status:"applied"
    })
    return docRef.id
}
export const fetchAllApplications = async (uuid) =>{
     const request = query(collection(db, 'applications'), where("useruid", "==", uuid));
        const response = await getDocs(request)
    
    const userApps = response.docs.map((doc) => ({
        appID:doc.id,
        ...doc.data()
    }))

    return userApps;
}
export const updateApplicationByCompanyAsnwer = async (docID, answer) =>{
    try{
        const docRef = doc(db, 'applications',docID);
        await updateDoc(docRef, {
            response:answer
        })

        return true;
    }catch(error){
        console.log("Error while uploading answer: ", error);

        return false;
    }
   
}
export const updateApplicationByStatus = async (docID, status) =>{
    const docRef = doc(db, 'applications',docID);
    await updateDoc(docRef, {
            status:status
    })

    return true;
}
export const fetchUserProfile = async (uuid) =>{
    const docRef = doc(db,'users', uuid)
    const docResponse = await getDoc(docRef);

    return docResponse;
}
export const registerUser = async (registerFormData) =>{
    const userCredentials = await createUserWithEmailAndPassword(auth, registerFormData.email, registerFormData.password);
    const user = userCredentials.user

    await setDoc(
        doc(db, 'users', user.uid), 
        {
            firstname:registerFormData.firstname, 
            surname:registerFormData.surname, 
            email:registerFormData.email,
            createdAt:serverTimestamp()
        }
    )
   
    return {
        user:user,
        isSuccessfull:true
    };
}
export const loginUser = async (loginFormData) =>{
    let response = await signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password)
    const loggedUser = response.user

    return loggedUser;
  
}
export const signOutUser = async () =>{
    try{
        await signOut(auth)
    }catch(error){
        console.log("Error while singing out: ", error);
        throw error
    }
    
}