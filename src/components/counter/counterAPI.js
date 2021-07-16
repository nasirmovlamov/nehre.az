// A mock function to mimic making an async request for data
// import axios  from 'axios';

export const GetDataFromSearch =  async (searcher) => {
    // console.log(searcher)
    try {
      const res = await fetch(`https://nehra.az/public/api/search/${searcher}` , {methd: 'GET'})
      const data= res.json()
      return { data: data }
    } catch (error) {
      console.log(error)
    }
}
