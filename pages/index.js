import react, {useState} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);


  const fetchData = async (start=1, q) => { 
    console.log(start)   
    return fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${q}&start=${start}`)
    .then(response => response.json())
    .then(data => {
      setAllData(data)
      return data.items;
    })
    .catch(err => res.status(500).send('Server Error',err));
  }

  const onSubmit = async (e) => {
    setLoader(true);
    setData([])
    const formData = new FormData(e.target)
    const Fdata = {}
    e.preventDefault()
    for (let entry of formData.entries()) {
      Fdata[entry[0]] = entry[1]
    } 

    var i;
    let jsonData = {};
    for (i = 1; i <= 20; i++) {      
     await fetchData(i, e.target.query.value).then(dd => {        
        jsonData[i] = dd     
      });
    }
    setData(jsonData);
    setLoader(false);
  }

  const listData = (data) => {  
    var i;
    let looplistData='';
    if(data.length!=0){
      for (i = 1; i <=20; i++) {      
        {data[i].map((itemData, index) => {
          looplistData+=`<li key=${index} className="list-group-item"> - ${itemData.link}</li>`;
          // looplistData+=index
        }                    
      )} 
      }
    }    
    return looplistData;
  }

  // react.useEffect(() => {
  //   console.log(listData);
  // }, [listData])

  return (
    <div className={styles.container}>
      <Head>
        <title>Search Engine</title>
      </Head>   
      
      <div className="container">
        <form onSubmit={ (e) => onSubmit(e)}>
          <div className="col-lg-12 text-center mt-5">
            <h1>Search Engine</h1>
          </div>
          <div className="col-md-12 mt-5 border border-success p-3">
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

        {data ? 
          <>       

          {data ? 
          <ul className="list-group mt-5 mb-15" dangerouslySetInnerHTML={{__html: listData(data)}}></ul>
          : ''}    
          
{/* 
          {data ? 
          <nav aria-label="Page navigation example">

            <ul className="pagination mt-5">
              {allData.queries.previousPage ?
              <li className="page-item"><a className="page-link" onClick={() => fetchData(allData.queries.previousPage[0].startIndex, allData.queries.previousPage[0].searchTerms)}>Previous Page</a></li>
              : ''}             
              <li className="page-item"><a className="page-link" onClick={() => fetchData(allData.queries.nextPage[0].startIndex, allData.queries.nextPage[0].searchTerms)}>Next Page</a></li>
            </ul>

          </nav>
           : ''}    */}
          </>
        : ''}

      </div>
    </div>
  )
}
