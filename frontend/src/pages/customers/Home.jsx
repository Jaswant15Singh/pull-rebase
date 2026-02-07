import {useSelector,useDispatch} from "react-redux";
const Home=()=>{
    const dispatch=useDispatch();
    const data=useSelector((state)=>{
        return state.categorySlice.data
    })
    console.log(data);
    
    return <>Home</>
}
export default Home;