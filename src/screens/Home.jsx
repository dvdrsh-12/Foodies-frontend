import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("https://foodies-backend-6kl3.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };
  useEffect(() => {
    loadData()
  }, []);
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
          <div className="carouselcaption">
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />

            </div>
          </div>
          <div className="carousel-inner" >
            <div className="carousel-item active" >
              <img src="https://embed.widencdn.net/img/beef/sr17je3ewf/1120x560px/thai-burger-horizontal.tif?keep=c&u=7fueml" className="d-block w-100 carosel_img" alt="..." />
            </div>
            <div className="carousel-item" >
              <img src="https://www.allrecipes.com/thmb/sRJ1kx-CInbvVs2nTNxsfN8zajY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/shutterstock_1778066987-2x1-1-e7e8c743775d4401a3a8c368f028a783.jpg" className="d-block w-100 carosel_img" alt="..." />
            </div>
            <div className="carousel-item" >
              <img src="https://recipesaresimple.com/wp-content/uploads/2021/01/Chicken-Al-Faham-Mandi-r-1140x500.jpg" className="d-block w-100 carosel_img" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container-fluid'>
        {foodCat != []
          ? foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='my-3'>
                  {data.CategoryName}
                  <hr />
                  <div className="row">
                    {foodItem != [] ? (
                      foodItem
                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                        .map((filterItems) => {
                          return (

                            <div key={filterItems._id} className='col-lg-3'>
                              <Cards foodItem={filterItems}
                                options={filterItems.options[0]}>
                              </Cards>
                            </div>
                          );
                        })
                    ) : (
                      <div>No Such Data Found</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
          : ""}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
