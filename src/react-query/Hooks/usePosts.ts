import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQyery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQyery) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: query,
        })
        .then((res) => res.data),
    staleTime: 10_1000, // 10s
  });
};

export default usePosts;
