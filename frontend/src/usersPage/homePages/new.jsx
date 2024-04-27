import { useState } from "react"
import FormPage  from "./Form"
import ResultPage from "./result"

const FORM_PAGE = "FORM_PAGE"
const RESULT_PAGE= "RESULT_PAGE"

const Index = ()=>{

    const [index, setIndex]= useState(FORM_PAGE)
    const [data, setData] = useState(null)
 
    const moveToResultPage= (data)=>{
        setData(data);
        setIndex(RESULT_PAGE);
    }

    const _render = ()=>{
        if(index === FORM_PAGE) return <FormPage moveToResultPage={moveToResultPage} />
        if(index === RESULT_PAGE) return <ResultPage data={data} />
    }

    return (
        <>
        {_render()}
        </>
    )
}

export default Index