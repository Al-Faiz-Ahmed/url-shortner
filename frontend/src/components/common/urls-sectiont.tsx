import {
  GET_USER_QUERY,
  type GetUserResponse,
  type GetUserVariables,
} from "@/graphql/queries/get-user";
import { useUser } from "@/hooks";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect } from "react";

const GeneratedUrlSection = () => {
  const { user, setUser} = useUser();
  const [fetchUser, { loading}] = useLazyQuery<
    GetUserResponse,
    GetUserVariables
  >(GET_USER_QUERY);

  // const [createShortUrl, { loading }] = useMutation<
  //   CreateShortUrlResponse,
  //   CreateShortUrlVariables
  // >(CREATE_SHORT_URL_MUTATION);

  useEffect(()=>{
    
    (async ()=>{
      if (!user) {

        const result = await fetchUser();

        if(result.error){
          console.log({...result.error}, "Error From Fetched User")
          return
        }
        if(result.data){
          setUser(result.data.getUser)
          console.log({user},"User fetched Successfully")
        }
      }
    })();
  },[])

  return (
    <section className="pt-4">
      <p className="text-md md:text-lg leading-relaxed text-muted-foreground/80 w-fit mx-auto">
        Create your first <span className="text-primary">Tini Tiny </span>
        URL from here <br /> and share with 8,300,000,000 billion people <br />{" "}
        around the globe.
      </p>
      {
        loading && "User is fetching its data"
      }
    </section>
  );
};

export default GeneratedUrlSection;
