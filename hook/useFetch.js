import { useState, useEffect } from "react";
import axios from "axios";
import { EXPO_PUBLIC_RAPID_API_KEY } from "@env";

const rapidApiKey = EXPO_PUBLIC_RAPID_API_KEY
//const rapidApiKey = "7553871892msh11df8193501f1c1p1e053djsnfc5ffff35f4b";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
        params: { ...query },
      };

      const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert("There is an error");
            console.log("error: ", error);
        } finally {
            setIsLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

      const refetch = () => {
        setIsLoading(true);
        fetchData();
      }

      return { data, isLoading, error, refetch };
}

export default useFetch;