import react, {useEffect, useState} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchData = (start=1, q) => {
    
    fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${q}&start=${start}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      setData(data);
      setLoader(false);
    })
    .catch(err => res.status(500).send('Server Error',err));
  }

  const onSubmit = async (e) => {
    setLoader(true);
    const formData = new FormData(e.target)
    const data = {}
    e.preventDefault()
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1]
    } 

    fetchData(1, e.target.query.value);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Search Engine</title>
      </Head>   

      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={ (e) => onSubmit(e)}>
              <div className="col-lg-12 text-center mt-2">
                <h1>Search Engine</h1>
              </div>
              <div className="col-md-12 mt-2 border border-success p-3">
                <div className="input-group">
                  <input type="text" name="query" required className="form-control" placeholder="Enter keyword" />
                  <div className="input-group-append">
                    <button className="btn btn-success">Search</button>
                  </div>
                </div>
              </div>
            </form>  

            {loader ? 
            <>
            <p className="loader text-left">Please wait...</p>          
            </>
          : '' }
          </div>
        </div>
        

        {data.items ? 
          <>
          <ul className="list-group mt-2">
            {(data.items) && data.items.map((itemData, index) => (
              <li key={index} className="list-group-item">{itemData.link}</li>            
            ))}
          </ul>

          <nav aria-label="Page navigation example  text-center">

            <ul className="pagination mt-3 mb-15 text-center">
              {data.queries.previousPage ?
              <li className="page-item"><a className="page-link" onClick={() => fetchData(data.queries.previousPage[0].startIndex, data.queries.previousPage[0].searchTerms)}>Previous Page</a></li>
              : ''}

              {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li> */}
               {data.queries.nextPage ?
              <li className="page-item"><a className="page-link" onClick={() => fetchData(data.queries.nextPage[0].startIndex, data.queries.nextPage[0].searchTerms)}>Next Page</a></li>
              : ''}
            </ul>

          </nav>
          </>
        : ''}

      </div>
    </div>
  )
}
