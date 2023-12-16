"use client";

// Utils
import qbParser from "/utils/qbParser";
import styled from "styled-components";

// Components
import Popular from "/components/postgrid/Popular";

// Styles
import PostContentContainer from "/components/style/postContent";

const PostContent = ({ content }) => {
  // TODO: See if we can do this on the server side
  const generateBody = () => {
    //
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const blogContent = doc.querySelector("body");
    //
    const contentArray = Array.prototype.slice.call(blogContent.childNodes);
    const parsedContentArray = qbParser(contentArray, true);
    parsedContentArray.splice(10, 0, <Popular />);

    return parsedContentArray;
  };

  return <PostContentContainer className="content">{generateBody()}</PostContentContainer>;
};

export default PostContent;
