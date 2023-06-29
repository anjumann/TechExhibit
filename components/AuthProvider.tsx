'use client'
import {useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(()=>{
    const fetchProviders = async () =>{
      const res = await getProviders()
      // console.log(res);
      setProviders(res)
      
    }
    fetchProviders()
  },[]);

  if (providers){
    return (
      <div>
        {Object.values(providers).map((provider: Provider,i) => (
          <button key={i} className="capitalize border-2 px-3 py-1.5 rounded-lg" onClick={()=>signIn(provider?.id)}   > {provider.id} </button>
        ))}
      </div>
    )
  }


  return <div>AuthProvider</div>;
};

export default AuthProvider;
