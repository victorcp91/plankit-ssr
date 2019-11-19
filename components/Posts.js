import React from 'react';
import moment from 'moment';
import { Link } from 'next/link';
import Theme from '../libs/Theme';


const posts = props => {
  let orderedPosts = props.posts;
  if(props.order){
    orderedPosts = orderedPosts.sort((a,b) => moment(b.createdAt).format('YYYYMMDD') - moment(a.createdAt).format('YYYYMMDD'));
  }

  return(
    <>
    <div className="postsContainer">
      {orderedPosts.map(post => 
        (<div key={`${post.slug}-${post.id}`} className="postLink" to={`/${post.channelSlug}/${post.slug}`}>
          <div className="postCard">
            <div className="imageContainer">
              <img className="image" src={post.image}/>
            </div>
            <div className="info">
              <h2 className="title" key={post.id}>{post.title}</h2>
              <p className="description">{post.description}</p>
              <p className="created">{moment(post.createdAt).format('DD/MM/YY')}</p>
            </div>
          </div>
        </div>
        ))
      }
    </div>
    <style jsx>{`
    .postsContainer {
      margin: 0 20px;
      display: flex;
      flex-wrap: wrap;
    }
    @media only screen and (min-width: 1024px) {
      .postsContainer {
        margin: 0;
      }
    }
    .postsContainer .postLink {
      width: 100%;
      text-decoration: none;
      color: ${Theme.black};
    }
    @media only screen and (min-width: 420px) {
      .postsContainer .postLink {
        width: 47.5%;
      }
      .postsContainer .postLink:nth-child(2n) {
        margin: 0 0 0% 5%;
      }
    }
    @media only screen and (min-width: 585px) {
      .postsContainer .postLink {
        width: 30%;
      }
      .postsContainer .postLink:nth-child(2n) {
        margin: 0;
      }
      .postsContainer .postLink:nth-child(3n + 2) {
        margin: 0 5%;
      }
    }
    .postsContainer .postLink .postCard {
      display: flex;
      flex-direction: column;
      height: fit-content;
      margin-bottom: 20px;
      word-wrap: break-word;
      background-color: ${Theme.lightGray};
    }
    .postsContainer .postLink .postCard .imageContainer {
      width: 100%;
      padding-top: 56%;
      position: relative;
    }
    .postsContainer .postLink .postCard .imageContainer .image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      object-fit: cover;
    }
    .postsContainer .postLink .postCard .info {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 5px 15px 10px 15px;
    }
    .postsContainer .postLink .postCard .info .title {
      font-weight: bold;
      font-size: 14px;
      margin: 5px 0 5px 0;
      width: 100%;
    }
    .postsContainer .postLink .postCard .info .description {
      font-family: 'Helvetica Light';
      font-size: 12px;
      margin-bottom: 10px;
    }
    .postsContainer .postLink .postCard .info .created {
      width: 100%;
      font-family: 'Helvetica Light';
      font-size: 12px;
      text-align: right;
    }
    
    `}</style>
    </>
  );
};

export default posts;