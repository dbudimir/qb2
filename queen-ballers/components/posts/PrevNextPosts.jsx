"use client";

import { useEffect, useState } from "react";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import { cleanPosts } from "../../utils/cleanText";
import { getReturn, getPost } from "../../utils/getReturn";
import buildQuery from "../../utils/buildQuery";

const PrevNextPostsContainer = styled.div`
  max-width: 720px;
  width: 96%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 32px;

  a {
    width: 50%;
    color: #393939;
    text-decoration: none;

    &:nth-of-type(2) {
      text-align: right;

      span {
        text-align: right;
        text-transform: unset;
      }
    }

    span {
      display: block;
      font-weight: 900;
      text-align: left;

      &:first-of-type {
        text-transform: uppercase;
        padding: 0 2px;
      }
    }
  }

  .image-container.prev-next {
    width: 100%;
    height: 240px;
    margin: 12px auto;
    /* overflow: hidden !important; */

    img {
      max-width: 100%;
      object-fit: cover;
      transition: all 0.5s ease;
      box-shadow: unset;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  span {
    padding: 0 12px;
  }

  a:first-of-type {
    z-index: 1;
  }
`;

const PrevNextPosts = ({ currentPostDate }) => {
  const [nextPrev, setNextPrev] = useState([]);
  // const [pagePath, setPagePath] = useState(null);

  const generateItems = async (currentPostDate) => {
    console.log("do generateItems");

    const postDate = dayjs(currentPostDate);

    const getPostBeforeQuery = buildQuery({
      objectType: "posts",
      fields: [
        "link",
        "title",
        "date",
        "excerpt",
        "jetpack_featured_media_url",
      ],
      perPage: 3,
      before: postDate.toISOString(),
      orderby: "date",
      order: "desc",
    });

    const getPostAfterQuery = buildQuery({
      objectType: "posts",
      fields: [
        "link",
        "title",
        "date",
        "excerpt",
        "jetpack_featured_media_url",
      ],
      perPage: 3,
      after: postDate.toISOString(),
      orderby: "date",
      order: "asc",
    });

    const before = await getReturn(getPostBeforeQuery);
    const after = await getReturn(getPostAfterQuery);
    const pagePath = window.location.pathname;

    const filteredBefore = before.filter(
      ({ link, date }) =>
        !link.includes(pagePath) && date < postDate.toISOString()
    );

    const filteredAfter = after.filter(
      ({ link, date }) =>
        !link.includes(pagePath) && date > postDate.toISOString()
    );

    let posts = [];

    filteredBefore[0] && posts.push(filteredBefore[0]);
    filteredAfter[0] && posts.push(filteredAfter[0]);

    const cleanedPosts = await cleanPosts(posts);

    setNextPrev(cleanedPosts);
  };

  useEffect(() => {
    window && !nextPrev.length && generateItems(currentPostDate);
  });

  return (
    <PrevNextPostsContainer className="next-prev-post">
      {nextPrev.map((postItem, i) => {
        return (
          postItem && (
            <Link href={postItem?.link} key={`nexPrev${i}`}>
              <span>{`${i === 0 ? "Previous" : "Next"} Post`}</span>
              <div className="image-container prev-next">
                <Image
                  src={postItem.image}
                  alt={postItem.title}
                  height={240}
                  width={360}
                />
              </div>
              <span>{postItem?.title}</span>
            </Link>
          )
        );
      })}
    </PrevNextPostsContainer>
  );
};

export default PrevNextPosts;
