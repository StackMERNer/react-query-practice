import React, { useState } from "react";
import usePosts from "./Hooks/usePosts";

const PostList = () => {
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize: 10 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {/* <select onChange={(event) => setUserId(parseInt(event.target.value))}>
        <option value="">Select User</option>
        <option value="1">user 1</option>
        <option value="2">user 2</option>
        <option value="3">user 3</option>
      </select> */}

      <ul className="list-group">
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div className="my-5 d-flex justify-content-center gap-3 ">
        <button
          onClick={() => fetchNextPage()}
          type="button"
          disabled={isFetchingNextPage}
          className="btn btn-primary"
        >
          {isFetchingNextPage ? "Loading..." : "load More"}
        </button>
      </div>
    </>
  );
};

export default PostList;
