import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card" >
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className=" badge rounded-pill bg-danger" >{source}
          </span>
        </div>
        <img src={!imageUrl ? "https://images.hindustantimes.com/tech/img/2023/07/21/960x540/Windows-11_1689917138764_1689917138998.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div style={{ backgroundColor: '#efe5ac' }} className="card-body">
          <h5 className="card-title">{title}
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toUTCString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem;
