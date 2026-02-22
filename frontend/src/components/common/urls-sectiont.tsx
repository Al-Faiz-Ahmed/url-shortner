import {
  GET_USER_QUERY,
  type GetUserResponse,
  type GetUserVariables,
} from "@/graphql/queries/get-user";
import { useUser } from "@/hooks";
import { useLazyQuery } from "@apollo/client/react";
import { Delete, DeleteIcon, Trash, Trash2 } from "lucide-react";

import { useEffect } from "react";
import { Button } from "../ui/button";

const GeneratedUrlSection = () => {
  const [fetchUser] = useLazyQuery<GetUserResponse, GetUserVariables>(
    GET_USER_QUERY,
  );
  
  const { user, setUser } = useUser();

  // const [createShortUrl, { loading }] = useMutation<
  //   CreateShortUrlResponse,
  //   CreateShortUrlVariables
  // >(CREATE_SHORT_URL_MUTATION);

  useEffect(() => {
    (async () => {
      if (!user) {
        const result = await fetchUser();

        if (result.error) {
          console.log({ ...result.error }, "Error From Fetched User");
          return;
        }

        if (result.data) {
          setUser(result.data.getUser);
          console.log({ user }, "User fetched Successfully");
        }
      } else {
        console.log(user, "From useEffect");
      }
    })();
  }, []);

  return (
    <section className="pt-24">
      {!user ? (
        <p className="text-md md:text-lg leading-relaxed text-muted-foreground/80 w-fit mx-auto text-center">
          Create your first <span className="text-primary">Tini Tiny </span>
          URL from here <br /> and share with 8,300,000,000 billion people{" "}
          <br /> around the globe.
        </p>
      ) : 
      <div>
        <div>

        <h2 className="text-2xl">Your <span className="text-primary">Tiny Tiny</span> URLs</h2>
        <Button><Trash2 /> Delete All</Button>
        </div>

      </div>
      
      }
    </section>
  );
};

export default GeneratedUrlSection;
