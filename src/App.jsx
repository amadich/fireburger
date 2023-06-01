import './index.css';
import { storage } from './firebase';
import { useEffect, useState } from 'react';
import { ref , uploadBytes , listAll , getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import Footer from './components/Footer';
function App() {
  const [myimage,setMyimage] = useState(null);
  const [imageslist,setImageslist] = useState([]);
  const imagesListRef = ref(storage, `gitimages/`);
  const UploadImage = () => {
      if (myimage == null) return;

      const imageRef = ref(storage , `gitimages/${myimage.name + v4()}`);
      uploadBytes(imageRef,myimage).then(() => {
        alert("Image Uploaded Successfully");
        window.location.href =  "";
        
      })
  }

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageslist((prev) => [...prev , url]);
        })
      })
    })
  }, [])

  return ( 
    <>
      
      <div className='border-b border-amber-400'>
        <label className='m-10'>
           Upload Image : 
           <input type="file" className=" m-10 file-input file-input-bordered file-input-secondary w-full max-w-xs " onChange={(e) => {setMyimage(e.target.files[0])}} />
           <button onClick={UploadImage} className='btn duration-300 hover:bg-green-500 hover:text-black'>Upload</button>
        </label>
      </div>

      <div className=' mt-10 w-full h-full flex justify-around overflow-auto '>
          {
          imageslist.map((url , key) => {
            return(
              <div className="card w-40 bg-base-100 shadow-xl image-full p-5 flex justify-around" key={key}>
                  <figure><img src={url} alt="Shoes" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">Image : {key}</h2>
                  </div>
              </div>
            )
          })
          }
      </div>
            <Footer />
    </>
   );
}

export default App;