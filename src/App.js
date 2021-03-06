import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css';

function App() {

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getData()
  }, [offset])

  const getData = async () => {
    const res = await axios.get(`https://api.punkapi.com/v2/beers?page=${pageCount}`)
    const data = res.data;
    const slice = data.slice(offset, offset + perPage)
    const postData = slice.map(pd => <div key={pd.id} className="card-body">

      <img src={pd.image_url} alt="" />
      <p>{pd.name}</p>
    </div>)
    setData(postData)
    setPageCount(Math.ceil(data.length / perPage + 1))
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
  };
  return (
    <div className="App">
      <div className="list-items">
        {data}
      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
    </div>
  );
}

export default App;
