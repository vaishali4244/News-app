import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizedTitle = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1, string.length);
    }

    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizedTitle(props.category)} - NoW `;
        updateNews();
        //eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    return (
        <>
            <h1 className='text-center' style={{ marginBottom: "20px", marginTop: "80px" }}>News of World - {capitalizedTitle(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">

                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description.slice(0, 150).concat("...") : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url}
                                    author={element.author ? element.author : "Anonymous"}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;



// export class News extends Component {
    // static defaultProps = {
    //     country: 'in',
    //     pageSize: 6,
    //     category: "general"
    // }
    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }

//     capitalizedTitle = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1, string.length);
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//             totalResults: 0
//         }
//         document.title = `${props.capitalizedTitle(this.category)} - NoW `;
//         //to capitalize title categories in title bar.
//     }

//     async updateNews() {
//         this.setProgress(0);
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.state.page}&pageSize=${props.pageSize}`;
//         this.setState({ loading: true });
//         let data = await fetch(url);
//         this.setProgress(30);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({
//             articles: parsedData.articles,
//             totalResults: parsedData.totalResults,
//             loading: false
//         })
//         this.setProgress(100);
//     }

//     async componentDidMount() {
//         // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e687a6d9ae6a4d6e806474f259481813&page=1&pageSize=${props.pageSize}`;
//         // this.setState({ loading: true });
//         // let data = await fetch(url);
//         // let parsedData = await data.json()
//         // console.log(parsedData);
//         // this.setState({
//         //     articles: parsedData.articles,
//         //     totalResults: parsedData.totalResults,
//         //     loading: false
//         // })
//         this.updateNews();
//     }

//     // handlePreviousClick = async () => {
//     //     console.log("pre")
//     //     this.setState({ page: this.state.page - 1 })
//     //     this.updateNews();
//     // }

//     // handleNextClick = async () => {
//     //     console.log("next");
//     //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize))) {

//     //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e687a6d9ae6a4d6e806474f259481813&page=${props.state.page + 1}&pageSize=${props.pageSize}`;
//     //         this.setState({ loading: true });
//     //         let data = await fetch(url);
//     //         let parsedData = await data.json();
//     //         this.setState({
//     //             page: this.state.page + 1,
//     //             articles: parsedData.articles,
//     //             loading: false
//     //         })
//     //     }
//     //     // this.setState({page:this.state.page + 1})
//     //     // this.updateNews();
//     // }

//     fetchMoreData = async () => {
//         this.setState({ page: this.state.page + 1 })
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.state.page}&pageSize=${props.pageSize}`;
//         // this.setState({ loading: true });
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({
//             articles: this.state.articles.concat(parsedData.articles),
//             totalResults: parsedData.totalResults,
//             loading:false
//         })

//     };

//     render() {
//         return (
//             <>
//                 <h1 className='text-center'>News of World - {props.capitalizedTitle(this.category)} Headlines</h1>
//                 {props.state.loading && <Spinner />}
//                 <InfiniteScroll
//                     dataLength={props.state.articles.length}
//                     next={props.fetchMoreData}
//                     hasMore={props.state.articles.length !== this.state.totalResults}
//                     // gives remaining article result
//                     loader={<Spinner />}
//                 >
//                     <div className="container">
//                         <div className="row">

//                             {props.state.articles.map((element) => {
//                                 return <div className="col-md-4" key={element.url}>
//                                     <NewsItem
//                                         title={element.title ? element.title : ""}
//                                         description={element.description ? element.description.slice(0, 150).concat("...") : ""}
//                                         imageUrl={element.urlToImage} newsUrl={element.url}
//                                         author={element.author ? element.author : "Anonymous"}
//                                         date={element.publishedAt}
//                                         source={element.source.name}
//                                     />
//                                 </div>
//                             })}
//                         </div>
//                     </div>
//                 </InfiniteScroll>

//                 {/* {props.state.loading && <Spinner />} */}
//                 {/* <div className="row">
//                     {!this.setState.loading && this.state.articles.map((element) => {
//                         return <div className="col-md-4" key={element.url}>
//                             <NewsItem
//                                 title={element.title ? element.title : ""}
//                                 description={element.description ? element.description.slice(0, 150).concat("...") : ""}
//                                 imageUrl={element.urlToImage} newsUrl={element.url}
//                                 author={element.author?element.author:"Anonymous"}
//                                 date={element.publishedAt}
//                                 source={element.source.name}
//                             />
//                         </div>
//                     })}
//                 </div> */}
//                 {/* <div className="container d-flex justify-content-between">
//                     <button disabled={props.state.page <= 1} type="button" className="btn btn-dark" onClick={props.handlePreviousClick}>&larr; Previous</button>
//                     <button disabled={props.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize)} type="button" className="btn btn-dark" onClick={props.handleNextClick}>Next &rarr;</button>
//                 </div> */}
//           </>
//         )
//     }
// }

// export default News;
